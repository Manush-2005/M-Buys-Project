import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Signuppage";
import Productinfo from "./Pages/Productinfo";
import Checkoutpage from "./Pages/Checkoutpage";
import PaymentMethodpage from "./Pages/Paymentpage";
import Thankyoupage from "./Pages/Thankyoupage";
import Phonespage from "./Pages/Phonespage";
import Laptopspage from "./Pages/Laptopspage";
import OrderTrackingpage from "./Pages/OrderTracking";
import DiscountContext from "./Componets/DiscountContext";
import store from "./Store";
import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/HomePage" element={<Homepage />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/product/:id" element={<Productinfo />} />

          <Route path="/payment/:total" element={<PaymentMethodpage />} />
          <Route path="/thankyou" element={<Thankyoupage />} />
          <Route path="/phones" element={<Phonespage />} />
          <Route path="/laptops" element={<Laptopspage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/OrderTracking" element={<OrderTrackingpage />} />
          <Route path="/checkout" element={<Checkoutpage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
