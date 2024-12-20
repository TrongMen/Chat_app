import { faker } from "@faker-js/faker";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import StyledBadge from "./StyledBadge";

const CallLogElement = ({online}) => {
  return (
    <Box
      sx={{
        width: "100%",

        borderRadius: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default, // vừa sửa default
      }}
      p={1.5}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        className="TongTheCuaCallLogElement"
      >
        <Stack className="tungItemcuaChatLogElement"></Stack>
        {online ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
          </StyledBadge>
        ) : (
          <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
        )}
         <Stack spacing={0.3}>
              <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
              <Typography variant="caption">{msg} </Typography>
            </Stack>
      </Stack>
    </Box>
  );
};
const CallElement = () => {
  return <div>CallElement</div>;
};

export { CallLogElement, CallElement };
