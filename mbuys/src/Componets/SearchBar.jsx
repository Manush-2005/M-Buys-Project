import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autosuggest from "./Autosuggest";
import { useEffect } from "react";
import axios from "axios";

const SearchBar = () => {
  const [Filerdata, setFilerdata] = useState([]);
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function getproducts() {
      const res = await axios.get("http://localhost:3001/getproducts");

      setOptions(res.data.products);
    }

    getproducts();
  }, []);

  const HandleFilter = (e) => {
    const serachword = e.target.value;
    setInput(serachword);

    const newFilter = options.filter((value) => {
      return value.name.toLowerCase().includes(serachword.toLowerCase());
    });

    if (serachword === "") {
      setFilerdata([]);
    } else {
      setFilerdata(newFilter);
    }
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
          backgroundColor: "white",
          width: "59vh",
          right: "35vh",
          borderRadius: "10px",

          color: "black",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "6vh",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          style={{
            color: "black",
            paddingLeft: "30px",
          }}
          value={input}
          onChange={HandleFilter}
        />
      </div>
      <div
        style={{
          position: "absolute",
          marginTop: "99px",
          color: "black",
          left: "33%",
        }}
      >
        {Filerdata.length !== 0 && input !== "" ? (
          <Autosuggest searchresults={Filerdata} />
        ) : null}
      </div>
    </>
  );
};

export default SearchBar;
