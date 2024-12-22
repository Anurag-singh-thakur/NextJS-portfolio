import React from 'react';
import { motion } from 'framer-motion';
import { Code, Laptop, Database, FileCode, Blocks } from 'lucide-react';

const icons = [
  { Icon: Code, color: 'text-green-400' },
  { Icon: Laptop, color: 'text-blue-400' },
  { Icon: Database, color: 'text-red-400' },
  { Icon: FileCode, color: 'text-yellow-400' },
  { Icon: Blocks, color: 'text-purple-400' }
];

export const FloatingIcons = () => (
  <div className="absolute inset-0">
    {icons.map(({ Icon, color }, index) => (
      <motion.div
        key={index}
        initial={{ y: 0, opacity: 0.2 }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          y: { repeat: Infinity, repeatType: 'loop', duration: 3 },
          opacity: { repeat: Infinity, repeatType: 'loop', duration: 3 }
        }}
        className={`absolute z-0 ${color} opacity-20`}
        style={{
          top: `${Math.random() * 90 + 5}%`,
          left: `${Math.random() * 90 + 5}%`
        }}
      >
        <Icon size={60} />
      </motion.div>
    ))}
  </div>
);