"use client";
import React from "react";
import { styled, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import OutlinedInput from "@mui/material/OutlinedInput";

interface CommonInputProps {
  label?: string;
  error?: boolean;
  value: string | number | "";
  placeholder: string;
  type?:string;
  helperText?: string;
  disabled?: boolean;
  // onChange: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled(OutlinedInput)(({}) => ({
  backgroundColor: "#3E413D",
  borderRadius: 20,
  height: 40,
  color: "#ffffff",
  borderColor: "#3E413D",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ffffff ",
  },
  "&::placeholder": {
    color: "#3E413D",
  },
  fontSize: 14,
}));

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  helperText,
  type,
  disabled,
  ...rest
}) => {
  return (
    <Stack spacing={1.5}>
      {label && (
        <Typography
          variant="body1"
          fontWeight={"500"}
          color={error ? "error.main" : "#ffffff"}
        >
          {label}
        </Typography>
      )}
      <StyledInput
        type={type}
        value={value || ""}
        disabled={disabled}
        onChange={onChange}
        {...rest}
        error={error}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "error.main" : "inherit",
          },
        }}
      />
      {error && (
        <Typography variant="body1" color="error.main">
          {helperText}
        </Typography>
      )}
    </Stack>
  );
};

export default CommonInput;
