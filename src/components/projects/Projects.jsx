import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import ProjectCard from "./ProjectCard";
import { projects } from "../../data/project";

function Projects() {
  return (
    <section id="projects" className="py-24 md:py-28">
      <Container>
        <SectionTitle title="Projects" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Projects;