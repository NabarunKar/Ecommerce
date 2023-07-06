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
      <Select
        defaultValue={10}
        inputProps={{
          name: "sortValue",
        }}
        onChange={handleChange}
        label="Sort"
      >
        <MenuItem value={10}>Default</MenuItem>
        <MenuItem value={20}>Price (Low - High)</MenuItem>
        <MenuItem value={30}>Price (High - Low)</MenuItem>
        <MenuItem value={40}>A-Z</MenuItem>
        <MenuItem value={50}>Z-A</MenuItem>
        <MenuItem value={60}>Most Recent</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;
