import {
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const icons = {
  Address: MapPin,
  Email: Mail,
  "Phone Number": Phone,
};

function ContactItem({ type, value, href }) {
  const Icon = icons[type] ?? Mail;
  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href}
      className={`flex items-center gap-4 rounded-lg border border-white/5 bg-[#1a1917] p-4 transition-all duration-300 hover:border-[#f2a900]/20 ${
        href
          ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
          : ""
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2a900]/10 text-[#f2a900]">
        <Icon size={17} aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <span className="mb-1 block text-[14px] font-semibold text-white">
          {type}
        </span>

        <span className="block truncate text-[13px] text-neutral-400">{value}</span>
      </div>
    </Tag>
  );
}

export default ContactItem;