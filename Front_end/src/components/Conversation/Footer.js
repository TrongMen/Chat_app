import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import {
  Box,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  Fab,
  Tooltip,
} from "@mui/material";
import {
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
} from "phosphor-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    index: 0,
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Ảnh/Video",
  },
  {
    index: 1,
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    index: 2,
    color: "#0159b2",
    icon: <File size={24} />,
    y: 242,
    title: "Tài liệu",
  },
];

const ChatInput = ({ openPicker, setOpenPicker }) => {
  const [openActions, setOpenActions] = useState(false);
  return (
    <StyledInput
      fullWidth
      placeholder="Nhập tin nhắn"
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack
              sx={{
                position: "relative",
                display: openActions ? "inline-block" : "none",
              }}
            >
              {Actions.map((el, index) => (
                <Tooltip key={index} placement="right" title={el.title}>
                  <Fab
                    onClick={() => {
                      setOpenActions(!openActions);
                    }}
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions);
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setOpenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);
  return (
    <Box
      p={2}
      sx={{
        height: 100,
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 81,
              right: 100,
            }}
          >
            <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;



// import React, { useState } from "react";
// import { useTheme, styled } from "@mui/material/styles";
// import {
//   Box,
//   TextField,
//   Stack,
//   IconButton,
//   InputAdornment,
//   Fab,
//   Tooltip,
// } from "@mui/material";
// import {
//   File,
//   Image,
//   LinkSimple,
//   PaperPlaneTilt,
//   Smiley,
//   Sticker,
// } from "phosphor-react";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";

// const StyledInput = styled(TextField)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     paddingTop: "12px",
//     paddingBottom: "12px",
//   },
// }));

// const Actions = [
//   {
//     index: 0,
//     color: "#4da5fe",
//     icon: <Image size={24} />,
//     y: 102,
//     title: "Photo/Video",
//   },
//   {
//     index: 1,
//     color: "#1b8cfe",
//     icon: <Sticker size={24} />,
//     y: 172,
//     title: "Stickers",
//   },
//   {
//     index: 2,
//     color: "#0159b2",
//     icon: <File size={24} />,
//     y: 242,
//     title: "Document",
//   },
// ];
// const ChatInput = ({ openPicker, setOpenPicker }) => {
//   const [openActions, setOpenActions] = useState(false);
//   return (
//     <StyledInput
//       fullWidth
//       placeholder="Nhập tin nhắn"
//       variant="filled"
//       InputProps={{
//         disableUnderline: true,
//         startAdornment: (
//           <Stack sx={{ width: "max-content" }}>
//             <Stack
//               sx={{
//                 position: "relative",
//                 display: openActions ? "inline-block" : "none",
//               }}
//             >
//               {Actions.map((el,index) => (
//                 <Tooltip  key={index} placement="right" title={el.title}>
//                   <Fab
//                     onClick={() => {
//                       setOpenActions(!openActions);
//                     }}
//                     sx={{
//                       position: "absolute",
//                       top: -el.y,
//                       backgroundColor: el.color,
//                     }}
//                   >
//                     {el.icon}
//                   </Fab>
//                 </Tooltip>
//               ))}
//             </Stack>
//             <InputAdornment>
//               <IconButton
//                 onClick={() => {
//                   setOpenActions(!openActions);
//                 }}
//               >
//                 <LinkSimple></LinkSimple>
//               </IconButton>
//             </InputAdornment>
//           </Stack>
//         ),
//         endAdornment: (
//           <InputAdornment>
//             <IconButton
//               onClick={() => {
//                 setOpenPicker((prev) => !prev);
//               }}
//             >
//               <Smiley />
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// };
// const Footer = () => {
//   const theme = useTheme();
//   const [openPicker, setOpenPicker] = useState(false);
//   return (
//     <Box
//       p={2}
//       sx={{
//         height: 100,
//         width: "100%",
//         backgroundColor:
//           theme.palette.mode === "light"
//             ? "#F8FAFF"
//             : theme.palette.background.paper, // vừa sửa paper
//         boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
//       }}
//     >
//       <Stack direction={"row"} alignItems={"center"} spacing={3}>
//         <Stack sx={{ width: "100%" }}>
//           <Box
//             sx={{
//               display: openPicker ? "inline" : "none",
//               zIndex: 10,
//               position: "fixed",
//               bottom: 81,
//               right: 100,
//             }}
//           >
//             <Picker
//               theme={theme.palette.mode}
//               data={data}
//               onEmojiSelect={console.log}
//             />
//           </Box>
//           <ChatInput setOpenPicker={setOpenPicker} />
//         </Stack>

//         <Box
//           sx={{
//             height: 48,
//             width: 48,
//             backgroundColor: theme.palette.primary.main,
//             borderRadius: 1.5,
//           }}
//         >
//           <Stack
//             sx={{
//               height: "100%",
//               width: "100%",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <IconButton>
//               <PaperPlaneTilt color="#fff" />
//             </IconButton>
//           </Stack>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };

// export default Footer;
