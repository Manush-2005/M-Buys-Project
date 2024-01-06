import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { useState, useEffect } from "react";
import axios from "axios";
import * as jwtDecode from "jwt-decode";
import Button from "@mui/material/Button";
import Checkout from "./Checkout";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";

const Cart = ({ open, handleDrawerClose }) => {
  const [items, setItems] = useState([]);
  const [userid, setUserid] = useState("");

  useEffect(() => {
    function getuserid() {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const decoded = jwtDecode.jwtDecode(token);
      return decoded.isuser._id;
    }

    const userid = getuserid();

    if (!userid) {
      setUserid("");
    } else {
      setUserid(userid);
    }

    async function getCart() {
      const res = await axios.get("http://localhost:3001/getcart/" + userid);
      const productids = res.data.products;

      const products = [];
      for (let i = 0; i < productids.length; i++) {
        const res = await axios.get(
          "http://localhost:3001/getproduct/" + productids[i]
        );
        products.push(res.data);
      }

      setItems(products);
    }

    getCart();
  }, []);

  useEffect(() => {
    async function getcartagain() {
      const res = await axios.get("http://localhost:3001/getcart/" + userid);
      const productids = res.data.products;

      const products = [];
      for (let i = 0; i < productids.length; i++) {
        const res = await axios.get(
          "http://localhost:3001/getproduct/" + productids[i]
        );
        products.push(res.data);
      }

      setItems(products);
    }
    getcartagain();
  }, [items]);

  function dototal(item1) {
    let total = 0;

    for (let i = 0; i < item1.length; i++) {
      total += item1[i].price;
    }

    return total;
  }

  async function removeitem(item_id) {
    const res = await axios.delete(
      "http://localhost:3001/deletecart/" + item_id + "/" + userid
    );
    console.log(res);
  }

  const total = dototal(items);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <Box
          sx={{
            width: 300,
            p: 2,
          }}
        >
          <IconButton onClick={handleDrawerClose} sx={{ float: "right" }}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Your Items{" "}
          </Typography>
          <Divider />
          <List>
            {items.map((item, index) => (
              <ListItem button key={index}>
                <ListItemAvatar>
                  {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {item.name.charAt(0)}
                  </Avatar> */}
                </ListItemAvatar>

                <ListItemText primary={item.name} />
                <Typography variant="body1">${item.price}</Typography>
                <IconButton onClick={() => removeitem(item._id)}>
                  <CloseIcon />
                </IconButton>
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="body1">${total}</Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "10px" }}
                onClick={() => (window.location.href = "/checkout")}
              >
                Proceed to Checkout
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
