import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const DiscountProducts = () => {
  const { t } = useTranslation();
  const products = useSelector((state: RootState) => state?.products);
  const productCards = products
    ?.slice(0, 4)
    .map((item) => <ProductCard key={item?.id} product={{ ...item }} />);
  return (
    <section className="p-2 gap-4 lg:py-[50px] lg:px-[115px]">
      <p className="font-inter font-light text-2xl mb-3">
        {t("Discounts up to -50%")}
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:gap-4">
        {productCards}
      </div>
    </section>
  );
};

export default DiscountProducts;
