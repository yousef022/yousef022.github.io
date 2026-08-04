import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  animate?: boolean;
} & Omit<HTMLMotionProps<"section">, "children" | "animate">;

const Card: React.FC<Props> = ({ children, className, animate = true, ...rest }) => {
  const shouldAnimate = animate;

  return (
    <motion.section
      className={`subtle card ${className ?? ""}`}
      initial={shouldAnimate ? { opacity: 0, y: 20, scale: 0.96 } : undefined}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={shouldAnimate ? { once: false, amount: 0.2 } : undefined}
      transition={shouldAnimate ? { duration: 0.5, ease: "easeOut" } : undefined}
      {...rest}
    >
      {children}
    </motion.section>
  );
};

export default Card;
