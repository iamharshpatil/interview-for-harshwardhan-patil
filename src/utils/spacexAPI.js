
import axiosInstance from "./axiosInstance ";

export const fetchLaunches = async () => {
  try {
    const response = await axiosInstance.get("launches");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching launches:", error);
    return [];
  }
};
