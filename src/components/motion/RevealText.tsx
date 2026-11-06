"use client";

import React from "react";
import { motion } from "motion/react";

interface RevealTextProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export function RevealText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0.1,
  stagger = 0.1,
}: RevealTextProps) {
  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden">
          <motion.div
            initial={{ y: "115%", rotate: 1.5 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1.0,
              delay: delay + idx * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

