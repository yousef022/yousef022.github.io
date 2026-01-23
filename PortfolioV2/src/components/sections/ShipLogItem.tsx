import Card from "../ui/Card";
import Tag from "../ui/Tag";
import type { ShipLogItem } from "../../features/shiplog/shiplog.types";
import { formatDate } from "../../lib/utils/formatDate";

type Props = { item: ShipLogItem };

const ShipLogItemView: React.FC<Props> = ({ item }) => (
  <Card>
    <div className="row" style={{ justifyContent: "space-between" }}>
      <div className="row">
        <span className="kbd">{formatDate(item.date)}</span>
        <span style={{ color: "rgba(231,234,241,0.95)", fontWeight: 600 }}>{item.title}</span>
      </div>
      <div className="stack">
        {item.tags.map((t) => (
          <Tag key={t} text={t} />
        ))}
      </div>
    </div>

    <p className="p" style={{ marginTop: 10 }}>
      {item.summary}
    </p>
  </Card>
);

export default ShipLogItemView;
