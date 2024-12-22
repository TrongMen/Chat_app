import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import BG from "../../assets/Images/BG1.jpeg";

const isAuthenticated = true;
const MainLayout = () => {
  if(isAuthenticated){
    return <Navigate to={"/app"}/>
  }

  return (
    <>
    <div
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          margin: 0, // Loại bỏ khoảng trắng thừa
          padding: 0, // Loại bỏ khoảng trắng thừa
          display: "flex", // Căn giữa nội dung
          justifyContent: "center", // Căn giữa theo chiều ngang
          alignItems: "center", // Căn giữa theo chiều dọc
        }}
      >
      <Container
        sx={{
          mt: 5,
          
        }}
        maxWidth="sm"
      >
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            direction={"column"}
            alignItems={"center"}
          >
            <h1 style={{color:"white",margin:10}}>Chat App</h1>
          </Stack>
        </Stack>
        {/* <div>Main Layout</div> */}
        <Outlet />
      </Container>
      </div>
    </>
  );
};

export default MainLayout;
