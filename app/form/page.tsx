"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@styles/form.css";

export default function FormPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [budget, setBudget] = useState("");
  const [funding, setFunding] = useState("");
  const [equity, setEquity] = useState("");
  const [error, setError] = useState("");

  // Retrieve user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (user.role === "investor") {
      if (!budget) {
        setError("Please enter your investment budget.");
        return;
      }
      localStorage.setItem("investmentDetails", JSON.stringify({ budget }));
      // Redirect investor to the investor page
      router.push("/investor");
    } else if (user.role === "startup") {
      if (!funding || !equity) {
        setError("Please enter both funding required and equity offered.");
        return;
      }
      localStorage.setItem("fundingDetails", JSON.stringify({ funding, equity }));
      // Redirect startup user to the startup page instead of investor page
      router.push("/startup");
    }
  };

  if (!user) return null; // Optionally show a loading indicator

  return (
    <div className="form-container">
      <h2>
        {user.role === "investor"
          ? "Enter Your Investment Budget"
          : "Enter Your Funding Details"}
      </h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="details-form">
        {user.role === "investor" ? (
          <>
            <label>Investment Budget</label>
            <input
              type="number"
              placeholder="Enter your budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </>
        ) : (
          <>
            <label>Funding Required</label>
            <input
              type="number"
              placeholder="Enter required funding"
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
              required
            />
            <label>Equity Offered (%)</label>
            <input
              type="number"
              placeholder="Enter equity percentage"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              required
            />
          </>
        )}
        <button type="submit" className="btn">Submit</button>
      </form>
    </div>
  );
}
