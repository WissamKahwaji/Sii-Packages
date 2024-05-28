import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import Routes from "./Routes";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-F9R513W9P6";

ReactGA.initialize(TRACKING_ID);

const Wrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ToastContainer />
      <Routes />
    </QueryClientProvider>
  );
};

export default Wrapper;
