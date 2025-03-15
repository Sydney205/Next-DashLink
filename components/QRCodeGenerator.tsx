import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator({ originalUrl }: { originalUrl: string }) {
  const url: string = originalUrl;
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
      {url && (
        <div className="flex flex-col justify-center items-center gap-2">
          <QRCodeCanvas value={url} size={200} ref={qrRef} className="mt-4" />
          <button onClick={downloadQRCode}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

