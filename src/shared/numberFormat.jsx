import React from "react";
import NumberFormat from "react-number-format";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      thousandSeparator
      decimalSeparator={false}
    />
  );
});

export default NumberFormatCustom;
