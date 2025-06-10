import { endpoints } from "../constants/constants";
import { actions, type AppDispatch } from "../store/store";
import type { Cart, CartProduct, CartResponse, Product } from "../types/types";
import axiosInstance from "../utils/axiosInstance";

export const getUserCartInfo = async (
  dispatch: AppDispatch,
  user: { accessToken?: string; id: number } | null
): Promise<CartProduct[]> => {

  const guestCart: CartProduct[] = JSON.parse(
    localStorage.getItem("guestCart") || "[]"
  );


  if (user && user.accessToken) {
    try {
      // Fetch from API if logged in

      if(guestCart?.length > 0){
        const products = guestCart.map((item)=> ( { id :item?.id , quantity :item?.quantity}) )

        const response = await axiosInstance.put<Cart>(
          endpoints.cart.updateCart(user?.id),{
            merge:true,
            products
          }
        );
  
        const allProducts = response?.data?.products?.map((cart) => cart);
        dispatch(actions.setCart(allProducts));
        localStorage.removeItem("guestCart")
        return allProducts;


      }else{
        const response = await axiosInstance.get<CartResponse>(
          endpoints.cart.getUserCart(user?.id)
        );

        const allProducts = response.data?.carts?.[0]?.products ?? [];
        dispatch(actions.setCart(allProducts));
        return allProducts;
      }
      
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return [];
    }
  } else {
    // Get from localStorage for guest
    const cart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    dispatch(actions.setCart(Array.isArray(cart) ? cart : []));
    return Array.isArray(cart) ? cart : [];
  }
};


export const addCartClick = async (dispatch:AppDispatch,
  user: { accessToken?: string; id: number } | null,product: Product, quantity: number = 1,cartInfo:CartProduct[]|[]): Promise<CartProduct[]>  => {
    

    try {
      if (!user || !user.accessToken) {
        const cart = [...cartInfo]; // use current state
  
        const existingItemIndex = cart.findIndex(
          (item) => item.id === product.id
        );
  
        if (existingItemIndex !== -1) {
          cart[existingItemIndex].quantity += quantity;
          cart[existingItemIndex].total =
            cart[existingItemIndex].quantity * cart[existingItemIndex].price;
          cart[existingItemIndex].discountedTotal = parseFloat(
            (
              cart[existingItemIndex].total -
              (cart[existingItemIndex].total *
                cart[existingItemIndex].discountPercentage) /
                100
            ).toFixed(2)
          );
        } else {
          const cartItem: CartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            total: product.price * quantity,
            discountPercentage: product.discountPercentage,
            discountedTotal: parseFloat(
              (
                product.price * quantity -
                (product.price * quantity * product.discountPercentage) / 100
              ).toFixed(2)
            ),
            thumbnail: product.thumbnail
          };
          cart.push(cartItem);
        }
  
        localStorage.setItem("guestCart", JSON.stringify(cart));
        dispatch(actions.setCart(Array.isArray(cart) ? cart : []));
        return cart
      }else{
        const products = cartInfo.map((item)=> ( { id :item?.id , quantity :item?.quantity}) )
        products.push({
          id:product.id,
          quantity :product?.minimumOrderQuantity
        })
        const response = await axiosInstance.post<Cart>(
          endpoints.cart.addCart(),{
            userId:user?.id,
            products
          }
        );
        const allProducts = response.data?.products ?? [];
        dispatch(actions.setCart(allProducts));
        return response.data?.products;
      }
      return []
    } catch (error) {
      console.error("Error fetching user cart:", error);
      return [];
    }
  };
