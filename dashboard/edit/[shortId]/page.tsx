"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditLinkPage({ params }: { params: { shortId: string } }) {
  const router = useRouter();
  const { shortId } = params;

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    originalUrl: "",
    newShortId: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the current link details
  useEffect(() => {
    async function fetchLink() {
      try {
        const res = await fetch(`/api/user/links/${shortId}`);
        if (!res.ok) throw new Error("Failed to fetch link");
        const data = await res.json();
        setFormData({
          title: data.link.title || "",
          desc: data.link.desc || "",
          originalUrl: data.link.originalUrl || "",
          newShortId: data.link.shortId, // Pre-fill with current shortId
        });
        setLoading(false);
      } catch (err) {
        setError("Error loading link details.");
        setLoading(false);
      }
    }

    fetchLink();
  }, [shortId]);

  // Handle form changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/links", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shortId,
          title: formData.title,
          desc: formData.desc,
          originalUrl: formData.originalUrl,
          newShortId: formData.newShortId !== shortId ? formData.newShortId : undefined,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      router.push("/dashboard"); // Redirect after successful update
    } catch (err: any) {
      setError(err.message || "Failed to update link.");
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Link</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Original URL:
          <input
            type="url"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Short ID:
          <input
            type="text"
            name="newShortId"
            value={formData.newShortId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}

