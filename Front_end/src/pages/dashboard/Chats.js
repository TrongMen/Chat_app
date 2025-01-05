import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
// import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import {
  Search,
  SearchInconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversation";
import useResponsive from "../../hooks/useResponsive";
import  BottomNav  from "../../layouts/dashboard/BottomNav";

const user_id = window.localStorage.getItem("user_id");
const Chats = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  const {conversations} = useSelector((state) => state.conversation.direct_chat);
  const isDesktop = useResponsive("up", "md");

  useEffect(() => {
    socket.emit("get_direct_conversations",{user_id},(data) =>{
      dispatch(FetchDirectConversations({ conversations: data }));
    });

  }, [dispatch]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };


 
  return (
    <>
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
        {!isDesktop && (
          
          <BottomNav />
        )}
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <IconButton onClick={() => {
                  handleOpenDialog();
                }}
                sx={{ width: "max-content" }}
                >
                <Users size={32} />
              </IconButton>
              <IconButton>
                <CircleDashed size={32} />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }} className="Tìm kiếm">
            <Search>
              <SearchInconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchInconWrapper>
              <StyledInputBase
                placeholder="Tìm ..."
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
                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Ghim tin nhắn
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement key={el.id} {...el} />;
                })} */}
              </Stack>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Tin nhắn
                </Typography>
                {conversations.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement key={el.id}  {...el} />;
                  // key={el.id} 
                })}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
