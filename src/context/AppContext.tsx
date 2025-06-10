import {
  createContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { getCategories, getProducts } from "../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import { actions, type RootState } from "../store/store";
import { getUserCartInfo } from "../services/cart.service";
import { getCurrentAuthUser } from "../services/auth.service";
import i18n from "../localization/i18n";

type AppContextType = {
  val: string | null;
  setVal: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  cartQtyCount: number;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  removeCartItem: (productId: number) => void;
  searchQuery: string | null;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const language = useSelector((state: RootState) => state.language);

  const [val, setVal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    appLoadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // 👇 Compute total quantity from cart
  const cartQtyCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const appLoadData = async () => {
    try {
      await getProducts(dispatch);
      await getCategories(dispatch);
      await getUserCartInfo(dispatch, user);

      if (user) {
        await getCurrentAuthUser(dispatch);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    const existingCart = [...cart];
    const updatedCart = existingCart.map((item) => {
      if (item.id === productId) {
        const newQuantity = quantity < 1 ? 1 : quantity;
        const newTotal = item.price * newQuantity;
        return {
          ...item,
          quantity: newQuantity,
          total: newTotal,
          discountedTotal: parseFloat(
            (newTotal - (newTotal * item.discountPercentage) / 100).toFixed(2)
          ),
        };
      }
      return item;
    });
    dispatch(actions.setCart(updatedCart));
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  const removeCartItem = (productId: number) => {
    const existingCart = [...cart];
    const updatedCart = existingCart.filter((item) => item.id !== productId);
    dispatch(actions.setCart(updatedCart));
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  return (
    <AppContext.Provider
      value={{
        val,
        setVal,
        loading,
        cartQtyCount,
        updateCartItemQuantity,
        removeCartItem,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
