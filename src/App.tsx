import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layouts/header/index";
import Footer from "./layouts/footer";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <Navbar />

      <main className="mt-[80px] md:mt-[97px] lg:mt-[116px] ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
