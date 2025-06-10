import type { Categories, Product, ProductApiResponse } from ".././types/types";
import { endpoints } from "../constants/constants";
import { actions, type AppDispatch } from "../store/store";
import axiosInstance from "../utils/axiosInstance";

export const getProducts = async (
  dispatch: AppDispatch
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<ProductApiResponse>(
      endpoints.products.getAll
    );
    dispatch(actions.setProductResponse(response.data));
    dispatch(actions.setProducts(response.data.products)); // ✅ Corrects
    return response.data.products; // ✅ Correct return type
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get<Product>(
      endpoints.products.getSingle(id)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getCategories = async (
  dispatch: AppDispatch
): Promise<Categories[]> => {
  try {
    const response = await axiosInstance.get(endpoints.products.getCategories);
    dispatch(actions.setCategories(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductBySearch = async (
  dispatch: AppDispatch,
  query: string
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<ProductApiResponse>(
      endpoints.products.searchProduct(query)
    );
    dispatch(actions.setProductResponse(response.data));
    dispatch(actions.setProducts(response.data.products)); // ✅ Correct
    return response.data.products; // ✅ Correct return type
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
