import React, { useEffect } from "react";
import { useState } from "react";
import * as jwtDecode from "jwt-decode";
import axios from "axios";
import Checkout from "../Componets/Checkout";
import DiscountContext from "../Componets/DiscountContext";
import NavBar from "../Componets/NavBar";

const Checkoutpage = () => {
  const [finalitems, setFinalitems] = useState([]);
  const [userid, setUserid] = useState("");
  const [isEligibleForDiscount, setIsEligibleForDiscount] = useState(false);

  useEffect(() => {
    function getuserid() {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode.jwtDecode(token);
      return decoded.isuser._id;
    }
    const userid = getuserid();
    setUserid(userid);

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

      setFinalitems(products);
    }

    async function checkdiscount() {
      const token = localStorage.getItem("Discount");
      if (token) {
        setIsEligibleForDiscount(true);
      }
    }

    getCart();
    checkdiscount();
  }, []);

  function dototal(item1) {
    let total = 0;

    for (let i = 0; i < item1.length; i++) {
      total += item1[i].price;
    }

    return total;
  }
  let total = dototal(finalitems);

  return (
    <>
      <NavBar />
      <DiscountContext.Provider value={isEligibleForDiscount}>
        <Checkout cartItems={finalitems} total={total} fees={5} />
      </DiscountContext.Provider>
    </>
  );
};
export default Checkoutpage;
