"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  className = "",
  once = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

