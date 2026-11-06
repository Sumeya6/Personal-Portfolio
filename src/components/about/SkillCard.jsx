import { motion, useReducedMotion } from "motion/react";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";

const technologyIcons = {
  express: SiExpress,
  git: SiGit,
  github: SiGithub,
  javascript: SiJavascript,
  mongodb: SiMongodb,
  node: SiNodedotjs,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  react: SiReact,
  tailwind: SiTailwindcss,
};

function SkillCard({ name, icon }) {
  const reducedMotion = useReducedMotion();
  const TechnologyIcon = technologyIcons[icon];

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -3 }}
      transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
      className="group flex min-h-28 flex-col justify-between rounded-xl border border-white/[0.08] bg-[#111] p-4 transition-colors duration-200 hover:border-[#f2a900]/40 hover:bg-[#15130f] motion-reduce:transition-none"
    >
      <div className="flex items-center justify-between">
        <TechnologyIcon
          aria-hidden="true"
          size={21}
          className="text-[#f2a900] transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="h-px w-6 bg-[#f2a900]/45 transition-[width] duration-200 group-hover:w-9 motion-reduce:transition-none"
        />
      </div>
      <h5 className="mt-5 text-sm font-medium tracking-wide text-neutral-200 transition-colors group-hover:text-white">
        {name}
      </h5>
    </motion.article>
  );
}

export default SkillCard;
