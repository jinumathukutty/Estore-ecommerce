import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import { loginUser } from "../../../services/auth.service";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actions, type RootState } from "../../../store/store";
import { Button, message } from "antd";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((state: RootState) => state?.user);
  const callback = new URLSearchParams(location.search).get("callback");

  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (user) {
      navigate(callback || "/");
    }
  });

  const handleSubmit = async () => {
    const credentials = { username, password };
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      // Store token
      localStorage.setItem("accessToken", response?.accessToken);
      dispatch(actions.setUser(response));

      // Set token in axios defaults
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.accessToken}`;

      // Redirect to callback or home
      navigate(callback || "/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      error(axiosError.response?.data?.message || "Login failed");
      return;
    } finally {
      setLoading(false);
    }
  };

  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  return (
    <MainLayout>
      {contextHolder}
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
              {t("Sign in to your account")}
            </p>
          </div>
          <form className="space-y-5 mt-6">
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="/auth/forgotpassword"
                  className="font-medium text-primary hover:underline"
                >
                  {t("Forgot your password")}?
                </a>
              </div>
            </div>

            <Button
              type="primary"
              loading={loading}
              onClick={handleSubmit}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white !bg-primary-dark cursor-pointer"
            >
              {t("Sign In")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {t("Don't have an account")}?{" "}
            <a
              href="/auth/signup"
              className="font-medium text-primary hover:underline"
            >
              {t("Sign up")}
            </a>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
