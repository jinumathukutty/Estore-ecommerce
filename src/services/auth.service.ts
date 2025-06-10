import { endpoints } from "../constants/constants";
import { actions, type AppDispatch } from "../store/store";
import type { Login,  User, UserAdvanced } from "../types/types";
import axiosInstance from "../utils/axiosInstance";


export const loginUser = async (credentials: Login): Promise<User> => {
  try {

    const response = await axiosInstance.post(
      endpoints.auth.login,
      credentials
    );
    return response.data
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};




export const getCurrentAuthUser = async(dispatch : AppDispatch):Promise<UserAdvanced |null>=>{

  const response = await axiosInstance.get(endpoints.auth.currentAuthUser);
  dispatch(actions.setUserFullInfo(response?.data))
  return response?.data;
}