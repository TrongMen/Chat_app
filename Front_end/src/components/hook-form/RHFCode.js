import { Stack } from "@mui/material";
import React, { useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
const RHFCode = ({ keyName = "", inputs = [], ...other }) => {
  const codesRef = useRef(null);
  const { control } = useFormContext();
  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);
    const nextField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );
    if (value.length > maxLength) {
      event.target.value = value[0];
    }
    if (value.length >= maxLength && fieldIntIndex < 6 && nextField !== null) {
      nextField.focus();
    }
    handleChange(event);
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      spacing={0.5}
      ref={codesRef}
    >
      {inputs.map((name, index) => (
        <Controller
          control={control}
          key={name}
          name={`${keyName}${index + 1}`}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder={"-"}
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center",outline: "none" },
                  border: error ? "2px solid red" : "2px solid #808E9B", // Đổi màu khi lỗi
                  borderRadius: "10px",
            
                  
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        ></Controller>
      ))}
    </Stack>
  );
};

export default RHFCode;
