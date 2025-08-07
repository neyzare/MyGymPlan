"use client";

import { motion } from "motion/react";

interface CardProps {
  title: string;
  description: string;
  footer?: string;
  className?: string;
}

export function Card({ title, description, footer, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group relative overflow-hidden rounded-lg border p-6 hover:border-blue-500 transition-colors ${className}`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="mt-4 text-gray-600 flex-grow">{description}</p>
        {footer && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-500">
            {footer}
          </div>
        )}
      </div>
    </motion.div>
  );
}
