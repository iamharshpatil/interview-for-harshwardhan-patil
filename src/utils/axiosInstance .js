
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spacexdata.com/v4/",
  timeout: 5000,
});

export default axiosInstance;
