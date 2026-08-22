import React, { useState } from "react";
import {
  QrCode,
  Copy,
  CheckCircle,
  ExternalLink,
  MessageCircle,
  Smartphone,
  Share2,
  Download,
  Link,
  Sparkles,
} from "lucide-react";
import { VENDOR_PROFILE } from "../../data/vendorData";

export default function VendorQRCodePage() {
  const [copiedQrUrl, setCopiedQrUrl] = useState(false);
  const [copiedWaUrl, setCopiedWaUrl] = useState(false);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=https://wa.me/${VENDOR_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hi%20MVAD%20Events`;
  const directWaUrl = `https://wa.me/${VENDOR_PROFILE.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(VENDOR_PROFILE.companyName)}`;

  const handleCopyQrUrl = () => {
    navigator.clipboard?.writeText(qrImageUrl);
    setCopiedQrUrl(true);
    setTimeout(() => setCopiedQrUrl(false), 2000);
  };

  const handleCopyWaUrl = () => {
    navigator.clipboard?.writeText(directWaUrl);
    setCopiedWaUrl(true);
    setTimeout(() => setCopiedWaUrl(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    window.open(directWaUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
          <QrCode size={22} className="text-violet-400" />
          QR Code &amp; Direct Chat Links
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Share your scannable WhatsApp QR code, embed links on websites, or print for counter-top displays.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── QR Code Preview Card (5 cols) ───────────────────── */}
        <div className="lg:col-span-5 bg-[#12131b] border border-slate-800/80 rounded-lg p-6 flex flex-col items-center text-center space-y-4 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
            Scannable QR Code
          </span>

          <div className="p-4 bg-white rounded-xl shadow-lg border border-slate-700">
            <svg
              className="w-48 h-48"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stylized high-contrast QR visual representation */}
              <rect width="200" height="200" fill="white" />
              <rect x="15" y="15" width="50" height="50" fill="#0c0f18" rx="6" />
              <rect x="25" y="25" width="30" height="30" fill="white" />
              <rect x="33" y="33" width="14" height="14" fill="#0c0f18" />

              <rect x="135" y="15" width="50" height="50" fill="#0c0f18" rx="6" />
              <rect x="145" y="25" width="30" height="30" fill="white" />
              <rect x="153" y="33" width="14" height="14" fill="#0c0f18" />

              <rect x="15" y="135" width="50" height="50" fill="#0c0f18" rx="6" />
              <rect x="25" y="145" width="30" height="30" fill="white" />
              <rect x="33" y="153" width="14" height="14" fill="#0c0f18" />

              {/* Data modules */}
              <rect x="75" y="20" width="10" height="10" fill="#0c0f18" />
              <rect x="95" y="20" width="10" height="20" fill="#0c0f18" />
              <rect x="115" y="30" width="10" height="10" fill="#0c0f18" />
              <rect x="75" y="45" width="20" height="10" fill="#0c0f18" />
              <rect x="105" y="45" width="15" height="15" fill="#0c0f18" />

              <rect x="20" y="75" width="15" height="15" fill="#0c0f18" />
              <rect x="45" y="85" width="10" height="20" fill="#0c0f18" />
              <rect x="65" y="75" width="25" height="25" fill="#7c3aed" rx="4" />
              <rect x="100" y="75" width="15" height="15" fill="#0c0f18" />
              <rect x="125" y="75" width="20" height="10" fill="#0c0f18" />
              <rect x="155" y="75" width="25" height="15" fill="#0c0f18" />

              <rect x="75" y="110" width="15" height="25" fill="#0c0f18" />
              <rect x="100" y="105" width="20" height="15" fill="#0c0f18" />
              <rect x="130" y="100" width="15" height="30" fill="#0c0f18" />
              <rect x="160" y="105" width="20" height="15" fill="#0c0f18" />

              <rect x="75" y="145" width="25" height="15" fill="#0c0f18" />
              <rect x="110" y="145" width="15" height="20" fill="#0c0f18" />
              <rect x="135" y="145" width="20" height="20" fill="#0c0f18" />
              <rect x="165" y="145" width="15" height="35" fill="#0c0f18" />
              <rect x="75" y="170" width="15" height="15" fill="#0c0f18" />
              <rect x="100" y="175" width="25" height="10" fill="#0c0f18" />
              <rect x="135" y="175" width="15" height="10" fill="#0c0f18" />
            </svg>
          </div>

          <div>
            <p className="text-white font-bold text-sm">{VENDOR_PROFILE.companyName}</p>
            <p className="text-slate-400 text-xs font-mono mt-0.5">{VENDOR_PROFILE.phone}</p>
          </div>

          <div className="w-full pt-2 border-t border-slate-800 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <MessageCircle size={14} />
              WhatsApp Now
            </button>
          </div>
        </div>

        {/* ── Direct URLs & Integration Endpoints (7 cols) ────── */}
        <div className="lg:col-span-7 space-y-4">
          {/* Direct WhatsApp URL */}
          <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                <Link size={14} className="text-violet-400" />
                Direct WhatsApp Click-to-Chat URL
              </h3>
              {copiedWaUrl && (
                <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle size={12} /> Copied!
                </span>
              )}
            </div>

            <p className="text-slate-400 text-[11px]">
              Direct deep link for social media bios (Instagram, Facebook), email signatures, and website buttons.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={directWaUrl}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-xs text-slate-300 font-mono select-all outline-none"
              />
              <button
                type="button"
                onClick={handleCopyWaUrl}
                className="h-9 px-3.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <Copy size={13} />
                Copy
              </button>
            </div>
          </div>

          {/* URL for QR Image */}
          <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                <QrCode size={14} className="text-violet-400" />
                Public QR Code Image CDN URL
              </h3>
              {copiedQrUrl && (
                <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle size={12} /> Copied!
                </span>
              )}
            </div>

            <p className="text-slate-400 text-[11px]">
              Direct image source link for dynamic HTML embedding (`&lt;img src="..." /&gt;`) or print templates.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={qrImageUrl}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-xs text-slate-300 font-mono select-all outline-none truncate"
              />
              <button
                type="button"
                onClick={handleCopyQrUrl}
                className="h-9 px-3.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy
              </button>
            </div>
          </div>

          {/* Best Practices Banner */}
          <div className="bg-violet-600/10 border border-violet-500/20 rounded-lg p-4 text-xs text-slate-300 space-y-1.5">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles size={13} className="text-violet-400" />
              Pro Tips for Maximum Lead Conversion
            </p>
            <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-1">
              <li>Print your QR code on standees, packaging boxes, invoices, and business cards.</li>
              <li>When scanned, the lead's WhatsApp opens with a pre-filled greeting message.</li>
              <li>Keyword automated Reply Bots will respond instantly 24/7.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
