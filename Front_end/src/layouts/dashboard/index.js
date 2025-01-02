import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackBar } from "../../redux/slices/app";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const user_id = window.localStorage.getItem("user_id");

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
    }
    return () => {
      socket.off("new_friend_request");
      socket.off("request_accepted");
      socket.off("request_sent");
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
