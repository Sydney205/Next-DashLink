import { useEffect, useState } from "react";

export default function DashLinkForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);
  
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/user/links");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setLinks(data.links);
      } catch (err) {
        setError(err.message || "Failed to load links.");
      }
    };

    fetchLinks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("/api/user/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setShortUrl(data.shortUrl);
      setLinks((prevLinks) => [...prevLinks, { shortId: data.shortUrl, originalUrl }]);
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
          type="url"
          placeholder="Enter your URL"
          className="w-full p-2 border rounded"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {shortUrl && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="text-green-600">Shortened URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-500 underline">
            {shortUrl}
          </a>
        </div>
      )}

      <h3 className="text-lg font-semibold mt-6">Your Shortened URLs</h3>
      <ul className="mt-2 space-y-2">
        {links.length > 0 ? (
          links.map((link, index) => (
            <li key={index} className="p-2 bg-gray-200 rounded">
              <p className="text-sm">Original: {link.originalUrl}</p>
              <a href={`${baseUrl}/${link.shortId}`} target="_blank" className="text-blue-500 underline">
                {baseUrl}/{link.shortId}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No shortened URLs yet.</p>
        )}
      </ul>
    </div>
  );
}

