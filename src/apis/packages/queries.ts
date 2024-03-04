import { useQuery } from "@tanstack/react-query";
import { getCategories, getCategoryPackages } from ".";

const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

const useGetCategoryPackagesQuery = (id: string | undefined) =>
  useQuery({
    queryKey: ["category-packages"],
    queryFn: () => getCategoryPackages(id),
    enabled: !!id,
  });
export { useGetCategoriesQuery, useGetCategoryPackagesQuery };
