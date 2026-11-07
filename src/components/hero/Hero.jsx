import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Container from "../common/Container";
import HeroButtons from "./HeroButtons";
import Typewriter from "typewriter-effect";
import heroBackground from "../../assets/images/other/hero-background.jpg";
import lightHeroBackground from "../../assets/images/other/hero-background-light.png";
import useTheme from "../../context/useTheme";

function Hero() {
  const reducedMotion = useReducedMotion();
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[position:60%_center] pt-20 sm:bg-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:60%_center] transition-opacity duration-[260ms] ease-in-out motion-reduce:transition-none sm:bg-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          opacity: theme === "dark" ? 1 : 0,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[position:60%_center] transition-opacity duration-[260ms] ease-in-out motion-reduce:transition-none sm:bg-center"
        style={{
          backgroundImage: `url(${lightHeroBackground})`,
          opacity: theme === "light" ? 1 : 0,
        }}
      />
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#f2a900]/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#f2a900]/5 blur-[150px]" />

      <Container>
        <div className="relative max-w-2xl">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
            className="mb-2 text-lg font-medium text-[#f2a900]"
          >
            Hello!
          </motion.p>

          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.1 }}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            I'm Sumeya Bahiru
            <br />
            <span className="relative inline-block text-3xl gold-gradient-text sm:text-5xl md:text-6xl">
              {reducedMotion ? (
                "Full-stack developer"
              ) : (
                <Typewriter
                  options={{
                    strings: ["Full-stack developer", "Web developer", "Freelancer"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              )}
            </span>
          </motion.h1>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.25 }}
            className="mt-8"
          >
            <HeroButtons />

            <a
              href="#idea-to-impact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-200 transition-colors hover:text-[#ffd35a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd35a]"
            >
              Explore the interactive Idea → Impact journey
              <ArrowDown size={15} aria-hidden="true" className="text-[#f2a900]" />
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
