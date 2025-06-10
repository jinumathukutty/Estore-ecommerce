import { useContext, useEffect, useState, type ReactNode } from "react";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  TwitterOutlined,
  FacebookOutlined,
  TikTokOutlined,
  InstagramOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import logo_white from "../assets/images/logo_white.svg";

import type { MenuProps } from "antd";
import {
  Layout,
  Menu,
  Input,
  Avatar,
  Popover,
  Badge,
  FloatButton,
  Drawer,
  Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actions, type RootState } from "../store/store";
import { AppContext } from "../context/AppContext";

const { Header, Content, Footer } = Layout;

const getPathFromKey = (key: string) => {
  switch (key.toLowerCase()) {
    case "home":
      return "/";
    case "about":
      return "/aboutus";
    case "contact us":
      return "/contactus";
    case "blog":
      return "/blog";
    default:
      return "/";
  }
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartQtyCount, searchQuery, setSearchQuery } = useContext(AppContext)!;
  const user = useSelector((state: RootState) => state.user);
  const language = useSelector((state: RootState) => state.language);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (searchQuery) {
      searchParams.set("q", searchQuery);
      navigate({ pathname: "/products", search: searchParams.toString() });
    }
    return () => setSearchQuery(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const onClickLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(actions.setUser(null));
  };

  const onChangeLanguage = (checked: boolean) => {
    const newLanguage = checked ? "EN" : "AR";
    dispatch(actions.setLanguage(newLanguage));
  };

  const additionalItems: MenuProps["items"] = [
    {
      key: "wishlist",
      label: <NavLink to="/wishlist">Wishlist</NavLink>,
    },
    {
      key: "cart",
      label: (
        <NavLink to="/shoppingcart">
          {cartQtyCount > 0 ? (
            <Badge
              size="small"
              count={cartQtyCount}
              color="geekblue"
              text="Cart"
              className="[.ant-badge.ant-badge-not-a-wrapper:not(.ant-badge-status)]:!flex flex-row-reverse  gap-2.5 mt-5"
            />
          ) : (
            <>Cart</>
          )}
        </NavLink>
      ),
      style: { display: "flex", alignItems: "center" },
    },
    {
      key: "user",
      label: !user ? (
        <NavLink to="/auth/login">Login</NavLink>
      ) : (
        <Popover
          content={
            <ul>
              <li className="cursor-pointer" onClick={onClickLogout}>
                Logout
              </li>
            </ul>
          }
          trigger="click"
        >
          <Avatar src={user?.image} style={{ fontSize: 21 }} />
        </Popover>
      ),
    },
    {
      key: "language",
      label: (
        <Switch
          checkedChildren={language}
          unCheckedChildren="AR"
          onChange={onChangeLanguage}
        />
      ),
    },
  ];

  const items1: MenuProps["items"] = ["Home", "About Us", "Contact Us"].map(
    (key) => ({
      key,
      label: <NavLink to={getPathFromKey(key)}>{key}</NavLink>,
    })
  );

  const allItems: MenuProps["items"] = [...items1, ...additionalItems];
  const newItem: MenuProps["items"] = [
    {
      key: "home",
      label: <NavLink to="/">{t("Home")}</NavLink>,
    },
    {
      key: "aboutus",
      label: <NavLink to="/aboutus">{t("About Us")}</NavLink>,
    },
    {
      key: "contactus",
      label: <NavLink to="/contactus">{t("Contact Us")}</NavLink>,
    },

    {
      key: "heart",
      label: <HeartOutlined style={{ fontSize: 16 }} />,
    },
    {
      key: "cart",
      label: (
        <NavLink to="/shoppingcart">
          <Badge size="small" count={cartQtyCount} color="geekblue">
            <ShoppingCartOutlined style={{ fontSize: 16 }} />
          </Badge>
        </NavLink>
      ),
    },
    {
      key: "user",
      label: !user ? (
        <NavLink to="/auth/login">
          {<UserOutlined style={{ fontSize: 16 }} />}
        </NavLink>
      ) : (
        <Popover
          content={
            <ul>
              <li className="cursor-pointer" onClick={onClickLogout}>
                <LogoutOutlined /> Logout
              </li>
            </ul>
          }
          trigger="click"
        >
          <Avatar src={user?.image} style={{ fontSize: 16 }} />
        </Popover>
      ),
    },
    {
      key: "language",
      label: (
        <Switch
          checkedChildren={language}
          unCheckedChildren="AR"
          onChange={onChangeLanguage}
        />
      ),
    },
  ];

  const WhatsappIcon = () => {
    return (
      <div
        style={{
          width: 24,
          height: 24,
          backgroundImage: `url('/images/whatsapp2.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  };

  return (
    <Layout
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Header className="!w-full flex items-center justify-between z-2 !bg-white !sticky lg:static !top-0 ">
        <img
          src={logo}
          alt="logo"
          loading="lazy"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        <div className="hidden lg:block">
          <Input.Search
            placeholder={t("Search")}
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            className="inputSearch"
            onSearch={(e) => setSearchQuery(e)}
          />
        </div>

        <div className="hidden lg:flex ">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={newItem}
            className="header-menu"
          />
        </div>

        <div className="lg:hidden">
          <MenuOutlined
            className="text-xl cursor-pointer "
            onClick={() => setDrawerOpen(true)}
          />
        </div>

        <Drawer
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
        >
          <Menu
            mode="vertical"
            items={allItems}
            style={{ borderInlineEnd: "none" }}
          />
        </Drawer>
      </Header>
      <Layout>
        <Content style={{ backgroundColor: "white", flex: 1 }}>
          {children}
          <FloatButton
            icon={<WhatsappIcon />}
            onClick={() => {
              window.open("https://wa.me/+971553047569?text=Hi!", "_blank");
            }}
          />
        </Content>
      </Layout>
      <Footer className="flex flex-col items-center lg:items-stretch  !justify-between !bg-primary-black !lg:min-h-[300px] !lg:py-[30px] !lg:px-[160px] !text-primary-white lg:flex-row">
        {/* Row 1 */}
        <div className="flex flex-col items-center lg:items-start lg:justify-between lg:max-w-[40%]">
          <img
            src={logo_white}
            alt="logo_white"
            className="mb-2 lg:w-[100px] lg:mb-0"
            loading="lazy"
          />
          <p className="text-[12px] font-inter font-light text-primary-text mb-2 lg:mb-0">
            {t(
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            )}
          </p>
          <div className="hidden lg:flex lg:gap-3">
            <TwitterOutlined className="cursor-pointer" />
            <FacebookOutlined className="cursor-pointer" />
            <TikTokOutlined className="cursor-pointer" />
            <InstagramOutlined className="cursor-pointer" />
          </div>
        </div>

        {/* Row 2 */}
        <ul className="flex flex-col items-center gap-[10px] lg:gap-[20px] lg:items-start  mb-8 lg:mb-0">
          <li className="font-bold">{t("Services")}</li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Bonus program")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">{t("Gift cards")}</li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Credit and payment")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Service contracts")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Non-cash account")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">{t("Payment")}</li>
        </ul>

        {/* Row 3 */}
        <ul className="flex flex-col items-center gap-[10px] lg:gap-[20px] lg:items-start  mb-8 lg:mb-0">
          <li className="font-bold">{t("Assistance to the buyer")}</li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Find an order")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Terms of delivery")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Exchange and return of goods")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">{t("Guarantee")}</li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Frequently asked questions")}
          </li>
          <li className="text-[#9a9999] cursor-pointer">
            {t("Terms of use of the site")}
          </li>
        </ul>

        <div className="flex gap-3 lg:hidden">
          <TwitterOutlined className="cursor-pointer" />
          <FacebookOutlined className="cursor-pointer" />
          <TikTokOutlined className="cursor-pointer" />
          <InstagramOutlined className="cursor-pointer" />
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
