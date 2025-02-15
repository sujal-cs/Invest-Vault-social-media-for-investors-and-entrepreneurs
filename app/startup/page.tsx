"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@styles/startup.css";

export default function StartupPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [funding, setFunding] = useState("");
  const [equity, setEquity] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Retrieve user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.role !== "startup") {
          // If not a startup, redirect to dashboard
          router.push("/dashboard");
          return;
        }
        setUser(userData);
        // Fetch listing for this startup user
        fetch(`/api/startups/listing?userId=${userData._id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.listing) {
              setFunding(data.listing.fundingRequired.toString());
              setEquity(data.listing.equityOffered.toString());
            }
          })
          .catch((err) => console.error("Fetch listing error:", err));
      } catch (err) {
        console.error("Error parsing user:", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!user) {
      setError("User not found");
      return;
    }
    const res = await fetch("/api/startups/listing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        fundingRequired: Number(funding),
        equityOffered: Number(equity),
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Listing updated successfully!");
    } else {
      setError(data.error || "Update failed");
    }
  };

  if (!user) return null;
  return (
    <div className="startup-container">
      <h2>Your Startup Listing</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleUpdate} className="startup-form">
        <label>Funding Required</label>
        <input
          type="number"
          placeholder="Enter funding required"
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
        <button type="submit" className="btn">Update Listing</button>
      </form>
      <div className="current-listing">
        <h3>Current Listing:</h3>
        <p>Funding Required: ${funding}</p>
        <p>Equity Offered: {equity}%</p>
      </div>
    </div>
  );
}
