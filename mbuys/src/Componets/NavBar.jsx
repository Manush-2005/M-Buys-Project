import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import Cart from "./Cart";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar";
import { Menu, MenuItem, Popper, Paper } from "@mui/material";
import * as jwtDecode from "jwt-decode";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const handledraweropen = () => {
    setOpen(true);
  };

  const handledrawerclose = () => {
    setOpen(false);
  };
  const handleMouseOver = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseOut = () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  async function Logout() {
    setUser(null);
    window.location.href = "/";
  }

  useEffect(() => {
    function decodethedata() {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      const decoded = jwtDecode.jwtDecode(token);

      const user = decoded.isuser;
      setUser(user);
    }

    decodethedata();
  }, []);

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: "30px" }}
          onClick={() => {
            window.location.href = "/HomePage";
          }}
        >
          MBUYS
        </Typography>
        <SearchBar />

        <Button
          color="inherit"
          sx={{ "&:hover": { backgroundColor: "white", color: "black" } }}
          onClick={() => {
            window.location.href = "/HomePage";
          }}
        >
          HOME
        </Button>

        <Button
          color="inherit"
          sx={{ "&:hover": { backgroundColor: "white", color: "black" } }}
          onMouseOver={handleMouseOver}
          onClick={handleMouseOut}
        >
          PRODUCTS
        </Button>
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          placement="bottom-start"
        >
          <Paper style={{ marginTop: "20px" }}>
            <MenuItem>
              <a
                href="/phones"
                style={{ textDecoration: "none", color: "black" }}
              >
                Best Phones
              </a>
            </MenuItem>

            <MenuItem>
              <a
                href="/Laptops"
                style={{ textDecoration: "none", color: "black" }}
              >
                Best Laptops
              </a>
            </MenuItem>
          </Paper>
        </Popper>

        {user === null ? (
          <Button color="inherit">Login</Button>
        ) : (
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        )}

        {user !== null && (
          <IconButton color="inherit">
            <a
              href="/OrderTracking"
              style={{ textDecoration: "none", color: "white" }}
            >
              <TrackChangesIcon />
            </a>
          </IconButton>
        )}

        <IconButton color="inherit" onClick={handledraweropen}>
          <ShoppingCartIcon />
        </IconButton>

        <Cart open={open} handleDrawerClose={handledrawerclose} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
