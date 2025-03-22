"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

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
    <>
      <ul className="mt-2 space-y-2">
        {links.length > 0 ? (
          links.map((link, index) => (
            <li key={index} className="flex border border-green-600 rounded-md p-2">
              <div className="flex flex-col">
                {link.title && <h6 className="text-sm font-semibold">{link.title}</h6>}

                {link.desc && <p className="text-sm">{link.desc}</p>}
              </div>
              
              <a href={`${baseUrl}/${link.shortId}`} target="_blank" className="text-blue-500 underline">
                {baseUrl}/{link.shortId}
              </a>

              

              <div className="flex gap-2">
                <button 
                  className="bg-red-500 text-white"
                >
                  Edit
                </button>
              </div>

              <QRCodeGenerator originalUrl={link.originalUrl} />
            </li>
          ))
        ) : (
          <p className="text-gray-500">No shortened URLs yet.</p>
        )}
      </ul>
    </>
  )
}
