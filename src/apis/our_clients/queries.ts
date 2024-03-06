import { useQuery } from "@tanstack/react-query";
import { getOurClientsInfo } from ".";

const useGetClientsQuery = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: () => getOurClientsInfo(),
  });

export { useGetClientsQuery };
