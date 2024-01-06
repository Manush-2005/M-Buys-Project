import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#f7f7f7", p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          MBUYS
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Thank you for shopping with us!
        </Typography>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            <Link color="inherit" href="https://yourwebsite.com/">
              MBUYS.COM
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
