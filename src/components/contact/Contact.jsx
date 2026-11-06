import Container from "../common/Container";
import SectionTitle from "../common/SectionTitle";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <section id="contact" className="py-24 md:py-28">
      <Container>
        <SectionTitle title="Contact" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <ContactInfo />

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

export default Contact;