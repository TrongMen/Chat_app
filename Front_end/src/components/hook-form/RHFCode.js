import { Stack } from "@mui/material";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";

const RHFCode = ({ keyName = "", inputs = [], ...other }) => {
  const codesRef = useRef(null);
  const { control } = useFormContext();
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
              otherField={(event) => {}}
            />
          )}
        ></Controller>
      ))}
    </Stack>
  );
};

export default RHFCode;
