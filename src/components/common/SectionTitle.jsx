import { motion } from "motion/react";

function SectionTitle({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="mb-12 text-center"
    >
      <div className="flex items-center justify-center gap-2">
        <span className="h-[2px] w-7 bg-[#f2a900]" />

        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

        <span className="h-[2px] w-7 bg-[#f2a900]" />
      </div>

      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-6 text-neutral-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionTitle;
