import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`, // vừa sửa paper
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1), // vừa sửa default
  marginLeft: 0,
  width: "100%",
}));

const SearchInconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  padding: theme.spacing(0, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
const Chats = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "relative",
        width: 320,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
          
            : theme.palette.background.paper, //vừa sửa paper 
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed size={32} />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchInconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchInconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack spacing={2}>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24}></ArchiveBox>
            <Button> Archive</Button>
          </Stack>
          <Divider />
        </Stack>
        <Stack
          spacing={2}
          direction={"column"}
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
        >
          <SimpleBarStyle timeout={500} clickOnTrack={false}>
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Ghim tin nhắn
              </Typography>
              {ChatList.filter((el) => el.pinned).map((el) => {
                return <ChatElement key={el.id} {...el} />;
              })}
            </Stack>
            <Stack spacing={2}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Tin nhắn
              </Typography>
              {ChatList.filter((el) => !el.pinned).map((el) => {
                return <ChatElement  key={el.id} {...el} />;
              })}
            </Stack>
          </SimpleBarStyle>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
