import React from "react";
import { useTranslation } from "react-i18next";
import { TiShoppingCart } from "react-icons/ti";

interface NoItemsInCartProps {
  message?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const EmptyCart: React.FC<NoItemsInCartProps> = ({
  message = "Your cart is currently empty",
  actionText = "Start Shopping",
  onActionClick,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 sm:py-20">
      <TiShoppingCart size={56} className="text-gray-400 mb-4 sm:mb-6" />
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
        {t("No Items")}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 max-w-sm">
        {t(message)}
      </p>
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="bg-primary-dark text-white text-sm sm:text-base px-5 py-2 rounded-md shadow hover:bg-primary transition"
        >
          {t(actionText)}
        </button>
      )}
    </div>
  );
};

export default EmptyCart;
