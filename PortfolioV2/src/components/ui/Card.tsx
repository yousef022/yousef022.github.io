import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => (
  <section className={`subtle ${className ?? ""}`} style={{ padding: 18 }}>
    {children}
  </section>
);

export default Card;
