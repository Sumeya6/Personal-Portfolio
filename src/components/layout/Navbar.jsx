import { useCallback, useEffect, useRef, useState } from "react";
import { Code2, Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navigation } from "../../data/navigation";
import useScrollPosition from "../../hooks/useScrollPosition";
import Button from "../common/Button";
import useTheme from "../../context/useTheme";

function getSectionAtReadingLine() {
  const readingLine = window.innerHeight * 0.375;
  const currentItem = navigation.find(({ href }) => {
    const section = document.getElementById(href.slice(1));
    if (!section) {
      return false;
    }

    const bounds = section.getBoundingClientRect();
    return bounds.top <= readingLine && bounds.bottom > readingLine;
  });

  return currentItem?.href;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const scrollPosition = useScrollPosition();
  const reducedMotion = useReducedMotion();
  const menuButtonRef = useRef(null);
  const lockedOverflowRef = useRef("");
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  const closeMenu = useCallback(() => {
    document.body.style.overflow = lockedOverflowRef.current;
    setMenuOpen(false);
  }, []);

  const handleNavClick = (event, href) => {
    setActiveHref(href);

    if (!menuOpen) {
      return;
    }

    event?.preventDefault();
    closeMenu();

    const target = document.getElementById(href.slice(1));
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
  };

  useEffect(() => {
    const syncWithHash = () => {
      const currentItem = navigation.find(
        (item) => item.href === window.location.hash,
      );
      if (currentItem) {
        setActiveHref(currentItem.href);
        const target = document.getElementById(currentItem.href.slice(1));
        if (target) {
          window.requestAnimationFrame(() => {
            if (window.location.hash === currentItem.href) {
              target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start",
              });
            }
          });
        }
      }
    };

    const syncWithViewport = () => {
      const currentHref = getSectionAtReadingLine();
      if (currentHref) {
        setActiveHref(currentHref);
      }
    };

    window.addEventListener("scroll", syncWithViewport, { passive: true });
    window.addEventListener("resize", syncWithViewport);
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener("popstate", syncWithHash);
    syncWithHash();
    syncWithViewport();

    return () => {
      window.removeEventListener("scroll", syncWithViewport);
      window.removeEventListener("resize", syncWithViewport);
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener("popstate", syncWithHash);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    lockedOverflowRef.current = previousOverflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktop = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };

    mediaQuery.addEventListener("change", handleDesktop);
    return () => mediaQuery.removeEventListener("change", handleDesktop);
  }, [closeMenu]);

  return (
    <motion.header
      initial={reducedMotion ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.6 }}
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrollPosition > 30
          ? "border-b border-white/5 bg-black/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex h-[72px] items-center justify-between">
        <a
          href="#home"
          aria-label="Go to home"
          onClick={(event) => handleNavClick(event, "#home")}
          className="text-[#f2a900] transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd35a]"
        >
          <Code2 size={28} strokeWidth={1.5} />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={activeHref === item.href ? "location" : undefined}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: reducedMotion ? 0 : index * 0.08 + 0.3,
                duration: reducedMotion ? 0 : 0.3,
              }}
              className={`relative text-[11px] font-medium transition-colors duration-300 hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd35a] ${
                activeHref === item.href
                  ? "text-[#ffd35a]"
                  : "text-neutral-300"
              }`}
            >
              {item.label}
              {activeHref === item.href && (
                <motion.span
                  layoutId="primary-active-section-underline"
                  aria-hidden="true"
                  initial={false}
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-[10px] left-0 right-0 h-px bg-[#f2a900]"
                />
              )}
            </motion.a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-300 transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
          >
            <motion.span
              key={theme}
              initial={reducedMotion ? false : { opacity: 0.5, rotate: -35, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="flex"
            >
              <ThemeIcon size={17} strokeWidth={1.7} aria-hidden="true" />
            </motion.span>
          </button>
          <Button href="#contact">
            <span className="px-2">Contact Me</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-300 transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
          >
            <motion.span
              key={theme}
              initial={reducedMotion ? false : { opacity: 0.5, rotate: -35, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              className="flex"
            >
              <ThemeIcon size={18} strokeWidth={1.7} aria-hidden="true" />
            </motion.span>
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            aria-hidden={!menuOpen}
            inert={!menuOpen}
            className="max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="container-custom flex flex-col py-4"
            >
              {navigation.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
                  aria-current={activeHref === item.href ? "location" : undefined}
                  className={`relative border-b py-4 text-sm transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a] ${
                    activeHref === item.href
                      ? "border-[#f2a900]/50 text-[#ffd35a]"
                      : "border-white/5 text-neutral-300"
                  }`}
                >
                  {item.label}
                  {activeHref === item.href && (
                    <motion.span
                      layoutId="mobile-active-section-underline"
                      aria-hidden="true"
                      initial={false}
                      transition={{
                        duration: reducedMotion ? 0 : 0.2,
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-2 left-0 right-0 h-px bg-[#f2a900]"
                    />
                  )}
                </motion.a>
              ))}

              <Button
                href="#contact"
                onClick={(event) => handleNavClick(event, "#contact")}
                className="mt-4 w-full"
              >
                Contact Me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
