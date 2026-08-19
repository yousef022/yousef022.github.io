import "../../styles/Tag.css";

type Props = {
  text: string;
  icon?: React.ReactNode;
  className?: string;
};

const Tag: React.FC<Props> = ({ text, icon, className }) => (
  <span className={`uiTag${className ? ` ${className}` : ""}`}>
    {icon ? <span className="uiTag__icon" aria-hidden>{icon}</span> : null}
    <span className="uiTag__label">{text}</span>
  </span>
);

export default Tag;
