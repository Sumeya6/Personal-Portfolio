import { FaGithub,FaLinkedin } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { motion } from "motion/react";
import ContactItem from "./ContactItem";
import { contactInfo, socialLinks } from "../../data/contact";

const socialIcons = {
  LinkedIn: FaLinkedin,
  Telegram: IoIosSend,
  GitHub: FaGithub,
};

function ContactInfo() {
  return (
    <div>
      <div className="mb-7">
        <h3 className="text-xl font-bold">Connect Me</h3>

        <p className="mt-2 text-[13px] text-neutral-400">
          Want to get in touch? Here's where you can find me.
        </p>
      </div>

      <div className="space-y-3">
        {contactInfo.map((item) => (
          <ContactItem key={item.type} {...item} />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 rounded-lg border border-white/5 bg-[#181818] p-5">
        {socialLinks.map((social, index) => {
          const Icon = socialIcons[social.name];

          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.05 }}
              transition={{ delay: index * 0.05 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f2a900]/20 bg-[#211d12] text-[#f2a900] transition-colors hover:bg-[#f2a900] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd35a]"
              aria-label={social.name}
            >
              <Icon size={17} aria-hidden="true" />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

export default ContactInfo;