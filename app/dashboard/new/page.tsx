"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function New() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await fetch("/api/user/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, originalUrl }),
      });

      // if (!res.ok) throw new Error(data.message);

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Shorten a URL</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <input
          id="url"
          name="url"
          type="url"
          placeholder="Enter your URL"
          className="w-full p-2 border rounded"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />

        <textarea
          id="desc"
          name="desc"
          placeholder="Write a short description..."
          className="w-full p-2 border rounded"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}

