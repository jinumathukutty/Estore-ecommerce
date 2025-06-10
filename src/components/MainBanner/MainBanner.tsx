import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import iphone from "../../assets/images/iphone.png";

const MainBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="bg-banner-bg w-full flex flex-col justify-center  lg:flex-row lg:justify-between lg:pl-[15rem] lg:pr-[15rem] lg:h-[30rem]">
      <div className="mt-10 flex flex-col gap-5 justify-center items-center lg:mt-0 lg:items-baseline">
        <p className="text-[#b0b0b1] text-2xl font-inter">{t("Pro.Beyond.")}</p>
        <p className="text-white text-8xl font-inter font-thin flex flex-col items-center gap-3 lg:flex-row lg:text-5xl">
          {t("IPhone 14")} <strong>{t("Pro")}</strong>
        </p>
        <p className="text-[#b0b0b1] text-[20px] font-inter font-extralight text-center">
          {t("Created to change everything for the better. For everyone")}
        </p>
        <button
          className="px-6 py-2 border-[1px] border-solid border-white rounded-[10px] text-[14px] text-white w-[150px] h-[40px] cursor-pointer"
          onClick={() => navigate({ pathname: "/products" })}
        >
          {t("Shop Now")}
        </button>
      </div>
      <img src={iphone} alt="iphone" loading="lazy" />
    </section>
  );
};

export default MainBanner;
