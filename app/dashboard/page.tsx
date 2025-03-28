"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPen, FaQrcode, FaTrashAlt } from "react-icons/fa";

import Modal from "@/components/Modal";
import QRCodeGenerator from "@/components/QRCodeGenerator";

export default function Dashboard() {
  const router = useRouter();
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const [qrModal, setQrModal] = useState(false);
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      <section className="w-full h-max flex flex-col justify-start items-center">
        <ul className="w-[60%] mt-2 space-y-2">
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index} className="flex justify-between items-center border border-green-400 rounded-md p-4">
                <div className="flex flex-col">
                  {link.title && <h6 className="text-sm font-semibold">{link.title}</h6>}

                  {link.desc && <p className="text-sm">{link.desc}</p>}
                </div>
                
                <a href={`${baseUrl}/${link.shortId}`} target="_blank" className="text-blue-500 text-sm underline">
                  {baseUrl}/{link.shortId}
                </a>

                

                <div className="flex flex-col justify-center items-end gap-4">
                  <FaQrcode size={"1rem"} className="icon hover:text-green-400" onClick={() => setQrModal(true)}/>
                  <div className="flex gap-4">
                    <FaPen 
                      size={"1rem"} 
                      className="icon hover:text-green-400" 
                      onClick={() => router.push(`/edit/${link.shortId}`)}
                    />
                    
                    <FaTrashAlt 
                      size={"1rem"} 
                      className="icon hover:text-red-400" 
                      onClick={() => deleteLink(link.shortId)}
                    />
                  </div>
                </div>

                {qrModal ? (
                  <div>
                    <Modal 
                      content={<QRCodeGenerator originalUrl={link.originalUrl} />} 
                    />
                    
                    <span 
                      className="absolute top-[23%] left-[55%] bg-white dark:bg-stone-900 text-black dark:text-white rounded-full cursor-pointer" 
                      onClick={() => setQrModal(!qrModal)}
                    >{"X"}</span>
                  </div>
                ) : (
                  <div></div>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No Dashed URLs yet.</p>
          )}
        </ul>
      </section>
    </>
  )
}
