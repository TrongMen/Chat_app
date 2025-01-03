import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/app";
import { useEffect } from "react";
import { AddDirectConversation, UpdateDirectConversation } from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user_id = window.localStorage.getItem("user_id");
  const {conversations} = useSelector((state) => state.conversation.direct_chat);
  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash || window.location.hash !== "#loaded") {
      //     window.location.hash = "#loaded";
      //     window.location.reload();
      //   }
      // };
      
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
      };
      window.onload();
      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_friend_request", (data) => {
        dispatch(showSnackBar({severity: "success", message: data.message}));
      });

      socket.on("request_accepted", (data) => {
        dispatch(showSnackBar({severity: "success", message: data.message}));
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackBar({severity: "success", message: data.message}));
      });
      socket.on("start_chat", (data) => {
        const  existing_conversation =conversations.find((el)=>el.id === data._id)
        if(existing_conversation) {
          dispatch(UpdateDirectConversation({conversation:data}));
        }else{
          dispatch(AddDirectConversation({conversation:data}));
        }
        // dispatch(SelectConversation({room_id:data._id}));
      });
    }
    return () => {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
      socket.off("start_chat");
    };
  }, [isLoggedIn,dispatch, user_id]);
  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction={"row"}>
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
