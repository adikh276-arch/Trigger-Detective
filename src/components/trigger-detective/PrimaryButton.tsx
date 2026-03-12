import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const PrimaryButton = ({ children, onClick, variant = "primary" }: PrimaryButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      className={`w-full py-4 rounded-[16px] font-body font-medium text-base shadow-md transition-shadow active:shadow-sm
        ${variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
        }`}
    >
      {children}
    </motion.button>
  );
};

export default PrimaryButton;
