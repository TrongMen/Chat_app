import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyForm from "../../sections/auth/VerifyForm";

const Verify = () => {
  return (
    <>
    <Stack
      spacing={2}
      sx={{
        mb: 5,
        position: "relative",
        backgroundColor: "rgba(244, 240, 240, 0.8)",
        borderRadius: "20px",
        maxWidth: "100%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4">Vui lòng nhập mã OTP</Typography>
      <Stack direction={"row"} spacing={0.5}>
        <Typography variant="body2">OTP đã gửi đến email của bạn</Typography>
      </Stack>
    
    {/* Verify Form */}
    <VerifyForm/>
    </Stack>
    </>
  );
};

export default Verify;
