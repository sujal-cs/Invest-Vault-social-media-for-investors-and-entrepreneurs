"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@styles/signup.css"; // ✅ Importing the CSS file

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "investor",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong!");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="investor">Investor</option>
          <option value="startup">Startup</option>
        </select>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
