import {
  Box,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
// import { Gear } from "phosphor-react";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Nav_Buttons } from "../../data";

import useSettings from "../../hooks/useSettings";

// import Logo from "../../assets/Images/logo.ico";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { LogoutUser } from "../../redux/slices/auth";
import ProfileMenu from "./ProfileMenu";
import { UpdateTab } from "../../redux/slices/app";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";
    case 2:
      return "/call";

    default:
      break;
  }
};

// const getMenuPath = (index) => {
//   switch (index) {
//     case 0:
//       return "/profile";
//     case 1:
//       return "/auth/login";

//     default:
//       break;
//   }
// };
const SideBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  // const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const { tab } = useSelector((state) => state.app);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const selectedTab = tab;

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };
  // Thanh menu bên trái
  return (
    <Box
      p={2}
      sx={{
        backgroudColor: theme.palette.background.paper, //vừa sửa paper
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={3}>
          <Box
            sx={{
              backgroudColor: theme.palette.primary.main,

              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            {/* <img
              src={Logo}
              alt={"Chat App"}
              style={{ height: 64, width: 64 }}
            /> */}
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) => {
              return el.index === selectedTab ? (
                <Box
                  key={el.index}
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#fff" }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "Light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={el.index}
                >
                  {el.icon}
                </IconButton>
              );
            })}

            <Divider sx={{ width: "48px" }} />
            {/* {selected === 3 ? (
              <Box
                p={1}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear></Gear>
                </IconButton>
              </Box>
            ) : (
              <Stack></Stack>
              <IconButton
                onClick={() => setSelected(3)}
                sx={{
                  width: "max-content",
                  color:
                    theme.palette.mode === "Light"
                      ? "#000"
                      : theme.palette.text.primary,
                }}
              >
                <Gear />
              </IconButton>
            )} */}
          </Stack>
        </Stack>

        <Stack spacing={3} alignItems={"center"}>
          <AntSwitch
            onChange={() => {
              onToggleMode();
            }}
            defaultChecked={theme.palette.mode === "dark"}
          />
          {/* <Avatar
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={faker.image.avatar()}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => (
                <MenuItem key={el.id} onClick={() => handleClick}>
                  <Stack
                    onClick={() => {
                      if (idx === 1) {
                        dispatch(LogoutUser());
                      } else {
                        navigate(getMenuPath(idx));
                      }
                    }}
                    // onClick={() => {
                    //   navigate(getMenuPath(idx));
                    // }}
                    sx={{ width: 100 }}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <span>{el.title}</span>
                    {el.icon}
                  </Stack>
                </MenuItem>
              ))}
            </Stack>
          </Menu> */}
          <ProfileMenu/>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
