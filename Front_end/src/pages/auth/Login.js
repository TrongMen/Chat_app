import { Stack, Typography, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <Stack
      spacing={2}
      sx={{
        mb: 5,
        position: "relative",
        backgroundColor: "rgba(244, 240, 240, 0.8)", // Màu xám trong suốt
        borderRadius: "20px", // Bo tròn góc

        maxWidth: "100%",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Thêm bóng mờ cho form
      }}
    >
      <Typography variant="h4" p={1}>
        Đăng nhập
      </Typography>

      {/* Login Form */}
      <LoginForm />

      <Stack direction={"row"} spacing={1} p={1}>
        <Typography variant="body2">Bạn chưa có tài khoản ?</Typography>
        <Link to={"/auth/register"} variant="subtitle2" component={RouterLink}>
          Đăng ký
        </Link>
      </Stack>
    </Stack>
  );
};

export default Login;
