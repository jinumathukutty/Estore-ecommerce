import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FourthBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-[url('/images/fourth_banner_mob.png')]  w-full h-[450px] bg-cover bg-center flex flex-col justify-center items-center lg:bg-[url('/images/fourth_banner.png')]">
      <p className="text-white text-5xl font-inter font-thin">
        {t("Big Summer")} <strong>{t("Sale")}</strong>
      </p>
      <p className="text-primary-text mt-5">
        {t("Seasonal Style. Unbeatable Prices.")}
      </p>
      <button
        className="px-6 py-2 border-[1px] border-solid border-white rounded-[10px] text-[14px] text-white  w-[150px] h-[40px] mt-7"
        onClick={() => navigate({ pathname: "/products" })}
      >
        {t("Shop Now")}
      </button>
    </div>
  );
};

export default FourthBanner;
