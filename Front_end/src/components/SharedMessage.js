import { Box, Grid, IconButton, Tab, Tabs } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { CaretLeft } from "phosphor-react";
import { useDispatch } from "react-redux";
import { UpdateSidebar } from "../redux/slices/app";
import { faker } from "@faker-js/faker";

const SharedMessage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebar("CONTACT"));
              }}
            >
              <CaretLeft />
            </IconButton>
          </Stack>
        </Box>

        <Tabs
          sx={{ px: 3, pt: 1.5 }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Video/Ảnh" />
          <Tab label="Link" />
          <Tab label="Tài liệu" />
        </Tabs>
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
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((el) => {
                      return (
                        <Grid item xs={4}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessage;
