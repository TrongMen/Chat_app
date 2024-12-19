import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Search,
  SearchInconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";

const GroupChat = () => {
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

            <Stack sx={{ width: "100%" }}>
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
            <Stack>
                <Typography variant="h6">Tạo nhóm</Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
      </Stack>
    </>
  );
};

export default GroupChat;
