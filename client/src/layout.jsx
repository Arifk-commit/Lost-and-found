import React from "react";
import { Box } from '@mui/material'
import Navbar from "./Components/NavbarModern.jsx"; // Using modern navbar
import Footer from "./Components/FooterModern.jsx"; // Using modern footer

function Layout(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Navbar />
      <Box sx={{ flex: 1, width: '100%' }}>
        {props.children}
      </Box>
      <Footer/>
    </Box>
  );
}

export default Layout;
