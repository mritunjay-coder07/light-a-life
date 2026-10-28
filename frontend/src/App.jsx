import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import SetuPage from "./pages/SetuPage";
import "./App.css";

// "#/setu" shows the SETU page, anything else shows the Diya landing page
const getRoute = () => (window.location.hash === "#/setu" ? "setu" : "home");

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route === "setu" ? <SetuPage /> : <LandingPage />;
}