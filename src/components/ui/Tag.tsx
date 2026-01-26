type Props = { text: string };

const Tag: React.FC<Props> = ({ text }) => (
  <span
    style={{
      border: "1px solid var(--border)",
      background: "var(--surface2)",
      padding: "5px 10px",
      borderRadius: 999,
      fontSize: 12,
      color: "var(--text)",
    }}
  >
    {text}
  </span>
);

export default Tag;
