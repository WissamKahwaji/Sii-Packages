import axios from "axios";
import baseURL from "../constants/domain";

const publicInstance = axios.create({ baseURL });
export default publicInstance;
