import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import type { Categories } from "../../types/types";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

function CategoryCard({ item }: { item: Categories }) {
  return (
    <Link to={`/products?category=${item?.slug}`}>
      <div
        className="bg-[#EDEDED] hover:bg-[#dcdcdc] h-[200px] flex flex-col items-center justify-center rounded-xl text-black cursor-pointer lg:min-w-[200px]  lg:transition-colors lg:duration-300   lg:p-4 lg:gap-4 lg:text-center lg:shadow-sm lg:hover:shadow-md "
        key={item?.slug}
      >
        <p>{item?.name}</p>
      </div>
    </Link>
  );
}

const Category = () => {
  const { t } = useTranslation();
  const categories = useSelector((state: RootState) => state.categories);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -220 : 220, // Adjust based on card width + margin
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-[#FAFAFA] px-5 py-[30px] lg:py-[50px] lg:px-[217px] ">
      <div className="flex justify-between text-[24px] mb-5">
        <p>{t("Browse By Category")}</p>
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          <FaChevronLeft
            className="cursor-pointer"
            onClick={() => scroll("left")}
          />
          <FaChevronRight
            className="cursor-pointer"
            onClick={() => scroll("right")}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar  grid grid-cols-2 items-center gap-2 lg:flex lg:gap-4 lg:overflow-x-auto scroll-smooth"
      >
        {categories?.map((item) => (
          <CategoryCard item={item} key={item?.slug} />
        ))}
      </div>
    </section>
  );
};

export default Category;
