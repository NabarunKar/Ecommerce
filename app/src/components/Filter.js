import React, { useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Filter() {
  const { sort, sortOption } = useFilterContext();

  const [sortValue, setSortValue] = useState("");

  const handleChange = (event) => {
    setSortValue(event.target.value);
    sort(event.target.value);
  };
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Sort</InputLabel>
      <Select value={sortValue} onChange={handleChange} label="Sort">
        <MenuItem value="pAsc">Price (Low - High)</MenuItem>
        <MenuItem value="pDesc">Price (High - Low)</MenuItem>
        <MenuItem value="asc">A-Z</MenuItem>
        <MenuItem value="desc">Z-A</MenuItem>
        <MenuItem value="tDesc">Most Recent</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;
