import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export const NewPassword = () => {
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
      <Typography variant="h3" p={1}>
        Đổi lại mật khẩu
      </Typography>
      <Typography sx={{ color: "text.primary", mb: 5 }}>
        Vui lòng nhập mật khẩu mới
      </Typography>

      {/* NewPS Form */}
      
    </Stack>
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
  </>
  );
};


