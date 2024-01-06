import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NavBar from "../Componets/NavBar";
import Box from "@mui/material/Box";
import * as jwtDecode from "jwt-decode";
import Footer from "../Componets/Footer";

const Productinfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [userid, setUserid] = useState("");

  useEffect(() => {
    async function getproduct() {
      const res = await axios.get("http://localhost:3001/getproduct/" + id);
      setProduct(res.data);
    }
    async function getuserid() {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode.jwtDecode(token);
      setUserid(decoded.isuser._id);
    }

    getuserid();

    getproduct();
  }, []);

  async function addtocart() {
    const res = await axios.post(
      "http://localhost:3001/addtocart/" + id + "/" + userid
    );
    if (res.data.message === "Product added to cart") {
      alert("Product added to cart");
    }
  }

  async function buyproduct() {
    const res = await axios.delete(
      "http://localhost:3001/deleteallcart/" + userid
    );
    const res2 = await axios.post(
      "http://localhost:3001/addtocart/" + id + "/" + userid
    );
    if (res.data.message === "Product added to cart") {
      alert("Proceeding to Checkout");
    }
    window.location.href = "/checkout";
  }

  return (
    <>
      <NavBar />
      <Box mt={10}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="500"
              image={product.image}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontSize="30px"
                >
                  ${product.price}
                </Typography>
                <br></br>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="25px"
                  fontWeight="bold"
                >
                  {product.description}
                </Typography>

                <Box sx={{ mt: 20 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addtocart}
                    fullWidth
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={buyproduct}
                    fullWidth
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Productinfo;
