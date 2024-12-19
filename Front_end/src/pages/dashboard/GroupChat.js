import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Search,
  SearchInconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import CreateGroup from "../../sections/main/CreateGroup";

const GroupChat = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Nhóm</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }} className="ThanhTimKiem"> 
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
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Typography variant="subtitle2" component={Link}>
                Tạo nhóm
              </Typography>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <Plus
                  style={{ color: (theme) => theme.palette.primary.main }}
                />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              spacing={3}
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
            >
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack className="GhimTinnhan"  spacing={2.4}>
                  <Typography variant="subtitle2" sx={{ color: "#67667" }}>
                    Ghim
                  </Typography>
                  {ChatList.filter((el) => el.pinned).map((el) => {
                    return <ChatElement key={el.id} {...el} />;
                  })}
                </Stack>

                <Stack spacing={2.4} className="DanhSachNhom">
                  <Typography variant="subtitle2" sx={{ color: "#67667" }}>
                    Danh sách nhóm
                  </Typography>
                  {ChatList.filter((el) => !el.pinned).map((el) => {
                    return <ChatElement key={el.id} {...el} />;
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default GroupChat;
