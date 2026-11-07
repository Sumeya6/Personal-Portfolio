import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Container from "./common/Container";
import { projects } from "../data/project";

const stages = [
  {
    name: "IDEA",
    description: "Every great solution begins with an idea.",
  },
  {
    name: "THINK",
    description:
      "I start by observing, then find the right question before choosing a direction.",
  },
  {
    name: "CREATE",
    description:
      "I turn ideas into practical digital experiences through thoughtful design and development.",
  },
  {
    name: "IMPACT",
    description:
      "I’m Sumeya — an Electrical and Computer Engineering student and full-stack developer who enjoys turning ideas into useful digital experiences.",
  },
];

const thinkingSteps = [
  { title: "Observe", detail: "Notice what matters." },
  { title: "Understand", detail: "Listen before solving." },
  { title: "Explore", detail: "Imagine better options." },
  { title: "Design", detail: "Choose a clear direction." },
];

const featuredProjectTitles = [
  "CivicDesk — Maintenance Request Management System",
  "EthioTech Platform",
  "Rental Management System",
];

const projectInsights = {
  "CivicDesk — Maintenance Request Management System": {
    purpose: "Help maintenance requests move from employee submission to resolution.",
    build:
      "A web-based system for employee requests, technician assignment, and maintenance task resolution.",
    insight:
      "Bringing employee submissions, technician assignment, and task resolution into one connected workflow.",
  },
  "EthioTech Platform": {
    purpose: "Make technology-related courses and skills easier to explore.",
    build:
      "A modern, responsive platform for learning technology-related courses and skills.",
  },
  "Rental Management System": {
    purpose: "Support the management of rental properties.",
    build: "A modern, responsive website for managing rental properties.",
  },
};

const stageActions = [
  "Begin the Journey",
  "Continue to Create",
  "Discover the Impact",
];

const actionClassName =
  "group inline-flex min-h-11 items-center justify-center gap-1.5 px-3 text-xs font-semibold text-[#ffd35a] transition-colors hover:text-white motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]";

function JourneyPath({ stage, reducedMotion }) {
  const progress = [0, 0.34, 0.69, 1][stage - 1];

  if (stage === 2 || stage === 3) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="journey-line" x1="0" x2="1">
          <stop offset="0%" stopColor="#f2a900" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffd35a" />
        </linearGradient>
        <filter id="journey-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M 75 90 C 195 90, 205 48, 315 70 S 470 126, 570 90 S 760 52, 925 90"
        fill="none"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1.5"
        strokeDasharray="4 9"
        vectorEffect="non-scaling-stroke"
        opacity={stage === 1 ? 0 : 1}
      />
      <motion.path
        d="M 75 90 C 195 90, 205 48, 315 70 S 470 126, 570 90 S 760 52, 925 90"
        fill="none"
        stroke="url(#journey-line)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={false}
        animate={{ pathLength: progress, opacity: stage === 1 ? 0 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.9, ease: "easeInOut" }}
      />

      <g opacity={stage === 1 ? 0 : 1}>
        {[75, 315, 570, 925].map((x, index) => {
          const nodeStage = index + 1;
          const active = stage >= nodeStage;
          const y = [90, 70, 90, 90][index];

          return (
            <g key={nodeStage}>
              {active && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill="#f2a900"
                  opacity="0.13"
                  filter="url(#journey-glow)"
                  initial={false}
                  animate={{ opacity: stage === nodeStage ? [0.1, 0.32, 0.1] : 0.1 }}
                  transition={{
                    duration: reducedMotion ? 0 : 2.4,
                    repeat: !reducedMotion && stage === nodeStage ? Infinity : 0,
                  }}
                />
              )}
              <circle
                cx={x}
                cy={y}
                r={active ? 4 : 3}
                fill={active ? "#ffd35a" : "#55514a"}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function ThinkingSequence({ reducedMotion }) {
  return (
    <div className="absolute inset-0 flex items-center justify-between px-[3%] sm:px-[5%]">
      <svg
        className="absolute inset-x-0 top-1/2 h-16 w-full -translate-y-1/2"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 75 50 C 180 50, 180 28, 320 50 S 450 72, 570 50 S 760 28, 925 50"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          strokeDasharray="3 8"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M 75 50 C 180 50, 180 28, 320 50 S 450 72, 570 50 S 760 28, 925 50"
          fill="none"
          stroke="#f2a900"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, ease: "easeInOut" }}
        />
      </svg>

      {thinkingSteps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.3,
            delay: reducedMotion ? 0 : index * 0.12,
          }}
          className="relative z-10 flex w-[23%] flex-col items-center text-center"
        >
          <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-[#f2a900]/45 bg-[#0b0905] text-[9px] text-[#ffd35a] shadow-[0_0_18px_rgba(242,169,0,0.12)] sm:mb-4 sm:h-9 sm:w-9 sm:text-[10px]">
            0{index + 1}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-200 sm:text-[11px] sm:tracking-[0.18em]">
            {step.title}
          </span>
          <span className="mt-1 hidden max-w-28 text-[10px] leading-4 text-neutral-400 sm:block">
            {step.detail}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectDiscoveryPath({
  projects: featuredProjects,
  selectedIndex,
  onSelect,
  buttonRefs,
  reducedMotion,
}) {
  const projectPositions = ["16.5%", "50%", "83.5%"];

  const handleKeyDown = (event, index) => {
    let nextIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % featuredProjects.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + featuredProjects.length) % featuredProjects.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = featuredProjects.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      onSelect(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="journey-line" x1="0" x2="1">
            <stop offset="0%" stopColor="#f2a900" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffd35a" />
          </linearGradient>
        </defs>
        <path
          d="M 165 90 C 290 90, 365 68, 500 90 S 710 112, 835 90"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M 165 90 C 290 90, 365 68, 500 90 S 710 112, 835 90"
          fill="none"
          stroke="url(#journey-line)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.75, ease: "easeInOut" }}
        />
      </svg>

      <div
        role="group"
        aria-label="Choose a project to discover"
        className="absolute inset-0"
      >
        {featuredProjects.map((project, index) => {
          const selected = index === selectedIndex;

          return (
            <button
              key={project.title}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              type="button"
              onClick={() => onSelect(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              aria-pressed={selected}
              aria-label={`Discover ${project.title}`}
              className="group absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline-none"
              style={{ left: projectPositions[index] }}
            >
              <span
                className={`mb-3 max-w-[105px] text-center text-[10px] font-medium leading-4 transition-colors sm:mb-4 sm:max-w-none sm:text-[11px] ${
                  selected ? "text-[#ffd35a]" : "text-neutral-500 group-hover:text-neutral-200"
                }`}
              >
                {project.title.split(" — ")[0]}
              </span>
              <motion.span
                animate={{
                  scale: selected ? 1.15 : 1,
                  boxShadow: selected
                    ? "0 0 24px rgba(242,169,0,0.38)"
                    : "0 0 10px rgba(242,169,0,0.08)",
                }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full border bg-[#090806] transition-colors sm:h-12 sm:w-12 ${
                  selected
                    ? "border-[#f2a900] text-[#ffd35a]"
                    : "border-white/20 text-neutral-400 group-hover:border-[#f2a900]/60 group-hover:text-[#ffd35a]"
                } group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#ffd35a]`}
              >
                <span className="text-[10px] font-medium tracking-wide">
                  0{index + 1}
                </span>
              </motion.span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.14em] text-neutral-500 sm:text-[11px]">
                {selected ? "Selected" : "Explore"}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function IdeaToImpact() {
  const [stage, setStage] = useState(1);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const projectButtonRefs = useRef([]);
  const reducedMotion = useReducedMotion();
  const currentStage = stages[stage - 1];
  const featuredProjects = featuredProjectTitles.map((title) => {
    const project = projects.find((item) => item.title === title);

    if (!project) {
      throw new Error(`Idea to Impact project not found: ${title}`);
    }

    return project;
  });
  const selectedProject = featuredProjects[selectedProjectIndex];
  const selectedProjectInsight = projectInsights[selectedProject.title];

  const advance = () => setStage((current) => Math.min(current + 1, stages.length));
  const restart = () => setStage(1);

  return (
    <section
      id="idea-to-impact"
      className="relative overflow-hidden py-16 md:py-20"
      aria-labelledby="idea-to-impact-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f2a900]/[0.035] blur-[120px]"
      />

      <Container>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-8 text-center md:mb-9">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-px w-7 bg-[#f2a900]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f2a900]">
                A little about my process
              </span>
              <span className="h-px w-7 bg-[#f2a900]" />
            </div>
            <h2
              id="idea-to-impact-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              From Idea <span className="gold-gradient-text">to Impact</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-400">
              Every meaningful solution starts with curiosity. Explore how I
              turn ideas into real-world digital experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-4 sm:p-6 md:p-8">
            <ol
              aria-label="Journey progress"
              className="mb-4 flex items-center justify-between gap-3"
            >
              {stages.map((item, index) => (
                <li
                  key={item.name}
                  aria-current={stage === index + 1 ? "step" : undefined}
                  className="flex flex-1 items-center gap-2"
                >
                  <span
                    className={`text-[10px] font-semibold tracking-[0.18em] transition-colors sm:text-[11px] ${
                        stage === index + 1
                          ? "text-[#ffd35a] [text-shadow:0_0_12px_rgba(242,169,0,0.45)]"
                          : stage > index + 1
                            ? "text-[#bd830f]"
                            : "text-neutral-600"
                      }`}
                  >
                    {item.name}
                  </span>
                  {index < stages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={`h-px flex-1 ${
                        stage > index + 1 ? "bg-[#f2a900]/50" : "bg-white/10"
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>

            <div className="mb-2 flex min-h-11 items-center justify-center">
              {stage < 4 ? (
                <motion.button
                  type="button"
                  onClick={advance}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  className={actionClassName}
                >
                  {stageActions[stage - 1]}
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                  />
                </motion.button>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#projects"
                    className={actionClassName}
                  >
                    Explore My Projects
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
                    />
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className={actionClassName}
                  >
                    <RotateCcw
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:-rotate-45 group-focus-visible:-rotate-45 motion-reduce:transition-none"
                    />
                    Restart Journey
                  </button>
                </div>
              )}
            </div>

            <div
              className={`relative ${
                stage === 2 || stage === 3 ? "h-36 sm:h-44" : "h-32 sm:h-40"
              }`}
            >
              {stage === 2 ? (
                <ThinkingSequence reducedMotion={reducedMotion} />
              ) : stage === 3 ? (
                <ProjectDiscoveryPath
                  projects={featuredProjects}
                  selectedIndex={selectedProjectIndex}
                  onSelect={setSelectedProjectIndex}
                  buttonRefs={projectButtonRefs}
                  reducedMotion={reducedMotion}
                />
              ) : (
                <JourneyPath stage={stage} reducedMotion={reducedMotion} />
              )}

              {stage === 1 && (
                <motion.button
                  type="button"
                  onClick={advance}
                  aria-label="Begin the journey by clicking the glowing spark"
                  className="absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f2a900]/50 bg-[#f2a900]/10 text-[#ffd35a] shadow-[0_0_45px_rgba(242,169,0,0.18)] transition-colors hover:bg-[#f2a900]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffd35a]"
                  animate={
                    reducedMotion ? {} : { boxShadow: [
                      "0 0 22px rgba(242,169,0,0.12)",
                      "0 0 48px rgba(242,169,0,0.32)",
                      "0 0 22px rgba(242,169,0,0.12)",
                    ] }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: reducedMotion ? 0 : Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={25} strokeWidth={1.4} />
                </motion.button>
              )}

              {stage === 4 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    aria-hidden="true"
                    initial={{ scale: reducedMotion ? 1 : 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.65,
                      delay: reducedMotion ? 0 : 0.2,
                    }}
                    className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28"
                  >
                    <motion.span
                      className="absolute inset-1 rounded-full border border-[#f2a900]/30"
                      animate={reducedMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="absolute inset-4 rounded-full border border-dashed border-[#ffd35a]/25" />
                    <span className="absolute h-10 w-10 rounded-full bg-[#f2a900]/15 blur-xl sm:h-14 sm:w-14" />
                    <span className="relative h-3 w-3 rounded-full bg-[#ffe29a] shadow-[0_0_24px_8px_rgba(242,169,0,0.4)]" />
                    <Sparkles
                      size={16}
                      strokeWidth={1.2}
                      className="absolute -right-1 top-4 text-[#ffd35a]"
                    />
                  </motion.div>
                </div>
              )}
            </div>

            <div aria-live="polite" aria-atomic="true" className="min-h-24 text-center">
              <motion.div
                key={stage === 3 ? `${stage}-${selectedProjectIndex}` : stage}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                  {stage === 3 ? (
                    <div className="mx-auto max-w-2xl">
                      <p className="text-[11px] font-semibold tracking-[0.22em] text-[#f2a900] sm:text-xs">
                        {selectedProject.title}
                      </p>
                      <dl className="mt-4 grid gap-3 text-left sm:grid-cols-2">
                        <div className="rounded-lg border border-white/[0.07] bg-black/30 p-3 sm:p-4">
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                            The problem
                          </dt>
                          <dd className="mt-1.5 text-xs leading-5 text-neutral-300">
                            {selectedProjectInsight.purpose}
                          </dd>
                        </div>
                        <div className="rounded-lg border border-white/[0.07] bg-black/30 p-3 sm:p-4">
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                            What I built
                          </dt>
                          <dd className="mt-1.5 text-xs leading-5 text-neutral-300">
                            {selectedProjectInsight.build}
                          </dd>
                        </div>
                        <div className="rounded-lg border border-white/[0.07] bg-black/30 p-3 sm:col-span-2 sm:p-4">
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                            Development insight
                          </dt>
                          <dd className="mt-1.5 text-xs leading-5 text-neutral-400">
                            {selectedProjectInsight.insight ??
                              "A project-specific challenge or lesson isn’t documented in the portfolio data yet."}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                        <span className="mr-1 text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                          Built with
                        </span>
                        {selectedProject.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="text-[10px] text-neutral-300 after:ml-2 after:text-[#f2a900]/50 after:content-['·'] last:after:hidden"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#f2a900]/30 px-4 text-[11px] font-medium text-[#ffd35a] transition-colors hover:border-[#f2a900]/70 hover:bg-[#f2a900]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
                      >
                        Open project link
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </a>
                    </div>
                  ) : stage === 4 ? (
                    <div className="mx-auto max-w-2xl">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f2a900]">
                        A little about me
                      </p>
                      <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-neutral-300 sm:text-sm sm:leading-6">
                        {currentStage.description}
                      </p>
                      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                        My developer superpower
                      </p>
                      <p className="mx-auto mt-2 max-w-xl text-lg font-medium leading-7 text-[#ffd35a] sm:text-xl">
                        Turning complex problems into practical digital solutions.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] font-semibold tracking-[0.25em] text-[#f2a900]">
                        {currentStage.name}
                      </p>
                      <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-neutral-300 sm:text-base">
                        {currentStage.description}
                      </p>
                    </>
                  )}
              </motion.div>
            </div>

            {stage === 1 && (
              <p className="mt-2 flex items-center justify-center gap-2 text-xs tracking-wide text-neutral-400">
                <span className="h-1 w-1 rounded-full bg-[#f2a900] shadow-[0_0_8px_2px_rgba(242,169,0,0.5)]" />
                Or click the glowing spark to begin.
              </p>
            )}
            {stage === 3 && (
              <p className="mt-2 text-center text-xs tracking-wide text-neutral-400">
                Select a project node to explore its story.
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default IdeaToImpact;
