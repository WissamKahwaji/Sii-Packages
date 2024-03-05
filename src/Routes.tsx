import { Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import LoadingPage from "./pages/loadingPage/LoadingPage";
import Home from "./pages/home";
import Pricing from "./pages/Pricing/Pricing";
import SamplesPage from "./pages/Samples";
import OurProjects from "./pages/Our_Projects";
import AboutUs from "./pages/about_us";
import OurPackages from "./pages/packages";
import ContactUs from "./pages/contact_us";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="pricing/:id" element={<Pricing />} />
        <Route path="pricing/:id/samples/:id" element={<SamplesPage />} />
        <Route path="our-projects" element={<OurProjects />} />
        <Route path="packages" element={<OurPackages />} />
        <Route path="packages/pricing/:id" element={<Pricing />} />
        <Route
          path="packages/pricing/:id/samples/:id"
          element={<SamplesPage />}
        />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>
    )
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Routes;
