import { useEffect, useState } from "react";
import { Button, message, Steps, theme, Radio, Tag } from "antd";
import { FaMapMarkerAlt, FaShippingFast } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import MainLayout from "../../layouts/MainLayout";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import type { RadioChangeEvent } from "antd";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import DirhamIcon from "../../components/DirhamIcon/DirhamIcon";

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state?.user);
  const userFullInfo = useSelector((state: RootState) => state?.userFullInfo);
  const cart = useSelector((state: RootState) => state?.cart);
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [userAddress, setUserAddress] = useState("Home");
  const [shipmentVal, setShipmentVal] = useState("Free");

  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const redirectTo =
      cart?.length > 0 && user?.accessToken
        ? null
        : cart?.length > 0
        ? `/auth/login?callback=${encodeURIComponent("/checkout")}`
        : `/auth/login`;

    if (redirectTo) navigate(redirectTo);
  }, [cart, user, navigate]);

  useEffect(() => {
    const calculatedSubTotal = cart.reduce((acc, item) => acc + item.total, 0);
    const calculatedTax = +(calculatedSubTotal * 0.05).toFixed(2);
    const calculatedShipping = calculatedSubTotal < 100 ? 10 : 0;
    const calculatedTotal = +(
      calculatedSubTotal +
      calculatedTax +
      calculatedShipping
    ).toFixed(2);

    setSubTotal(+calculatedSubTotal.toFixed(2));
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotal(calculatedTotal);
  }, [cart]);

  const onChangeAddress = (e: RadioChangeEvent) => {
    setUserAddress(e.target.value);
  };

  const onChangeShipment = (e: RadioChangeEvent) => {
    setShipmentVal(e.target.value);
  };

  const UserHomeAddress = () => {
    return (
      <div
        className={`flex flex-col gap-5 p-3 min-w-[20rem] lg:min-w-[50rem] lg:ml-5`}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex gap-5">
          <p>{userFullInfo?.address?.address}</p>
          <Tag color="black">HOME</Tag>
        </div>
        <span>
          {userFullInfo?.address?.city},{userFullInfo?.address?.state}
        </span>
        <span>
          {userFullInfo?.address?.country} - {userFullInfo?.address?.postalCode}
        </span>
      </div>
    );
  };
  // "flex flex-col gap-5 lg:ml-5"

  const UserOfficeAddress = () => {
    return (
      <div
        className={`flex flex-col gap-5 p-3 min-w-[20rem] lg:min-w-[50rem] lg:ml-5`}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex gap-5">
          <p>{userFullInfo?.company?.address?.address}</p>
          <Tag color="black">OFFICE</Tag>
        </div>
        <span>
          {userFullInfo?.company?.address?.city},
          {userFullInfo?.company?.address?.state}
        </span>
        <span>
          {userFullInfo?.company?.address?.country} -{" "}
          {userFullInfo?.company?.address?.postalCode}
        </span>
      </div>
    );
  };

  const RegularShipment = () => {
    return (
      <div
        className={`flex flex-col gap-5 p-3 min-w-[20rem] lg:min-w-[50rem] lg:ml-5`}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex gap-5">
          <p>Free</p>
          <p>Regular Shipment</p>
        </div>
      </div>
    );
  };

  const PaidShipment = () => {
    return (
      <div
        className={`flex flex-col gap-5 p-3 min-w-[20rem] lg:min-w-[50rem] lg:ml-5`}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex gap-5">
          <p>
            <DirhamIcon
              style={{
                fontSize: "12px",
                marginRight: "2px",
              }}
            />
            10
          </p>
          <p>Get your delivery as soon as possible</p>
        </div>
      </div>
    );
  };

  const Shipment = () => {
    return (
      <Radio.Group
        onChange={onChangeShipment}
        value={shipmentVal}
        options={[
          { value: "Free", label: <RegularShipment /> },
          { value: "Paid", label: <PaidShipment /> },
        ]}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      />
    );
  };

  const UserAddress = () => {
    return (
      <Radio.Group
        onChange={onChangeAddress}
        value={userAddress}
        options={[
          { value: "Home", label: <UserHomeAddress /> },
          { value: "Office", label: <UserOfficeAddress /> },
        ]}
        style={{ display: "flex", flexDirection: "column", gap: 5 }}
      />
    );
  };

  const Payment = () => {
    return (
      <section className="w-full flex flex-col lg:flex-row lg:gap-10  ">
        {cart.length > 0 ? (
          <>
            {/* Items */}
            <div className="min-w-2/4  flex flex-col gap-3 border-[1px] border-low-opacity rounded-2xl p-5">
              {cart.map((item) => (
                <div
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#f7f7f7]"
                  key={item.id}
                >
                  <a
                    href={`/product/${item.id}`}
                    className="font-inter font-bold w-[40%] !text-primary-charcoal"
                  >
                    {item?.title}
                  </a>
                  <p className="font-bold">
                    <DirhamIcon
                      style={{
                        fontSize: "12px",
                        marginRight: "2px",
                      }}
                    />
                    {item?.total?.toFixed(2)}
                  </p>
                </div>
              ))}
              <p className="font-inter font-light text-[13px]">Address</p>
              <p className="font-bold">
                {userAddress === "Home" ? (
                  <>
                    {userFullInfo?.address?.city}, &nbsp;
                    {userFullInfo?.address?.state}
                    <br />
                    {userFullInfo?.address?.country} - &nbsp;
                    {userFullInfo?.address?.postalCode}
                  </>
                ) : (
                  <>
                    {userFullInfo?.company?.address?.address} ,&nbsp;
                    {userFullInfo?.company?.address?.city} <br />
                    {userFullInfo?.company?.address?.state}
                    <br />
                    {userFullInfo?.company?.address?.country} -{" "}
                    {userFullInfo?.company?.address?.postalCode}
                  </>
                )}
              </p>

              <p className="font-inter font-light text-[13px]">
                Shipment Method
              </p>
              <p className="font-bold">
                {shipmentVal === "Free" ? (
                  <>Free , Regular Shipment</>
                ) : (
                  <>
                    <DirhamIcon
                      style={{
                        fontSize: "12px",
                        marginRight: "2px",
                      }}
                    />
                    10 , Get your delivery as soon as possible
                  </>
                )}
              </p>

              <div className="flex justify-between">
                <p className="font-inter font-light text-[13px]">SubTotal</p>
                <strong>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {subTotal}
                </strong>
              </div>
              <div className="flex justify-between">
                <p className="font-inter font-light text-[13px]">
                  Estimated Tax
                </p>
                <strong>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {tax}
                </strong>
              </div>

              <div className="flex justify-between">
                <p className="font-inter font-light text-[13px]">
                  Estimated Shipping & Handling
                </p>
                <strong>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {shipping}
                </strong>
              </div>
              <div className="flex justify-between">
                <p className="font-inter font-bold text-[13px]">Total</p>
                <strong>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {total}
                </strong>
              </div>
            </div>
            {/* Summary */}
            <div className="flex flex-col min-w-2/4 mt-10 lg:mt-0">
              <strong className="text-[18px]">Payment</strong>
              <PaymentForm />
            </div>
          </>
        ) : (
          <EmptyCart onActionClick={() => navigate("/products")} />
        )}
      </section>
    );
  };

  const steps = [
    {
      title: "Address",
      icon: <FaMapMarkerAlt />,
      content: <UserAddress />,
    },
    {
      title: "Shipping",
      icon: <FaShippingFast />,
      content: <Shipment />,
    },
    {
      title: "Payment",
      icon: <GiTakeMyMoney />,
      content: <Payment />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <MainLayout>
      <section className="w-full flex flex-col gap-5 px-10 py-10 lg:gap-10 lg:px-50 lg:py-10">
        <Steps current={current} items={items} />
        <div className="lg:p-12">{steps[current].content}</div>
        <div
          style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}
        >
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Pay
            </Button>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Checkout;
