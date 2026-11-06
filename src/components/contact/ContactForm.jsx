
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { contactInfo } from "../../data/contact";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emailContact = contactInfo.find((item) => item.type === "Email");

function ContactForm() {
  const reducedMotion = useReducedMotion();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } =
      import.meta.env;

    if (
      !VITE_EMAILJS_SERVICE_ID ||
      !VITE_EMAILJS_TEMPLATE_ID ||
      !VITE_EMAILJS_PUBLIC_KEY
    ) {
      setStatus("unavailable");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        event.target,
        {
          publicKey: VITE_EMAILJS_PUBLIC_KEY,
        }
      );

      setStatus("success");
      setForm(initialForm);
      event.target.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-transparent px-3 py-3 text-xs text-white outline-none placeholder:text-neutral-600 transition-all duration-300 focus:border-[#f2a900]/60 focus:ring-1 focus:ring-[#f2a900]/20";

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.7 }}
      className="rounded-xl border border-white/5 bg-[#171717] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-7"
    >
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold">Send Message</h3>
      </div>

      {status === "success" && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          aria-live="polite"
          className="mb-5 flex items-center gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-xs text-green-400"
        >
          <CheckCircle2 size={15} />
          Message sent successfully!
        </motion.div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400"
        >
          Failed to send message. Please try again.
        </div>
      )}

      {status === "unavailable" && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400"
        >
          The contact form is temporarily unavailable. Please{" "}
          <a
            href={emailContact.href}
            className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
          >
            email me directly
          </a>
          .
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading}>
        <div>
          <label htmlFor="name" className="mb-2 block text-[12px] font-semibold text-neutral-300">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[12px] font-semibold text-neutral-300">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-[12px] font-semibold text-neutral-300">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block text-[12px] font-semibold text-neutral-300">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="Enter message subject"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-[12px] font-semibold text-neutral-300">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
            className={`${inputClasses} resize-none`}
          />
        </div>

        <motion.button
          whileHover={reducedMotion ? undefined : { scale: 1.01 }}
          whileTap={reducedMotion ? undefined : { scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#f2a900] py-3 text-xs transition-colors hover:bg-[#ffc107] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span>{loading ? "Sending..." : "Send Message"}</span>
          {!loading && <ArrowRight size={16} aria-hidden="true" />}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ContactForm;
