import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ originalUrl }: { originalUrl: string }) => {
  const [text, setText] = useState(originalUrl || ""); // Default to originalUrl
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  function downloadQRCode() {
    if (qrRef.current) {
      const url = qrRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      link.click();
    }
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        className="border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <div className="">
          <QRCodeCanvas value={text} size={200} ref={qrRef} className="mt-4" />
          <button onClick={downloadQRCode}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

