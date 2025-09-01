"use client";
import React, { useState } from "react";
import TelegramIcon from "../icons/telegram";
import DocumentDuplicateIcon from "../icons/document-duplicate";
import { usePathname } from "next/navigation";
import Link from "next/link";

const BlogShare = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${pathname}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center gap-5 relative">
      <span>Share:</span>
      <div className="flex items-center gap-3">
        <Link
          href={`https://t.me/share/url?url=https://blogs-dusky-nu.vercel.app/${pathname}`}
          target="_blank"
        >
          <TelegramIcon />
        </Link>
        <button onClick={handleCopy}>
          <DocumentDuplicateIcon />
        </button>
      </div>
      {copied && (
        <div className="absolute bottom-full right-0 mt-2 bg-[rgb(207,255,17)] opacity-80 text-black text-sm rounded px-3 py-1 animate-fadeIn">
          Copied!
        </div>
      )}
    </div>
  );
};

export default BlogShare;
