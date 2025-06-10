import { useTranslation } from "react-i18next";
import MainLayout from "../../layouts/MainLayout";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center">
          {t("About Us")}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="/images/aboutus.png" // Replace with your actual image path
              alt="About us"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          {/* Right Text Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <p className="text-lg leading-relaxed">
              {t("Welcome to")} <strong>E-store</strong>{" "}
              {t(
                "your trusted destination for quality products and seamless shopping. Our mission is to deliver an exceptional online shopping experience with curated collections and unbeatable value"
              )}
            </p>

            <h2 className="text-2xl font-semibold">{t("What We Offer")}</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>{t("Wide range of high-quality products")}</li>
              <li>{t("Secure payment and fast delivery")}</li>
              <li>{t("Responsive customer support")}</li>
              <li>{t("Easy returns and hassle-free shopping")}</li>
            </ul>

            <h2 className="text-2xl font-semibold">{t("Contact Us")}</h2>
            <p>
              {t("Reach out to us anytime at")}{" "}
              <a
                href="mailto:support@yourshop.com"
                className="text-blue-600 underline"
              >
                support@yourshop.com
              </a>
              . {t("We're here to help")}!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
