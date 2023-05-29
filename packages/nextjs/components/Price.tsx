import { useState } from "react";
import { useGlobalState } from "~~/services/store/store";

type TPriceProps = {
  value: number;
};

export const Price: React.FC<TPriceProps> = ({ value }: TPriceProps) => {
  const [dollarMode, setDollarMode] = useState(true);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  let displayBalance = value.toFixed(4);

  if (dollarMode) {
    displayBalance = "$" + (value * price).toFixed(2);
  }

  return (
    <span
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {displayBalance}
    </span>
  );
};
