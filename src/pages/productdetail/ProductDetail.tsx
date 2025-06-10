import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../services/product.service";
import type { Product } from "../../types/types";
import type { ProgressProps } from "antd";
import MainLayout from "../../layouts/MainLayout";
import { Divider, Popover, Progress, Rate, Select, Tag, message } from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiRefund2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { addCartClick } from "../../services/cart.service";
import DirhamIcon from "../../components/DirhamIcon/DirhamIcon";
import { useTranslation } from "react-i18next";

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [selectedQty, setSelectedQty] = useState<number>(
    product?.minimumOrderQuantity || 1
  );
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (productId) {
      setLoadingProgress(10); // Start progress

      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 200);

      getProductById(Number(productId))
        .then((data) => {
          setProduct(data);
          setSelectedQty(data?.minimumOrderQuantity || 1);
        })
        .catch(console.error)
        .finally(() => {
          clearInterval(interval);
          setLoadingProgress(100);
          setTimeout(() => setLoadingProgress(0), 500);
        });
    }

    return () => clearInterval(interval);
  }, [productId]);

  const onChangeQty = (value: number) => {
    if (product?.minimumOrderQuantity) {
      if (value < product.minimumOrderQuantity) {
        setSelectedQty(product.minimumOrderQuantity);
        error();
        return;
      } else {
        setSelectedQty(value);
      }
    } else {
      setSelectedQty(value);
    }
  };

  const getPreviousPrice = (currentPrice: number, discountPercent: number) => {
    const wasPrice = currentPrice / (1 - discountPercent / 100);
    return wasPrice.toFixed(2);
  };

  const addCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    e.preventDefault();
    await addCartClick(dispatch, user, product, selectedQty, cart);
    success();
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Item added to cart",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: `Minimum order should be ${product?.minimumOrderQuantity}`,
    });
  };

  return (
    <MainLayout>
      {loadingProgress > 0 && loadingProgress < 100 && (
        <div className="fixed top-12 left-0 w-full z-1">
          <Progress
            percent={loadingProgress}
            showInfo={false}
            strokeColor={twoColors}
            status="active"
            size="small"
          />
        </div>
      )}
      {contextHolder}

      {product && (
        <div className="px-10 py-10 gap-10 flex flex-col lg:flex-row ">
          <div className="product-details w-full lg:w-[50%]">
            <ImageGallery
              items={product.images.map((im) => ({
                original: im,
                originalAlt: im,
                thumbnail: im,
                loading: "lazy",
              }))}
              showBullets={false}
              showPlayButton={false}
              showNav={false}
              autoPlay={false}
              showFullscreenButton={false}
              thumbnailPosition="left"
            />
          </div>
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-col gap-5 ">
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex gap-4">
                <span>{product?.rating}</span>
                <Rate
                  disabled
                  allowHalf={true}
                  defaultValue={product?.rating}
                />
                <a href="#reviews" className="hover:!underline">{`${
                  product?.reviews?.length
                } ${t("ratings")}`}</a>
              </div>
              <Divider className="mb-3" />

              {/* Feature section */}
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-amber-100 rounded-[50%] p-3">
                    <GiTakeMyMoney />
                  </div>
                  <span className="font-inter font-light text-[10px]">
                    {t("Cash on Delivery")}
                  </span>
                </div>

                {product?.returnPolicy && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="bg-amber-100 rounded-[50%] p-3">
                      <RiRefund2Line />
                    </div>
                    <span className="font-inter font-light text-[10px]">
                      {product?.returnPolicy}
                    </span>
                  </div>
                )}

                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-amber-100 rounded-[50%] p-3">
                    <TbTruckDelivery />
                  </div>
                  <span className="font-inter font-light text-[10px]">
                    {t("Free Delivery")}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="bg-amber-100 rounded-[50%] p-3">
                    <GrSecure />
                  </div>
                  <span className="font-inter font-light text-[10px]">
                    {t("Secure transaction")}
                  </span>
                </div>
              </div>

              {/* Product information */}
              <div className="flex flex-col gap-3">
                <p className="text-[18px] text-inter">{t("Product details")}</p>

                {product?.brand && (
                  <p className="text-[14px] text-inter flex gap-3">
                    <span>{t("Brand")}:</span>
                    <strong>{product.brand}</strong>
                  </p>
                )}
                <p className="text-[14px] text-inter flex gap-3">
                  <span>{t("Category")}:</span>
                  <strong>
                    <a href={`/products?category=${product.category}`}>
                      {product.category}
                    </a>
                  </strong>
                </p>
                <p className="text-[14px] text-inter flex gap-3">
                  <span>{t("Weight")}:</span>
                  <strong>{product.weight}</strong>
                </p>
                <p className="text-[14px] text-inter flex gap-3">
                  <span>{t("Width")}:</span>
                  <strong>{product.dimensions?.width}</strong>
                </p>

                <p className="text-[14px] text-inter flex gap-3">
                  <span>{t("Height")}:</span>
                  <strong>{product.dimensions?.height}</strong>
                </p>

                <p className="text-[14px] text-inter flex gap-3">
                  <span>{t("Depth")}:</span>
                  <strong>{product.dimensions?.depth}</strong>
                </p>

                <p className="text-[14px] text-inter flex gap-3">
                  {product?.tags?.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex flex-col border-[1px] border-[#EDEDED] min-w-[40%] py-6 px-6 gap-2">
              <div className="flex items-center gap-2">
                <p className="text-red-500">
                  {` ${product?.discountPercentage}%`}
                </p>

                <div className="font-inter font-light text-[14px] flex items-center gap-[3px]">
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  <span className="text-xl font-semibold text-primary-dark">
                    {product.price}
                  </span>
                </div>
              </div>

              <div>
                {t("Was")}:
                <del>
                  <DirhamIcon
                    style={{
                      fontSize: "12px",
                      marginRight: "2px",
                    }}
                  />
                  {getPreviousPrice(product.price, product?.discountPercentage)}
                </del>
              </div>

              {product?.returnPolicy && (
                <Popover
                  placement="bottomLeft"
                  className="text-left"
                  content={<p className="!w-60 ">{product?.returnPolicy}</p>}
                  title={product?.returnPolicy}
                  trigger="click"
                >
                  <a>{product?.returnPolicy}</a>
                </Popover>
              )}

              {product?.shippingInformation && (
                <p>{product?.shippingInformation}</p>
              )}

              {product?.minimumOrderQuantity && (
                <p>
                  {t("Minimum order quantity")} :{" "}
                  {product?.minimumOrderQuantity}
                </p>
              )}

              <p className="font-inter font-bold text-[20px] text-green-900">
                {product?.availabilityStatus}
              </p>

              <Select
                placeholder={t("Quantity")}
                options={Array.from({ length: 100 }).map((_, index) => ({
                  value: index + 1,
                  label: index + 1,
                }))}
                onChange={onChangeQty}
                value={selectedQty}
              />

              <button
                className="rounded-[20px] text-[14px] text-black w-full h-[40px] cursor-pointer bg-orange-400"
                onClick={(e) => addCart(e, product)}
              >
                {t("Add to Cart")}
              </button>

              <button className="rounded-[20px] text-[14px] text-black w-full h-[40px] cursor-pointer bg-yellow-300">
                {t("Add to Wishlist")}
              </button>
            </div>
          </div>
        </div>
      )}
      <Divider className="lg:mb-3" />
      <div
        className="w-full lg:h-[1000px] flex flex-col px-10 py-10  lg:px-20 lg:py-20 gap-20 lg:flex-row"
        id="reviews"
      >
        <div className="flex flex-col gap-3 lg:w-[35%]">
          <h3 className="font-bold text-2xl">{t("Customer Reviews")}</h3>
          <div className="flex gap-2">
            <Rate disabled allowHalf={true} defaultValue={product?.rating} />
            <span>
              {product?.rating} {t("out of 5")}
            </span>
          </div>
          <p>
            {product?.reviews?.length} {t("global rating")}
          </p>

          <Divider className="mb-3" />

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-2xl">{t("Review this product")} </h3>
            <p>{t("Share your thoughts with other customers")}</p>
            <button className="border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black w-full h-[40px] cursor-pointer">
              {t("Write a customer review")}
            </button>
          </div>
        </div>

        <div className="lg:w-[65%]  flex flex-col gap-10">
          <p className="font-bold text-[20px]">{t("Top Reviews")}</p>

          {product?.reviews?.map((item, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <div className="flex items-center gap-3">
                <div className="bg-[#e8e8eb] rounded-[50%] p-3">
                  <UserOutlined />
                </div>
                <span>{item?.reviewerName}</span>
              </div>
              <Rate disabled defaultValue={item?.rating} />
              <p>
                {t("Reviewed in the United Arab Emirates on")}{" "}
                {new Date(item?.date).toLocaleString()}
              </p>
              <p>{item?.comment}</p>
              <div className="flex gap-2 items-center">
                <button className="px-6 py-2 border-[1px] border-solid border-black rounded-[10px] text-[14px] text-black  w-[150px] h-[40px] cursor-pointer">
                  {t("Helpful")}
                </button>
                <Divider type="vertical" />

                <button className="text-[14px] text-black h-[40px] cursor-pointer">
                  {t("Report")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
