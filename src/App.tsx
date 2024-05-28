import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layouts/header/index";
import Footer from "./layouts/footer";
import ReactGA from "react-ga4";
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/", title: "Home Page" });
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <Navbar />

      <main className="mt-[63px] md:mt-[97px] lg:mt-[116px] ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
