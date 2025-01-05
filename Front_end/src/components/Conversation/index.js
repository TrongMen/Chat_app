import { Box, Stack } from "@mui/material";
import React from "react";
import ChatFooter from "../Chat/Footer";
import ChatHeader from "../Chat/Header";
import Message from "./Message";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat Header */}
      <ChatHeader />
      {/* Chat Body */}
      <Box width={"100%"} sx={{ flexGrow: 1,height:"100%",overflowY:"auto"}}> 
        <Message menu={true}/>

      </Box>
      {/* Chat Footer     */}
      <ChatFooter />
    </Stack>
  );
};

export default Conversation;
