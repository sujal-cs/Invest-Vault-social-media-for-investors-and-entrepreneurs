"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@styles/investor.css";

export default function InvestorPage() {
  const router = useRouter();
  const [investmentDetails, setInvestmentDetails] = useState<{ budget: number } | null>(null);
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Retrieve investor budget from localStorage
  useEffect(() => {
    const details = localStorage.getItem("investmentDetails");
    if (details && details !== "undefined") {
      try {
        setInvestmentDetails(JSON.parse(details));
      } catch (err) {
        console.error("Error parsing investment details:", err);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  // Fetch startups from the API endpoint
  useEffect(() => {
    async function fetchStartups() {
      try {
        const res = await fetch("/api/startups");
        if (res.ok) {
          const data = await res.json();
          setStartups(data.startups);
        } else {
          console.error("Failed to fetch startups");
        }
      } catch (err) {
        console.error("Error fetching startups:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStartups();
  }, []);

  if (loading || !investmentDetails) {
    return <p style={{ textAlign: "center", color: "#f1f5f9" }}>Loading...</p>;
  }

  const investorBudget = Number(investmentDetails.budget);
  // Startups within the investor's budget
  const withinBudget = startups.filter(
    (s) => s.fundingRequired <= investorBudget
  );
  // Startups slightly over budget (within 10% extra)
  const slightlyOverBudget = startups.filter(
    (s) =>
      s.fundingRequired > investorBudget &&
      s.fundingRequired <= investorBudget * 1.1
  );

  return (
    <div className="investor-container">
      <h1>Available Startups</h1>
      <section>
        <h2>Within Budget</h2>
        {withinBudget.length === 0 ? (
          <p>No startups available within your budget.</p>
        ) : (
          <ul>
            {withinBudget.map((s) => (
              <li key={s._id} className="startup-item within-budget">
                <strong>{s.name}</strong> — Funding Required: ${s.fundingRequired} — Equity: {s.equity}%
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h2>Slightly Over Budget</h2>
        {slightlyOverBudget.length === 0 ? (
          <p>No startups available slightly over your budget.</p>
        ) : (
          <ul>
            {slightlyOverBudget.map((s) => (
              <li key={s._id} className="startup-item over-budget">
                <strong>{s.name}</strong> — Funding Required: ${s.fundingRequired} — Equity: {s.equity}%
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
