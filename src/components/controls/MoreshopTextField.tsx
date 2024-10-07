import { FC } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { H6 } from "../Typography";

// ==============================================================
type Props = TextFieldProps & BoxProps;
// ==============================================================

const MoreShopTextField: FC<Props> = ({
  label,
  InputProps,
  ...props
}: Props & Record<string, any>) => {
  const boxProps: Partial<BoxProps> = {};
  const textFieldProps: Partial<TextFieldProps> = {};

  for (const key in props) {
    if (SPACE_PROPS_LIST.includes(key)) (boxProps as any)[key] = props[key];
    else (textFieldProps as any)[key] = props[key];
  }

  return (
    <Box {...boxProps}>
      {/* INPUT LEVEL TEXT */}
      {label ? (
        <H6 mb={1} fontSize={13} color="grey.700">
          {label}
        </H6>
      ) : null}

      {/* INPUT FIELD SECTION */}
      <TextField
        InputProps={{
          ...InputProps,
          style: { ...InputProps?.style, height: 44 },
        }}
        {...textFieldProps}
      />
    </Box>
  );
};

const SPACE_PROPS_LIST = [
  "m",
  "mt",
  "mr",
  "mb",
  "ml",
  "mx",
  "my",
  "p",
  "pt",
  "pr",
  "pb",
  "pl",
  "px",
  "py",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "marginX",
  "marginY",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "paddingX",
  "paddingY",
];

export default MoreShopTextField;
