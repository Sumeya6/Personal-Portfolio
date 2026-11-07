import { Code2 } from "lucide-react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505]">
      <div className="container-custom flex min-h-[55px] items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12px] text-neutral-500">
          <span className="flex items-center gap-2">
            <Code2 size={13} className="text-[#f2a900]" />
            © {year} Sumeya Bahiru. All rights reserved.
          </span>
          <span aria-hidden="true" className="text-neutral-600">
            ·
          </span>
          <a
            href="https://github.com/Sumeya6/Personal-Portfolio"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
          >
            View source on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;