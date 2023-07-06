import React, { useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Filter() {
  const [sortValue, setSortValue] = useState("");

  const handleChange = (event) => {
    setSortValue(event.target.value);
  };
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Sort</InputLabel>
      <Select value={sortValue} onChange={handleChange} label="Sort">
        <MenuItem value={10}>Price (Low - High)</MenuItem>
        <MenuItem value={20}>Price (High - Low)</MenuItem>
        <MenuItem value={30}>A-Z</MenuItem>
        <MenuItem value={40}>Z-A</MenuItem>
        <MenuItem value={50}>Most Recent</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;
