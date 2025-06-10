import { useSelector } from "react-redux";
import {
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import type { RootState } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Button, Divider, Input } from "antd";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import DirhamIcon from "../../components/DirhamIcon/DirhamIcon";

const ShoppingCart = () => {
  const cart = useSelector((state: RootState) => state?.cart);
  const user = useSelector((state: RootState) => state?.user);
  const { updateCartItemQuantity, removeCartItem } = useContext(AppContext)!;

  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

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

  const handleCheckout = () => {
    if (!user || !user.accessToken) {
      navigate(`/auth/login?callback=${encodeURIComponent("/checkout")}`);
    } else {
      navigate("/checkout");
    }
  };

  return (
    <MainLayout>
      <section className="w-full gap-10 flex flex-col px-8 py-8 lg:flex-row lg:px-50 lg:py-10">
        {cart.length > 0 ? (
          <>
            {/* Items */}
            <div className="flex flex-col lg:w-3/4">
              {cart.map((item) => (
                <>
                  <div
                    className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
                    key={item.id}
                  >
                    <a
                      href={`/product/${item.id}`}
                      className="font-inter font-bold w-full lg:w-[40%] !text-primary-charcoal"
                    >
                      {item?.title}
                    </a>
                    <div className="flex justify-between lg:w-full lg:justify-around">
                      <div className="flex gap-3 border-2 rounded-[20px] p-1">
                        {item?.quantity === 1 ? (
                          <DeleteOutlined
                            className="cursor-pointer"
                            onClick={() => removeCartItem(item.id)}
                          /> /* delete item  */
                        ) : (
                          <MinusOutlined
                            className="cursor-pointer"
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                          /> /* decrease quantity  */
                        )}
                        <p className="font-bold">{item?.quantity}</p>
                        <PlusOutlined
                          className="cursor-pointer"
                          onClick={() =>
                            updateCartItemQuantity(item.id, item.quantity + 1)
                          }
                        />{" "}
                        {/* increse quantity  */}
                      </div>
                      <p className="font-bold">
                        <DirhamIcon
                          style={{
                            fontSize: "12px",
                            marginRight: "2px",
                          }}
                        />
                        {item?.total?.toFixed(2)}
                      </p>
                      <CloseOutlined onClick={() => removeCartItem(item.id)} />{" "}
                    </div>
                  </div>
                  <Divider />
                </>
              ))}
            </div>

            {/* Summary */}
            <div className="border-[1px] border-low-opacity rounded-2xl max-h-[70vh] flex flex-col gap-5 p-5 lg:p-10  lg:w-2/4">
              <strong className="text-[20px]">Order Summary</strong>
              <div>
                <p>Dicount Code / Promo Code</p>
                <Input placeholder="Code" />
              </div>

              <div className="flex justify-between">
                <strong>SubTotal</strong>
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
                <p>Estimated Tax</p>
                <p>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {tax}
                </p>
              </div>

              <div className="flex justify-between">
                <p>Estimated Shipping & Handling</p>
                <p>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {shipping}
                </p>
              </div>

              <div className="flex justify-between">
                <strong>Total</strong>
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
              <Button
                className="!bg-primary-dark !text-white"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <EmptyCart onActionClick={() => navigate("/products")} />
        )}
      </section>
    </MainLayout>
  );
};

export default ShoppingCart;
