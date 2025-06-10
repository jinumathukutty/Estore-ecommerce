import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { useSelector } from "react-redux";
import { type RootState } from "../../../store/store";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state?.user);
  const callback = new URLSearchParams(location.search).get("callback");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  useEffect(() => {
    if (user) {
      navigate(callback || "/");
    }
  });

  const handleSubmit = async () => {
    alert("User Registered");
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start px-4 sm:px-8 md:px-16 lg:px-40"
        style={{
          backgroundImage: `url('/images/login-bg-min.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-md mt-10 lg:mt-32">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("Welcome Back")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("Sign up for the new account")}
            </p>
          </div>
          <form className="space-y-5 mt-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                {t("First Name")}
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Last Name")}
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Email")}
              </label>
              <input
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Username")}
              </label>
              <input
                id="username"
                name="username"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("Password")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white !bg-primary-dark cursor-pointer"
            >
              {t("Sign up")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t("Already have an account")}?{" "}
            <a
              href="/auth/login"
              className="font-medium text-primary hover:underline"
            >
              {t("Sign In")}
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
