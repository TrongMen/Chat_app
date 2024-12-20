import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import StyledBadge from "./StyledBadge";
import { faker } from "@faker-js/faker";
import { styled, useTheme } from "@mui/material/styles";

  
const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme();
    return (
      <Box
        sx={{
          width: "100%",
  
          borderRadius: 1,
          backgroundColor:
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
        >
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={faker.image.avatar()} />
              </StyledBadge>
            ) : (
              <Avatar src={faker.image.avatar()} />
            )}
  
            <Stack spacing={0.3}>
              <Typography variant="subtitle2">{name}</Typography>
              <Typography variant="caption">{msg} </Typography>
            </Stack>
            </Stack>
            <Stack spacing={0.5}></Stack>
            <Stack spacing={2} alignItems={"center"}>
              <Typography sx={{ fontWeight: 600 }} variant="caption">
                {time}
              </Typography>
  
              <Badge color="primary" badgeContent={unread}></Badge>
            </Stack>
          
        </Stack>
      </Box>
    );
  };

  export default ChatElement;