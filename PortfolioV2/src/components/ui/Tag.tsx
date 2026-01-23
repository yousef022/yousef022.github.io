type Props = { text: string };

const Tag: React.FC<Props> = ({ text }) => (
  <span
    style={{
      border: "1px solid rgba(255,255,255,0.10)",
      background: "rgba(255,255,255,0.03)",
      padding: "5px 10px",
      borderRadius: 999,
      fontSize: 12,
      color: "rgba(231,234,241,0.9)",
    }}
  >
    {text}
  </span>
);

export default Tag;
