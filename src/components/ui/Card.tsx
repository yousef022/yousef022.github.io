// import type { ReactNode } from "react";

// type Props = {
//   children: ReactNode;
//   className?: string;
// };

// const Card: React.FC<Props> = ({ children, className }) => (
//   <section className={`subtle ${className ?? ""}`} style={{ padding: 18 }}>
//     {children}
//   </section>
// );

// export default Card;


import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  animate?: boolean;
};

const Card: React.FC<Props> = ({ children, className, animate = true }) => {
  const shouldAnimate = animate;

  return (
    <motion.section
      className={`subtle card ${className ?? ""}`}
      initial={shouldAnimate ? { opacity: 0, y: 20, scale: 0.96 } : undefined}
      whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={shouldAnimate ? { once: true, amount: 0.2 } : undefined}
      transition={shouldAnimate ? { duration: 0.5, ease: "easeOut" } : undefined}
    >
      {children}
    </motion.section>
  );
};

export default Card;
