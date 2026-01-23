import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import { useDocumentTitle } from "../../lib/hooks/useDocumentTitle";

const NotFound: React.FC = () => {
  useDocumentTitle("Not Found");

  return (
    <Card>
      <h1 className="h1" style={{ fontSize: 34 }}>404</h1>
      <p className="p">That page doesn’t exist.</p>
      <div style={{ marginTop: 14 }}>
        <Link to="/" className="kbd">Go home →</Link>
      </div>
    </Card>
  );
};

export default NotFound;
