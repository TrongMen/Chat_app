import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
const ResetPassword = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
      <Typography variant="h3">Quên mật khẩu?</Typography>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Vui lòng nhập email và chúng tôi gửi link để bạn đổi lại mật khẩu
      </Typography>
      {/* ResetPassword Form */}

      <Link
        component={RouterLink}
        to={"/auth/login"}
        color={"inherit"}
        variant="subtitle2"
        sx={{ mt: 3, mx: "auto", alignItems: "center" }}
      >
        <CaretLeft />
        Quay lại trang đăng nhập
      </Link>
    </Stack>
  );
};

export default ResetPassword;
