import React from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Autosuggest = ({ searchresults }) => {
  return (
    <Paper
      style={{
        width: "57vh",
        maxHeight: 200,
        overflow: "auto",
        marginTop: "22vh",
      }}
    >
      <List>
        {searchresults.map((item) => (
          <ListItem
            button
            onClick={() => {
              window.location.href = `/product/${item._id}`;
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
export default Autosuggest;
