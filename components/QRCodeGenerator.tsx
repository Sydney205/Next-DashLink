import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
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
        type="url"
        placeholder="Enter URL"
        className=""
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <div className="">
          <QRCodeCanvas value={text} size={200} ref={qrRef} />
          <button onClick={downloadQRCode}>
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};
