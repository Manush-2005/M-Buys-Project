import React from "react";
import NavBar from "../Componets/NavBar";
import * as jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Axios from "axios";
import ProductDisplay from "../Componets/Productdisplay";
import Footer from "../Componets/Footer";
import Autosuggest from "../Componets/Autosuggest";
import Loader from "../Componets/Loader";

const Homepage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    function decodethedata() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
      }

      const decoded = jwtDecode.jwtDecode(token);
      const user = decoded.isuser;
      setCurrentUser(user);
    }

    async function getproducts() {
      const res = await Axios.get("http://localhost:3001/getproducts");
      setProducts(res.data.products);
      console.log(products);
    }

    getproducts();
    decodethedata();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />; // replace "/path/to/your/loader.gif" with the path to your loader GIF
  }

  return (
    <>
      <NavBar />
      <div style={{ marginTop: "10%" }}>
        {currentUser && (
          <Box
            sx={{
              m: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              {currentUser
                ? `HI ${currentUser.name}! What are you buying today?`
                : "Please log in."}
            </Typography>
          </Box>
        )}
      </div>

      <div style={{ marginTop: "4%", width: "98%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,

            color: "#fff",
            p: 2,
            width: "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <LocalShippingIcon sx={{ fontSize: 40, color: "black" }} />
                <Typography variant="h6" gutterBottom>
                  Fast Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get your products delivered quickly
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <AttachMoneyIcon sx={{ fontSize: 40, color: "black" }} />
                <Typography variant="h6" gutterBottom>
                  Low Prices
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enjoy shopping at the best prices with our competitive rates.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <SupportAgentIcon sx={{ fontSize: 40, color: "black" }} />
                <Typography variant="h6" gutterBottom>
                  Robust Customer Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We're here to help with any issues or questions you may have.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>

      <ProductDisplay products={products} />
    </>
  );
};

export default Homepage;
