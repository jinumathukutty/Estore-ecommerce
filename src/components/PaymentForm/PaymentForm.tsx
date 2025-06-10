import { useState } from "react";
import CardPreview from "../CardPreview/CardPreview";
import { Checkbox, Input } from "antd";
import type { CheckboxProps } from "antd";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSameBilling, setIsSameBilling] = useState(false);

  const onChangeBilling: CheckboxProps["onChange"] = () => {
    setIsSameBilling((isSameBilling) => !isSameBilling);
  };

  return (
    <div className="flex flex-col gap-8">
      <CardPreview
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiry={expiry}
      />

      <form className="flex flex-col gap-3">
        <Input
          maxLength={19}
          value={cardNumber}
          onChange={(e) =>
            setCardNumber(
              e.target.value
                .replace(/\D/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
            )
          }
          placeholder="Card Number"
        />
        <Input
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
          placeholder="Card Holder Name"
        />
        <div className="flex gap-3">
          <Input
            maxLength={5}
            value={expiry}
            onChange={(e) =>
              setExpiry(e.target.value.replace(/^(\d{2})(\d{0,2})$/, "$1/$2"))
            }
            placeholder="Expiry (MM/YY)"
          />
          <Input
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          />
        </div>
        <Checkbox checked={isSameBilling} onChange={onChangeBilling}>
          Same as billing address
        </Checkbox>
      </form>
    </div>
  );
};

export default PaymentForm;
