"use client";

import { useState } from "react";

export default function NewsletterForm({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setMessage(data.message || "You're on the list.");
        setEmail("");
      } else {
        setStatus("err");
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("err");
      setMessage("Something went wrong. Try again.");
    }
  }

  return (
    <div>
      <form
        className={`newsletter-form ${compact ? "newsletter-form--light" : ""}`}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join the list"}
        </button>
      </form>
      {status === "ok" && (
        <p className={`form-status ok ${compact ? "form-status--light" : ""}`}>
          {message}
        </p>
      )}
      {status === "err" && (
        <p className={`form-status err ${compact ? "form-status--light" : ""}`}>
          {message}
        </p>
      )}
      {!compact && status === "idle" && (
        <p className="form-status" style={{ color: "#8a9791" }}>
          One email a week. No spam, unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
