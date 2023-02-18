import { Outlet } from "react-router-dom";
import "../output.css"
const Layout = () => {
  return (
    <main className="h-screen w-screen">
      <Outlet />
    </main>
  );
};
export default Layout