import { Outlet } from "react-router-dom";
import TopNav from "../../components/sections/TopNav";
import Footer from "../../components/sections/Footer";

const AppShell: React.FC = () => (
  <div className="app">
    <TopNav />

    <main className="page">
      <div className="container">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);

export default AppShell;
