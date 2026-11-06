import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import ResumeCard from "./ResumeCard";
import { resumeItems } from "../../data/resume";

function Resume() {
  return (
    <section id="resume" className="py-15 md:py-20">
      <Container>
        <SectionTitle
          title="Resume"
          description="Electrical and Computer Engineering student skilled in electronics, programming, and web development."
        />

        <div className="grid gap-10 md:grid-cols-2">
          {resumeItems.map((item, index) => (
            <ResumeCard
              key={`${item.year}-${item.title}`}
              {...item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Resume;