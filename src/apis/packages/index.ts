import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { Category } from "./type";

const getCategories = async () => {
  const res = await publicInstance.get<Category[]>(
    API_ROUTES.PACKAGES.GET_CATEGORIES
  );
  return res.data;
};
const getCategoryPackages = async (id: string | undefined) => {
  const res = await publicInstance.get<Category>(
    API_ROUTES.PACKAGES.GET_CATEGORY_PACKAGES(id)
  );
  return res.data;
};

export { getCategories, getCategoryPackages };
