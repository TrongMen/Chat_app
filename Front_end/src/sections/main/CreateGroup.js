import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{p:4}}
    >
      {/* Title */}
      <DialogTitle>Tạo nhóm mới</DialogTitle>
      {/* Content */}
      <DialogContent>
        
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
