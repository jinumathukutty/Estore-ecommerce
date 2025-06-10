type Props = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
};

const CardPreview = ({ cardNumber, cardHolder, expiry }: Props) => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/debitcard_bg.png')`, // Replace with your image path
        backgroundSize: "cover",
      }}
      className="w-full h-[200px] lg:h-[290px] relative rounded-[15px] text-white p-5 font-inter"
    >
      <div className="absolute top-[100px] left-[30px] text-[14px] lg:text-[22px] tracking-[2px]">
        {cardNumber || "**** **** **** ****"}
      </div>
      <div className="absolute bottom-[40px] left-[30px] text-14px lg:text-[16px]">
        {cardHolder || "CARD HOLDER"}
      </div>
      <div className="absolute bottom-[40px] right-[90px] lg:right-[150px] text-14px lg:text-[16px]">
        {expiry || "MM/YY"}
      </div>
    </div>
  );
};

export default CardPreview;
