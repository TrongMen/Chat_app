import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/Images/logo.ico";
import { Gear } from "phosphor-react";
import { Nav_Buttons } from "../../data";
import { useState } from "react";
import { faker } from "@faker-js/faker";
import  useSettings  from "../../hooks/useSettings";

  const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const {onToggleMode} = useSettings();
 
  
  return (
    <>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh", // Chiếm toàn bộ chiều cao
      }}
    >

    
      <Box
        p={2}
        sx={{
          
          backgroudColor: theme.palette.background.paper,
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
          <Stack  alignItems={"center"} spacing={3}>
          <Box
            sx={{
              backgroudColor: theme.palette.primary.main,

              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img
              src={Logo}
              alt={"Chat App"}
              style={{ height: 64, width: 64 }}
            />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) =>
              el.index === selected ? (
                <Box
                  p={1}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: "max-content", color: "#fff" }}
                    key={el.index}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => setSelected(el.index)}
                  sx={{ width: "max-content", color: theme.palette.mode === "Light" ?"#000" :theme.palette.text.primary }}
                  key={el.index}
                >
                  {el.icon}
                </IconButton>
              )
            )}
            <Divider sx={{ width: "48px" }} />
            {selected === 3 ? (
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
              <IconButton onClick={() => setSelected(3)}
                sx={{ width: "max-content", color: theme.palette.mode === "Light" ?"#000" :theme.palette.text.primary}}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>


          </Stack>


          <Stack spacing={3} alignItems={"center"}>
            <Switch onChange={()=>{
              onToggleMode();
            }} />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      
      <Outlet />
      </Box>
    </>
  );
};

export default DashboardLayout;
