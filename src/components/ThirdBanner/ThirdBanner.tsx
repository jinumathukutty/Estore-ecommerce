import iwatch from "../../assets/images/iwatch.png";
import ipad from "../../assets/images/ipad.png";
import samsung_galaxy from "../../assets/images/samsung_galaxy.png";
import macbook_pro from "../../assets/images/macbook_pro.png";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ThirdBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    ///Third Banner
    <>
      <section className="hidden lg:flex w-full flex-col lg:flex-row">
        {/* First Product */}
        <div className="bg-white hidden lg:w-1/4  lg:flex lg:flex-col lg:items-center">
          <img src={iwatch} alt="iwatch" className="h-[150px]" loading="lazy" />
          <p className="font-inter font-light text-2xl ">
            {t("Popular Products")}
          </p>
          <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
            {t(
              "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
            )}
          </p>
          <button
            className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px]"
            onClick={() => navigate({ pathname: "/products" })}
          >
            {t("Shop Now")}
          </button>
        </div>

        {/* Second Product */}
        <div className="bg-[#F9F9F9] hidden lg:w-1/4  lg:flex lg:flex-col lg:items-center">
          <img src={ipad} alt="ipad" className="h-[150px]" loading="lazy" />
          <p className="font-inter font-light text-2xl">{t("Ipad Pro")}</p>
          <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
            {t(
              "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
            )}
          </p>
          <button
            className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px] mb-10"
            onClick={() => navigate({ pathname: "/products" })}
          >
            {t("Shop Now")}
          </button>
        </div>

        {/* Third Product */}
        <div className="bg-[#EAEAEA] hidden lg:w-1/4  lg:flex lg:flex-col lg:items-center">
          <img
            src={samsung_galaxy}
            alt="samsung galaxy"
            className="h-[150px]"
            loading="lazy"
          />
          <p className="font-inter font-light text-2xl">
            {t("Samsung Galaxy")}
          </p>
          <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
            {t(
              "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
            )}
          </p>
          <button
            className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px] mb-10"
            onClick={() => navigate({ pathname: "/products" })}
          >
            {t("Shop Now")}
          </button>
        </div>

        {/* Fourth Product */}
        <div className="bg-[#2C2C2C] hidden lg:w-1/4  lg:flex lg:flex-col lg:items-center">
          <img
            src={macbook_pro}
            alt="macbook pro"
            className="h-[150px]"
            loading="lazy"
          />
          <p className="font-inter font-light text-2xl text-white">
            {t("Macbook Pro")}
          </p>
          <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
            {t(
              "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
            )}
          </p>
          <button
            className="p-1 border-[1px] border-solid border-white rounded-[10px] text-[14px] text-white w-[40%] h-[40px] mb-10"
            onClick={() => navigate({ pathname: "/products" })}
          >
            {t("Shop Now")}
          </button>
        </div>
      </section>

      <div className="block lg:hidden">
        <Swiper pagination={true} modules={[Pagination]}>
          <SwiperSlide>
            <div className="w-full max-h-[620px] bg-white flex flex-col items-center">
              <img src={iwatch} alt="iwatch" loading="lazy" />
              <p className="font-inter font-light text-2xl ">
                {t("Popular Products")}
              </p>
              <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
                {t(
                  "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
                )}
              </p>
              <button
                className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px]"
                onClick={() => navigate({ pathname: "/products" })}
              >
                {t("Shop Now")}
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full max-h-[620px] bg-[#F9F9F9] flex flex-col items-center">
              <img src={ipad} alt="ipad" loading="lazy" />
              <p className="font-inter font-light text-2xl">{t("Ipad Pro")}</p>
              <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
                {t(
                  "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
                )}
              </p>
              <button
                className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px] mb-10"
                onClick={() => navigate({ pathname: "/products" })}
              >
                {t("Shop Now")}
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full max-h-[620px] bg-[#EAEAEA] flex flex-col items-center">
              <img src={samsung_galaxy} alt="samsung galaxy" loading="lazy" />
              <p className="font-inter font-light text-2xl">
                {t("Samsung Galaxy")}
              </p>
              <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
                {t(
                  "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
                )}
              </p>
              <button
                className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px] mb-10"
                onClick={() => navigate({ pathname: "/products" })}
              >
                {t("Shop Now")}
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full max-h-[620px] bg-[#2C2C2C] flex flex-col items-center">
              <img src={macbook_pro} alt="macbook pro" loading="lazy" />
              <p className="font-inter font-light text-2xl text-white">
                {t("Macbook Pro")}
              </p>
              <p className="font-inter font-light text-[12px] px-5 py-5 text-primary-text">
                {t(
                  "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
                )}
              </p>
              <button
                className="p-1 border-[1px] border-solid border-white rounded-[10px] text-[14px] text-white w-[40%] h-[40px] mb-10"
                onClick={() => navigate({ pathname: "/products" })}
              >
                {t("Shop Now")}
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default ThirdBanner;
