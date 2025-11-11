"use client";

import { useState } from "react";

export default function MoodPage() {
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!mood) return;

    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood }),
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mood Tracker</h1>
      <input
        type="text"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>

      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">{response}</div>
      )}
    </div>
  );
}
