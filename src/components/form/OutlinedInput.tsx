import {
  OutlinedInput as MuiOutlinedInput,
  OutlinedInputProps,
} from "@mui/material";

export const OutlinedInput = (props: OutlinedInputProps) => (
  <MuiOutlinedInput
    {...props}
    sx={{
      ...props.sx,
      // Override input background color to whitish
      backgroundColor: "#ffffe6",
    }}
  />
);
