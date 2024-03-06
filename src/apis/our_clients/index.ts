import API_ROUTES from "../../constants/apiRoutes";
import publicInstance from "../publicInstance";
import { ClientsModel } from "./type";

const getOurClientsInfo = async () => {
  const res = await publicInstance.get<ClientsModel[]>(API_ROUTES.CLIENTS.GET);
  return res.data;
};

export { getOurClientsInfo };
