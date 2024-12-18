import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";
const ResetPassword = () => {
  return (
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
      <Typography variant="h3" p={1}>
        Bạn quên mật khẩu
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 5 }} p={1.5}>
        Vui lòng nhập email và chúng tôi gửi link để bạn đổi lại mật khẩu
      </Typography>
      {/* ResetPassword Form */}
      <ResetPasswordForm />
      <Link
        component={RouterLink}
        to={"/auth/login"}
        color={"inherit"}
        variant="subtitle2"
        sx={{ mt: 3, mx: "auto", alignItems: "center" }}
        p={1}
      >
        <CaretLeft size={11} />
        Quay lại trang đăng nhập
      </Link>
    </Stack>
  );
};

export default ResetPassword;
