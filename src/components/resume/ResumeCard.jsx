import { motion } from "motion/react";

function ResumeCard({
  number,
  year,
  title,
  institution,
  description,
  index,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative rounded-xl border border-white/5 bg-[#181818] p-6 transition-colors duration-300 hover:border-[#f2a900]/20"
    >
      <span className="absolute right-5 top-4 text-5xl font-bold text-[#f2a900]/10 transition-colors group-hover:text-[#f2a900]/20">
        {number}
      </span>

      <p className="mb-4 text-3xl font-bold text-[#f2a900]">{year}</p>

      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>

      <p className="mb-3 text-[13px] font-medium text-neutral-300">
        {institution}
      </p>

      <p className="text-[13px] leading-5 text-neutral-400">{description}</p>
    </motion.article>
  );
}

export default ResumeCard;