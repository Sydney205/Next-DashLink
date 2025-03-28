import { useEffect, useState } from "react";

export default function DashLinkForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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
        body: JSON.stringify({ title, desc, originalUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setShortUrl(data.shortUrl);
      setLinks((prevLinks) => [
        ...prevLinks,
        { title, desc, shortId: data.shortUrl.split("/").pop(), originalUrl },
      ]);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (shortId) => {
    try {
      const res = await fetch("/api/user/links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // Remove deleted link from UI
      setLinks((prevLinks) => prevLinks.filter((link) => link.shortId !== shortId));
      
      console.log("Deleted:", data);
    } catch (err) {
      console.error("Error deleting link:", err);
      setError(err.message || "Failed to delete link.");
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
}



      // <ul className="mt-2 space-y-2">
      //   {links.length > 0 ? (
      //     links.map((link, index) => (
      //       <li key={index} className="p-2 bg-gray-200 rounded">
      //         {link.title && <p className="text-sm font-semibold">{link.title}</p>}
              
      //         <a href={`${baseUrl}/${link.shortId}`} target="_blank" className="text-blue-500 underline">
      //           {baseUrl}/{link.shortId}
      //         </a>

      //         {link.desc && <p className="text-sm">{link.desc}</p>}

      //         <div className="flex gap-2">
      //           <button 
      //             className="bg-red-500 text-white"
      //             onClick={() => deleteLink(link.shortId)}
      //           >
      //             Delete
      //           </button>
      //         </div>

      //         <QRCodeGenerator originalUrl={link.originalUrl} />
      //       </li>
      //     ))
      //   ) : (
      //     <p className="text-gray-500">No shortened URLs yet.</p>
      //   )}
      // </ul>
