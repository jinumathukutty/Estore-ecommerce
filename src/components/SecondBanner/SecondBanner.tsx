import playstation from "../../assets/images/playstation.png";
import playstation_mob from "../../assets/images/playstation_mob.png";
import airpods from "../../assets/images/airpods.png";
import airpods_mob from "../../assets/images/airpods_mob.png";
import visionpro from "../../assets/images/visionpro.png";
import visionpro_mob from "../../assets/images/visionpro_mob.png";
import macbook from "../../assets/images/macbook.png";
import macbook_mob from "../../assets/images/macbook_mob.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SecondBanner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    ///Second Banner
    <section className="flex flex-col w-full lg:flex-row">
      <div className="flex flex-col w-full lg:w-[50%]">
        <div className="flex flex-col lg:flex-row">
          <img
            src={playstation}
            alt="playstation"
            loading="lazy"
            className="hidden lg:block"
          />
          <img
            src={playstation_mob}
            alt="playstation mob"
            loading="lazy"
            className="block lg:hidden"
          />
          <div className="flex flex-col justify-center gap-5 items-center px-3.5 py-6 lg:px-0 lg:py-0 lg:items-baseline">
            <b className="text-3xl font-inter font-thin">
              {t("Playstation")} <strong>5</strong>
            </b>
            <p className="text-[14px] text-[#909090] text-inter text-thin">
              {t(
                "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience."
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="bg-[#EDEDED] gap-12 flex flex-col lg:flex-row lg:w-[50%] ">
            <img
              src={airpods}
              alt="airpods"
              className="hidden lg:block lg:w-[40%]"
              loading="lazy"
            />
            <img
              src={airpods_mob}
              alt="airpods mob"
              loading="lazy"
              className="block lg:hidden"
            />
            <div className="flex flex-col justify-center gap-5 items-center px-3.5 py-6 lg:px-0 lg:py-0 lg:items-baseline">
              <p className="font-inter font-thin text-3xl lg:w-12">
                {t("Apple AirPods")} <strong>{t("Max")}</strong>
              </p>
              <p className="text-[14px] text-[#909090] text-inter text-thin text-center lg:w-[80%]">
                {t("Computational audio. Listen, it's powerful")}
              </p>
            </div>
          </div>
          <div className="bg-[#353535] flex flex-col lg:flex-row lg:w-[50%]  lg:gap-12">
            <img
              src={visionpro}
              alt="visionpro"
              className="hidden lg:block lg:w-[40%]"
              loading="lazy"
            />
            <img
              src={visionpro_mob}
              alt="visionpro mob"
              className="block lg:hidden"
              loading="lazy"
            />
            <div className="flex flex-col justify-center gap-5 items-center px-3.5 py-6 lg:px-0 lg:py-0 lg:items-baseline">
              <p className=" text-white font-inter font-thin text-3xl lg:w-12">
                {t("Apple Vision")} <strong>{t("Pro")}</strong>
              </p>
              <p className="w-[80%] text-inter text-thin text-[14px] text-[#909090]">
                {t("An immersive way to experience entertainment")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#EDEDED] flex flex-col-reverse justify-center items-center lg:w-[50%] lg:flex-row">
        <div className="flex flex-col items-center px-3.5 py-6 gap-2.5 lg:pl-14.5 lg:px-0 lg:py-0">
          <p className="font-inter font-thin text-3xl lg:w-12">
            {t("Macbook")} <strong>{t("Air")}</strong>
          </p>
          <p className="text-inter text-thin text-[14px] text-[#909090] lg:w-[80%]">
            {t(
              "The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display."
            )}
          </p>
          <button
            className="p-1 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-[40%] h-[40px]"
            onClick={() => navigate({ pathname: "/products" })}
          >
            {t("Shop Now")}
          </button>
        </div>
        <img
          src={macbook}
          alt="macbook"
          className="hidden lg:block lg:w-[40%]"
          loading="lazy"
        />
        <img
          src={macbook_mob}
          alt="macbook mob"
          loading="lazy"
          className="block lg:hidden"
        />
      </div>
    </section>
  );
};

export default SecondBanner;
