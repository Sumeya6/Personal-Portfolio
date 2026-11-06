import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";

function ProjectCard({ project, index }) {
  const githubUrl = project.github
    ? new URL(project.github)
    : null;
  const hasGithubLink = githubUrl?.hostname === "github.com";
  const hasDemoLink = project.demo && project.demo !== project.github;
  const hasProjectLinks = hasGithubLink || hasDemoLink;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-xl border border-white/5 bg-[#181818] transition-colors duration-300 hover:border-[#f2a900]/30"
    > 
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {hasProjectLinks && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-100 transition-opacity duration-300 sm:bg-black/70 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <div className="flex gap-2">
              {hasDemoLink && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2a900] text-black transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffd35a]"
                  aria-label={`${project.title} live demo`}
                >
                  <GoLinkExternal size={15} aria-hidden="true" />
                </a>
              )}

              {hasGithubLink && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#f2a900] text-black transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffd35a]"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <FaGithub size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-[19px] font-bold">{project.title}</h3>

        <p className="mt-2 text-[13px] leading-5 text-neutral-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[#f2a900]/20 px-2 py-1 text-[10px] text-[#f2a900]"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;