import { Code2 } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="container-custom flex min-h-[55px] items-center justify-center">
        <div className="flex items-center gap-2 text-[12px] text-neutral-500">
          <Code2 size={13} className="text-[#f2a900]" />
          <span>
            © {year} Sumeya Bahiru. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;