import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              //Timeline
              return <Timeline key={el.id || index} el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg key={el.id || index} el={el} />;

                case "doc":
                  return <DocMsg key={el.id || index} el={el} />;
                case "link":
                  return <LinkMsg key={el.id || index} el={el} />;
                case "reply":
                  return <ReplyMsg key={el.id || index} el={el} />;
                default:
                  return <TextMsg key={el.id || index} el={el} />;
              }
              
            default:
              return <></>;
             
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
