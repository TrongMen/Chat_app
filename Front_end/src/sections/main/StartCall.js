import { Dialog, DialogContent, DialogTitle, Slide, Stack } from "@mui/material";
import React from "react";
import { Search, SearchInconWrapper, StyledInputBase } from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
    >
      <DialogTitle sx={{ mb: 3 }}>Bắt đầu cuộc gọi mới</DialogTitle>
      {/* Content */}
      <DialogContent>
        {/* Form */}
        <Stack sx={{ width: "100%" }} className="ThanhTimKiem">
          <Search>
            <SearchInconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchInconWrapper>
            <StyledInputBase
              placeholder="Nhập tên bạn bè ..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        {/* Call List */}
        {/* <CreateGroupForm handleClose={handleClose} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
