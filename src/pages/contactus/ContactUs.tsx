import { useTranslation } from "react-i18next";
import MainLayout from "../../layouts/MainLayout";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-10 text-center">
          {t("Contact Us")}
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Contact Form */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold mb-2">
              {t("Send us a message")}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">{t("Name")}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder={t("Your Name")}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("Email")}</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">{t("Message")}</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={5}
                  placeholder={t("Your message")}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {t("Send Message")}
              </button>
            </form>
          </div>

          {/* Right: Contact Info & Location */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold mb-2">{t("Our Location")}</h2>
            <div className="space-y-2">
              <p>
                <strong>📍 {t("Address")}:</strong> 123 E-commerce Street,
                Berlin, Germany
              </p>
              <p>
                <strong>📧 {t("Email")}:</strong>{" "}
                <a
                  href="mailto:support@yourshop.com"
                  className="text-blue-600 underline"
                >
                  support@yourshop.com
                </a>
              </p>
              <p>
                <strong>📞 {t("Phone")}:</strong> +1 (123) 456-7890
              </p>
            </div>

            {/* Map Placeholder or Embed */}
            <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300">
              {/* Replace this iframe src with your actual map embed link */}
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.556660411473!2d13.404954315799703!3d52.52000617981221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c08f3b4b77%3A0x421a2705475cb6c0!2sBerlin!5e0!3m2!1sen!2sde!4v1616161616161!5m2!1sen!2sde"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactUs;
