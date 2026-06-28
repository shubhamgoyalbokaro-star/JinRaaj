import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi JinRaaj, I'm interested in wholesale helmet pricing.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
