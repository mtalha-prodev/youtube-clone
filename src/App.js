import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./home/HomeScreen";
import UserLogin from "./home/login/UserLogin";

import "./_app.scss";

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const sidebarToggle = () => toggleSidebar((val) => !val);
  return (
    <>
      <Header sidebarToggle={sidebarToggle} />
      <div className="app__container">
        <Sidebar sidebar={sidebar} sidebarToggle={sidebarToggle} />
        <Container fluid className="app__main">
          {children}
          <Outlet />
        </Container>
      </div>
    </>
  );
};

function App() {
  const { accessToken, profile } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!profile && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, profile, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="search" element={<h3>searching result</h3>} />
        </Route>
        <Route path="/auth" element={<UserLogin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
