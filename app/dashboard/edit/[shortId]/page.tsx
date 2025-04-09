"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditLinkForm({ shortId }) {
  const router = useRouter();
  const [linkData, setLinkData] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "", originalUrl: "", newShortId: "" });

  // Fetch existing link data
  useEffect(() => {
    async function fetchLink() {
      const res = await fetch(`/api/user/links/${shortId}`);
      const data = await res.json();
      setLinkData(data);
      setFormData({
        title: data.title || "",
        desc: data.desc || "",
        originalUrl: data.originalUrl || "",
        newShortId: data.shortId || "",
      });
    }
    fetchLink();
  }, [shortId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/user/links`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard"); // Redirect after successful update
    } else {
      console.error("Update failed");
    }
  };

  if (!linkData) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />

      <label>Description</label>
      <textarea name="desc" value={formData.desc} onChange={handleChange}></textarea>

      <label>Original URL</label>
      <input type="text" name="originalUrl" value={formData.originalUrl} onChange={handleChange} />

      <label>Short ID</label>
      <input type="text" name="newShortId" value={formData.newShortId} onChange={handleChange} />

      <button type="submit">Update Link</button>
    </form>
  );
}

