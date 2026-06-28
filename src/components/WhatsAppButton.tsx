import { MessageCircle } from "lucide-react";

// TODO: Replace XXXXXXXXX with your business WhatsApp number (no +, no spaces).
// Format: country code + number, e.g. 256700123456
export const WHATSAPP_NUMBER = "256XXXXXXXXX";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
