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
        
        
      }}
    >
      <Typography variant="h4">Đăng nhập</Typography>
      
      {/* Login Form */}
      <LoginForm />
      {/* Auth Social */}
      <Stack direction={"row"} spacing={0.5}>
        <Typography variant="body2">Bạn chưa có tài khoản ?</Typography>
        <Link to={"/auth/register"} variant="subtitle2" component={RouterLink}>
          Đăng ký
        </Link>
      </Stack>
    </Stack>
  );
};

export default Login;
