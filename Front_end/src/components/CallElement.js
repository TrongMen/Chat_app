import { Box } from '@mui/material'
import React from 'react'

const CallLogElement = () => {
    return (
        <Box
        sx={{
          width: "100%",
  
          borderRadius: 1,
          backgroundColor:(theme) =>
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background.default, // vừa sửa default
        }}
        p={1.5}
      >

        
      </Box>
    )
  }
const CallElement = () => {
  return (
    <div>CallElement</div>
  )
}

export  {CallLogElement,CallElement };