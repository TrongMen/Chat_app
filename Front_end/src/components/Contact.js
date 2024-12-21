import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";
import { useDispatch } from "react-redux";
import { ToggleSideBar, UpdateSidebar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "./AntSwitch";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Chặn thông tin </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn chặn không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose}>Chặn</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Xóa thông tin </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn xóa không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose}>Xóa</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openBlock, setOpenBlock] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleCloseDelete = () => {
    setOpenDel(false);
  };

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            direction={"row"}
            sx={{ height: "100%", p: 2 }}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">Thông tin cá nhân</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSideBar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          justifyContent={"space-around"}
          className="ThongTinCaNhan"
        >
          <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.firstName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {"1900 8815"}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Gọi thoại</Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Gọi video</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack
           spacing={2}
          >
            <Typography variant="article">Mô tả</Typography>
            <Typography variant="body2">Hoạt bát vui vẻ</Typography>
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">
              Video/Ảnh, Link & Tài liệu
            </Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebar("SHARED"));
              }}
              endIcon={<CaretRight />}
              className="NutShowMore"
              sx={{ fontSize: 12 }}
            >
              Thêm
            </Button>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack
            direction={"row"}
            alignItems={"cener"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              alignItems={"cener"}
              spacing={2}
              className="ThongbaoTinNhan"
            >
              <Bell size={21} />
              <Typography variant="subtitle2">Thông báo tin nhắn</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />
          <Typography>1 nhóm chung</Typography>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            className="InfoGroup"
          >
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Công Nghệ Mới</Typography>
              <Typography variant="caption">Nam,Cuong,Minh</Typography>
            </Stack>
          </Stack>
          <Stack
            className="ButtonDelete-Block"
            direction={"row"}
            alignItems={"center"}
            spacing={2}
          >
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
            >
              Chặn
            </Button>
            <Button
              onClick={() => {
                setOpenDel(true);
              }}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
            >
              Xóa
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDel && (
        <DeleteDialog open={openDel} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
