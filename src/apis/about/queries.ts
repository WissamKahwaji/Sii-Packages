import { useQuery } from "@tanstack/react-query";
import { getAboutInfo } from ".";

const useGetAboutQuery = () =>
  useQuery({
    queryKey: ["about"],
    queryFn: () => getAboutInfo(),
  });

export { useGetAboutQuery };
