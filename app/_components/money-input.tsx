import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input } from "./ui/input";

type MoneyInputProps = Omit<
  NumericFormatProps<React.ComponentProps<typeof Input>>,
  "prefix" | "thousandSeparator" | "decimalSeparator" | "allowNegative"
>;

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<MoneyInputProps>,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    );
  },
);

MoneyInput.displayName = "MoneyInput";
