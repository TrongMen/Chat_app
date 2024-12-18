import { Stack, Typography } from "@mui/material";
import React from "react";

const ResetPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h3">Quên mật khẩu?</Typography>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Vui lòng nhập email và chúng tôi gửi link để bạn đổi lại mật khẩu
      </Typography>
    </Stack>
  );
};

export default ResetPassword;
