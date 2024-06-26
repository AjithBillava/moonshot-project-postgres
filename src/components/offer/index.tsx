import Image from "next/image";
import React, { useState } from "react";

const OfferCarousel = () => {
  const initialState = [
    "Get 10% off on business sign up",
    "Get 12% off on first purchase",
    "Get 10% off on HDFC credit card",
  ];
  const [offer, setOffer] = useState(initialState[0]);

  const handleBackwardClick = () => {
    const index = initialState.findIndex((item) => item === offer);
    if (index === 0) {
      setOffer(initialState[initialState.length - 1]);
    } else {
      setOffer(initialState[index - 1]);
    }
  };
  const handleForwardClick = () => {
    const index = initialState.findIndex((item) => item === offer);
    if (index === initialState.length - 1) {
      setOffer(initialState[0]);
    } else {
      setOffer(initialState[index + 1]);
    }
  };
  return (
    <div className="relative flex h-[20px] items-center justify-center gap-20 bg-[#F4F4F4] ">
      <Image
        className="object-contain"
        onClick={handleBackwardClick}
        role="button"
        alt="backward-arrow"
        src={"/Backward-arrow.png"}
        width={8}
        height={8}
        style={{ height: "10px" }}
      />
      <span className="flex w-64 justify-center text-sm font-medium">
        {offer}
      </span>
      <Image
        className="object-contain"
        onClick={handleForwardClick}
        role="button"
        alt="forward-arrow"
        src={"/Forward-arrow.png"}
        width={8}
        height={8}
        style={{ height: "10px" }}
      />
    </div>
  );
};

export default OfferCarousel;
