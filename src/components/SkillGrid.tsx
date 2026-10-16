"use client";

import { motion, type Variants } from "framer-motion";
import Card from "./ui/Card";
import Chip from "./ui/Chip";

type Group = { category: string; items: string[] };

const ease = [0.22, 1, 0.36, 1] as const;

const chipList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } },
};

const chip: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease } },
};

/** Skill group cards that fade in on scroll, with their chips scaling in one after another. */
export default function SkillGrid({ groups }: { groups: Group[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {groups.map((group, i) => (
        <motion.li
          key={group.category}
          data-reveal
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: (i % 2) * 0.12, ease }}
        >
          <Card className="h-full transition-colors hover:border-arc/50">
            <h3 className="flex items-center gap-3 font-heading text-xl text-text">
              <span aria-hidden className="h-5 w-1 rounded-full bg-arc" />
              {group.category}
            </h3>
            <motion.ul
              className="mt-5 flex flex-wrap gap-2"
              variants={chipList}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {group.items.map((item) => (
                <motion.li key={item} data-reveal variants={chip}>
                  <Chip accent="var(--color-arc)">{item}</Chip>
                </motion.li>
              ))}
            </motion.ul>
          </Card>
        </motion.li>
      ))}
    </ul>
  );
}
