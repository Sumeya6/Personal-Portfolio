import { ArrowRight } from "lucide-react";

function Button({
  children,
  href,
  variant = "primary",
  showArrow = false,
  onClick,
  type = "button",
  className = "text-white",
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]";

  const variants = {
    primary:
      "bg-[#f2a900] text-black hover:bg-[#ffc107] hover:-translate-y-0.5 shadow-[0_8px_25px_rgba(242,169,0,0.15)]",

    secondary:
      "border border-white/20 bg-transparent text-white hover:border-[#f2a900]/70 hover:text-[#f2a900] hover:-translate-y-0.5",

    dark: "bg-[#171717] text-white border border-white/10 hover:border-[#f2a900]/50",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
        {showArrow && <ArrowRight size={14} aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {showArrow && <ArrowRight size={14} aria-hidden="true" />}
    </button>
  );
}

export default Button;