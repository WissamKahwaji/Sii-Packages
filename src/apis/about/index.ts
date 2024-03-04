import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { AboutInfo } from "./type";

const getAboutInfo = async () => {
  const res = await publicInstance.get<AboutInfo>(API_ROUTES.ABOUT.GET);
  return res.data;
};

export { getAboutInfo };
