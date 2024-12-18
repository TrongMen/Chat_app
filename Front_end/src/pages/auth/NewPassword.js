import { Stack, Typography } from "@mui/material";
import React from "react";

const NewPassword = () => {
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
        Đổi lại mật khẩu
      </Typography>
      <Typography sx={{ color: "text.primary", mb: 5 }}>
        Vui lòng nhập mật khẩu mới
      </Typography>
    </Stack>
    // NewPS Form
  );
};

export default NewPassword;
