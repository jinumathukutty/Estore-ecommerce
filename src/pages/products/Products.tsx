import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import axios from "axios";
import type { Categories, Product } from "../../types/types";
import {
  Button,
  Checkbox,
  Collapse,
  InputNumber,
  Progress,
  Radio,
  Select,
  type ProgressProps,
  type RadioChangeEvent,
  type GetProp,
  type InputNumberProps,
  message,
  Empty,
  Typography,
} from "antd";
import { BsSliders } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";
import {
  getProductBySearch,
  getProducts,
} from "../../services/product.service";
import { useTranslation } from "react-i18next";

const ProductCard = lazy(
  () => import("../../components/ProductCard/ProductCard")
);

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#108ee9",
  "100%": "#87d068",
};

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [messageApi, contextHolder] = message.useMessage();

  const categories = useSelector((state: RootState) => state?.categories);

  const params = new URLSearchParams(location.search);
  const categoryUrl = params.get("category");
  const priceUrl = params.get("price");
  const brandUrl = params.get("brands");
  const query = params.get("q");

  const [productArr, setProductArr] = useState<Product[]>([]);
  const [brandArr, setBrandArr] = useState<string[]>([]);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [priceVal, setPriceVal] = useState({ min: 0, max: 0 });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [categoryVal, setCategoryVal] = useState<string | null>(null);
  const [brandVal, setBrandVal] = useState<string[]>([]);
  const [minFilterVal, setMinFilterVal] = useState<number>(0);
  const [maxFilterVal, setMaxFilterVal] = useState<number>(0);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      let interval: NodeJS.Timeout;

      const fetchAndFilterProducts = async () => {
        setLoadingProgress(10);
        interval = setInterval(() => {
          setLoadingProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        try {
          // Step 1: Determine which API to call
          let products: Product[] = [];
          if (categoryUrl) {
            const category = categories.find(
              (item) => item?.slug === categoryUrl
            );
            if (!category?.url) return;
            const res = await axios.get(category.url);
            products = res.data.products || [];
          } else if (query) {
            const res = await getProductBySearch(dispatch, query);
            products = res as Product[] | [];
          } else {
            const res = await getProducts(dispatch);
            products = res as Product[] | [];
          }

          // Step 2: Parse filters from URL
          const brandFilters = brandUrl ? brandUrl.split(",") : [];
          const [minPriceStr, maxPriceStr] = priceUrl?.split("-") || [];
          const minPrice = Number(minPriceStr);
          const maxPrice = Number(maxPriceStr);

          // Step 3: Apply filters
          const filtered = products.filter((product) => {
            const matchesBrand =
              !brandFilters.length || brandFilters.includes(product.brand);

            const matchesPrice =
              (!minPrice || product.price >= minPrice) &&
              (!maxPrice || product.price <= maxPrice);

            return matchesBrand && matchesPrice;
          });

          // Step 4: Set data
          setProductArr(filtered);

          // Step 5: Extract brands
          const brands = [
            ...new Set(
              products
                .map((product) => product.brand)
                .filter(
                  (brand): brand is string =>
                    typeof brand === "string" && brand.trim() !== ""
                )
            ),
          ];
          setBrandArr(brands);

          // Step 6: Calculate and set price range
          const prices = products
            .map((p) => p.price)
            .filter((price) => typeof price === "number" && !isNaN(price));

          if (prices.length) {
            const [min, max] = [Math.min(...prices), Math.max(...prices)];
            setPriceVal({ min, max });
          } else {
            setPriceVal({ min: 0, max: 0 });
          }

          // Also sync brandVal with URL
          setBrandVal(brandFilters);
        } catch (err) {
          console.error("Failed to fetch/filter products:", err);
        } finally {
          clearInterval(interval);
          setLoadingProgress(100);
          setTimeout(() => setLoadingProgress(0), 500);
        }
      };

      fetchAndFilterProducts();
    }, 400); // <- debounce delay in ms

    return () => clearTimeout(debounceTimeout); // cleanup on unmount or param change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryUrl, categories, priceUrl, brandUrl, query]);

  const Brands = ({ brands }: { brands: string[] }) => {
    if (!brands.length) return null;

    return (
      <Checkbox.Group
        options={brands.map((item) => ({
          value: item,
          label: item,
        }))}
        onChange={onChange}
        value={brandVal}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      />
    );
  };

  const CategoriesArr = ({ categories }: { categories: Categories[] }) => {
    if (!categories.length) return null;

    return (
      <Radio.Group
        value={categoryVal}
        onChange={onChangeCategory}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        options={categories.map((item) => ({
          value: item?.slug,
          label: item?.name,
        }))}
      />
    );
  };

  const onChangeCategory = (e: RadioChangeEvent) => {
    setCategoryVal(e.target.value);
  };

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    setBrandVal(checkedValues as string[]);
  };

  const onChangeMin: InputNumberProps["onChange"] = (value) => {
    setMinFilterVal(value as number);
  };

  const onChangeMax: InputNumberProps["onChange"] = (value) => {
    setMaxFilterVal(value as number);
  };

  const applyFilter = () => {
    if (maxFilterVal < minFilterVal) {
      error(t("Invalid price range"));
      return;
    }

    const searchParams = new URLSearchParams();

    if (query) searchParams.set("q", query);
    if (categoryVal) searchParams.set("category", categoryVal);
    if (brandVal.length > 0) searchParams.set("brands", brandVal.join(","));
    if (minFilterVal || maxFilterVal)
      searchParams.set("price", `${minFilterVal}-${maxFilterVal}`);

    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: t(msg),
    });
  };

  const resetFilter = () => {
    navigate("/products");
  };

  const onChangeSort = (e: string) => {
    console.log(e);
    const sortedProduct = [...productArr];
    if (e === "pricelowtohigh") {
      sortedProduct.sort((a, b) => a.price - b.price);
    } else if (e === "pricehightolow") {
      sortedProduct.sort((a, b) => b.price - a.price);
    } else if (e === "ratinglowtohigh") {
      sortedProduct.sort((a, b) => a.rating - b.rating);
    } else if (e === "ratinghightolow") {
      sortedProduct.sort((a, b) => b.rating - a.rating);
    }

    setProductArr(sortedProduct);
  };

  return (
    <MainLayout>
      {loadingProgress > 0 && loadingProgress < 100 && (
        <div className="fixed top-12 left-0 w-full z-10">
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
      <section className="flex gap-8 pt-10 pb-10 px-3 lg:px-[150px]">
        <section className="w-full flex flex-col lg:flex-row gap-10">
          {/* -------- Sidebar Filters for Large Screens -------- */}
          <div className="hidden lg:flex w-1/4 flex-col gap-5">
            {categories?.length > 0 && (
              <Collapse
                size="small"
                items={[
                  {
                    key: "categories",
                    label: t("Categories"),
                    children: <CategoriesArr categories={categories} />,
                  },
                ]}
              />
            )}

            <Collapse
              size="small"
              items={[
                {
                  key: "price",
                  label: t("Price"),
                  children: (
                    <div className="flex justify-between">
                      <InputNumber
                        placeholder={`${t("Min")} ${priceVal?.min}`}
                        onChange={onChangeMin}
                        value={minFilterVal}
                      />
                      <InputNumber
                        placeholder={`${t("Max")} ${priceVal?.max}`}
                        onChange={onChangeMax}
                        value={maxFilterVal}
                      />
                    </div>
                  ),
                },
              ]}
            />

            {brandArr?.length > 0 && (
              <Collapse
                size="small"
                items={[
                  {
                    key: "brand",
                    label: t("Brand"),
                    children: <Brands brands={brandArr} />,
                  },
                ]}
              />
            )}

            <Button
              className="!bg-primary-dark !text-white !rounded-xl"
              onClick={applyFilter}
            >
              <BsSliders /> {t("Filter")}
            </Button>
            <Button
              className="!bg-primary-white !text-black !rounded-xl"
              block
              onClick={resetFilter}
            >
              <GrPowerReset /> {t("Reset")}
            </Button>
          </div>

          {/* -------- Mobile: Show Filter Panel OR Product List -------- */}
          <div className="flex flex-col gap-5 w-full">
            <div className="block lg:hidden">
              {openFilterDrawer ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {t("Filter Products")}
                    </h2>
                    <Button
                      size="small"
                      className="!bg-primary-dark !text-white"
                      onClick={() => setOpenFilterDrawer(false)}
                    >
                      {t("Close")}
                    </Button>
                  </div>

                  <div className="flex flex-col gap-5">
                    {categories?.length > 0 && (
                      <Collapse
                        size="small"
                        items={[
                          {
                            key: "categories",
                            label: t("Categories"),
                            children: <CategoriesArr categories={categories} />,
                          },
                        ]}
                      />
                    )}

                    <Collapse
                      size="small"
                      items={[
                        {
                          key: "price",
                          label: t("Price"),
                          children: (
                            <div className="flex justify-between">
                              <InputNumber
                                placeholder={`${t("Min")} ${priceVal?.min}`}
                              />
                              <InputNumber
                                placeholder={`${t("Max")} ${priceVal?.max}`}
                              />
                            </div>
                          ),
                        },
                      ]}
                    />

                    {brandArr?.length > 0 && (
                      <Collapse
                        size="small"
                        items={[
                          {
                            key: "brand",
                            label: t("Brand"),
                            children: <Brands brands={brandArr} />,
                          },
                        ]}
                      />
                    )}

                    <Button
                      block
                      className="!bg-primary-dark !text-white"
                      onClick={() => {
                        setOpenFilterDrawer(false);
                        applyFilter();
                      }}
                    >
                      {t("Apply Filters")}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex gap-5">
                  <Button
                    onClick={() => setOpenFilterDrawer(true)}
                    className="!bg-primary-dark !text-white !rounded-xl"
                    block
                  >
                    <BsSliders /> {t("Filter")}
                  </Button>

                  <Button
                    onClick={resetFilter}
                    className="!bg-primary-white !text-black !rounded-xl"
                    block
                  >
                    <GrPowerReset /> {t("Reset")}
                  </Button>
                </div>
              )}
            </div>

            {/* ---- Product List (only when filter drawer is closed on mobile) ---- */}
            {!openFilterDrawer && (
              <>
                <div className="flex justify-between gap-3 w-full">
                  <div>
                    <span>{t("Selected Products")} :</span>{" "}
                    <strong>{productArr?.length}</strong>
                  </div>
                  <Select
                    size="small"
                    options={[
                      {
                        value: "pricelowtohigh",
                        label: t("Price:Low to High"),
                      },
                      {
                        value: "pricehightolow",
                        label: t("Price:High to Low"),
                      },
                      {
                        value: "ratinglowtohigh",
                        label: t("Rating:Low to High"),
                      },
                      {
                        value: "ratinghightolow",
                        label: t("Rating:High to Low"),
                      },
                    ]}
                    style={{ width: 200 }}
                    placeholder={t("Sort By")}
                    onChange={onChangeSort}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-3">
                  <Suspense fallback={<p>{t("Loading products")}...</p>}>
                    {productArr.map((product: Product) => (
                      <ProductCard key={product?.id} product={{ ...product }} />
                    ))}
                  </Suspense>
                </div>
                {productArr?.length === 0 && (
                  <Empty
                    description={
                      <Typography.Text>
                        {t("No Products found")}!
                      </Typography.Text>
                    }
                  />
                )}
              </>
            )}
          </div>
        </section>
      </section>
    </MainLayout>
  );
};

export default Products;
