
import { motion } from "motion/react";
import Container from "../common/Container";
import Button from "../common/Button";
import SkillCard from "./SkillCard";
import { skillGroups } from "../../data/skills";
import SectionTitle from "../common/SectionTitle";
import aboutImage from "../../assets/images/profile/about-image.jpg";

function About() {
  return (
    <section id="about" className="py-24 md:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]"
        >
          <div>
            <SectionTitle title="About Me" />

            <p className="mb-4 text-[20px] text-neutral-300">
              Full-Stack Developer
            </p>

            <p className="max-w-xl text-[13px] leading-6 text-neutral-400">
              I'm Sumeya, an Electrical and Computer Engineering student
              and full-stack developer passionate about building practical,
              scalable, and user-focused web applications. My primary focus
              is backend development, designing RESTful APIs, managing
              databases, and building reliable application architectures
              using Node.js, Express, and PostgreSQL or MongoDB.
              <br />
              <br />
              With experience in React and modern frontend technologies,
              I enjoy transforming ideas into complete web applications.
              I'm continuously improving my software engineering skills,
              exploring new technologies, and working on projects that
              solve real-world problems.
            </p>

            <div className="mt-7 flex flex-wrap gap-5">
              <Button href="#resume">
                <span className="font-semibold">Learn More</span>
              </Button>

              <Button href="#contact" variant="secondary">
                <span className="font-semibold">Contact</span>
              </Button>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-md"
          >
            <img
              src={aboutImage}
              alt="Sumeya - Full-Stack Developer"
              loading="lazy"
              decoding="async"
              className="h-[260px] w-full object-cover sm:h-[320px]"
            />
          </motion.div>
        </motion.div>

        <div id="skills" className="mt-20 scroll-mt-[90px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-7 text-xl font-bold">Technical Skills</h3>

            <div className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-3 xl:grid-cols-4">
              {skillGroups.map((group) => (
                <div key={group.category} className="contents">
                  <h4 className="col-span-full mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 first:mt-0">
                    {group.category}
                  </h4>
                  {group.skills.map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default About;
