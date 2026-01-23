type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ href, onClick, children }) => {
  const style: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    padding: "10px 14px",
    borderRadius: 14,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };

  if (href) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={{ ...style, color: "inherit", cursor: "pointer" }}>
      {children}
    </button>
  );
};

export default Button;
