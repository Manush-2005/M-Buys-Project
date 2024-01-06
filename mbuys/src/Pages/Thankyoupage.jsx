import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import NavBar from "../Componets/NavBar";

const Thankyoupage = () => {
  useEffect(() => {
    const discount = localStorage.getItem("Discount");
    if (discount) {
      localStorage.removeItem("Discount");
    }
  }, []);

  return (
    <>
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Thank you for your purchase!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Your order has been placed successfully and will be delivered soon.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/HomePage"
        >
          Continue Shopping
        </Button>
      </Box>
    </>
  );
};

export default Thankyoupage;
