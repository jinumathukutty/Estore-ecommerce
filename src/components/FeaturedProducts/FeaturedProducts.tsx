import { lazy } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

const ProductCard = lazy(() => import("../ProductCard/ProductCard"));

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const products = useSelector((state: RootState) => state?.products);
  const productCards = products
    ?.slice(0, 12)
    .map((item) => <ProductCard key={item?.id} product={{ ...item }} />);

  return (
    <section className="mb-3 lg:py-[50px] lg:px-[115px]">
      <Tabs
        defaultActiveKey="1"
        className="product-tabs [.ant-tabs]:items-center  lg:product-tabs lg:[.ant-tabs]:items-baseline"
      >
        <Tabs.TabPane tab={t("New Arrival")} key="1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:gap-4">
            {productCards}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("Best Seller")} key="2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:gap-4">
            {productCards}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("Featured Products")} key="3">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:flex lg:flex-wrap lg:gap-4">
            {productCards}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </section>
  );
};

export default FeaturedProducts;
