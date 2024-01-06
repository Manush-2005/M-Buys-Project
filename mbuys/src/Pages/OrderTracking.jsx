import React, { useContext } from "react";
import axios from "axios";
import * as jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import NavBar from "../Componets/NavBar";

// ...

const OrderTrackingpage = () => {
  const [orders, setOrders] = useState([]);
  const [productss, setProductss] = useState([]);
  const [isEligibleForDiscount, setIsEligibleForDiscount] = useState(false);

  useEffect(() => {
    function getuser() {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode.jwtDecode(token);
      const user = decoded.isuser;
      return user;
    }

    const user = getuser();
    const id = user._id;

    async function getorders() {
      const res = await axios.get(`http://localhost:3001/getorders/${id}`);

      setOrders(res.data.Orders);

      getproducts(res.data.Orders);
    }

    async function getproducts(orders) {
      if (orders) {
        const productPromises = orders.map((order) => {
          return axios.get(`http://localhost:3001/getproduct/${order}`);
        });
        const productResponses = await Promise.all(productPromises);
        const newproductss = productResponses.map((res) => res.data);
        setProductss(newproductss);
      }
    }

    getorders();
  }, []);
  useEffect(() => {
    if (orders) {
      if (orders.length >= 5) {
        setIsEligibleForDiscount(true);

        if (isEligibleForDiscount) {
          const token = localStorage.setItem("Discount", true);
        }
      }
    }
  }, [orders]);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "16%", marginBottom: "4%" }}>
        <Typography variant="h4" gutterBottom>
          Order Tracking
        </Typography>
        {isEligibleForDiscount && (
          <Typography variant="h6" color="secondary">
            Congratulations! You are eligible for a 50% discount on your next
            purchase.
          </Typography>
        )}
        <List>
          {orders && orders.length > 0 ? (
            orders.map((order, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Order ${index + 1}: ${order}`}
                  secondary={
                    <>
                      {`Product: ${
                        productss[index] ? productss[index].name : "Loading..."
                      }`}
                      <br />
                      {`Price: ${
                        productss[index] ? productss[index].price : "Loading..."
                      }`}
                      <br />
                      {"Status: " + "To Be Delivered"}
                    </>
                  }
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="h6" color="textSecondary">
              No orders found.
            </Typography>
          )}
        </List>
      </Container>
    </>
  );
};

export default OrderTrackingpage;
