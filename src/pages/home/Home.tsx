import Category from "../../components/Category/Category";
import MainBanner from "../../components/MainBanner/MainBanner";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import SecondBanner from "../../components/SecondBanner/SecondBanner";
import MainLayout from "../../layouts/MainLayout";
import ThirdBanner from "../../components/ThirdBanner/ThirdBanner";
import FourthBanner from "../../components/FourthBanner/FourthBanner";
import DiscountProducts from "../../components/DiscountProducts/DiscountProducts";

const Home = () => {
  return (
    <>
      <MainLayout>
        <MainBanner />
        <SecondBanner />
        <Category />
        <FeaturedProducts />
        <ThirdBanner />
        <DiscountProducts />
        <FourthBanner />
      </MainLayout>
    </>
  );
};

export default Home;
