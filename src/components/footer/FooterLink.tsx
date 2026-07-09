'use client';

import { motion } from 'framer-motion';

interface FooterLinkProps {
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
}

export default function FooterLink({
  label,
  onClick,
  href,
  external,
  icon,
}: FooterLinkProps) {
  const isModal = onClick !== undefined;

  if (isModal) {
    return (
      <motion.button
        onClick={onClick}
        className="body-sm text-[#A1A1AA] hover:text-[#3B82F6] transition-colors duration-200 cursor-pointer text-left flex items-center gap-2 group"
        whileHover={{ x: 4 }}
      >
        {icon && (
          <motion.span
            whileHover={{ scale: 1.15 }}
            className="flex-shrink-0"
          >
            {icon}
          </motion.span>
        )}
        <span className="relative">
          {label}
          <motion.span
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] rounded-full"
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="body-sm text-[#A1A1AA] hover:text-[#3B82F6] transition-colors duration-200 cursor-pointer flex items-center gap-2 group"
      whileHover={{ x: 4 }}
    >
      {icon && (
        <motion.span
          whileHover={{ scale: 1.15 }}
          className="flex-shrink-0"
        >
          {icon}
        </motion.span>
      )}
      <span className="relative">
        {label}
        <motion.span
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] rounded-full"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </motion.a>
  );
}
