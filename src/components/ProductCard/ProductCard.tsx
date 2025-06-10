import { Link } from "react-router-dom";
import type { Product } from "../../types/types";
import { HeartOutlined } from "@ant-design/icons";
import { message } from "antd";
import { addCartClick } from "../../services/cart.service";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import DirhamIcon from "../DirhamIcon/DirhamIcon";
import { useTranslation } from "react-i18next";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [messageApi, contextHolder] = message.useMessage();

  const wishOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  const addCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    e.preventDefault();
    await addCartClick(
      dispatch,
      user,
      product,
      product.minimumOrderQuantity,
      cart
    );
    success();
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: t("Item added to cart"),
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="no-underline text-inherit"
      key={product.id}
    >
      {contextHolder}
      <div className="bg-[#f7f7f7] flex flex-col items-center rounded-md hover:shadow-lg w-[200px] py-4 lg:relative lg:p-4 shadow-md  lg:w-[300px]  transition">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={wishOnClick} // prevents Link navigation if button clicked
        >
          <HeartOutlined />
        </button>

        <img
          src={product?.images[0]}
          alt={product.title}
          className="w-full h-[200px] object-contain mb-4"
          loading="lazy"
        />

        <div className="text-center mb-4 min-h-[48px] max-h-[48px] overflow-hidden">
          <h3 className="text-[14px] font-inter font-medium line-clamp-2 text-primary-dark">
            {product.title}
          </h3>
        </div>

        <p className="text-primary-dark font-bold text-md mb-4">
          <DirhamIcon
            style={{
              fontSize: "12px",
              marginRight: "2px",
            }}
          />
          {product.price}
        </p>

        <button
          onClick={(e) => addCart(e, product)}
          className="bg-primary-dark text-white px-6 py-2 rounded-[10px] text-[14px] hover:bg-primary-dark-hover transition font-inter font-light w-[150px] h-[40px]"
        >
          {t("Add to Cart")}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
