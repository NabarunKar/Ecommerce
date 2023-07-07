import React, { useState } from "react";
import { useFilterContext } from "../contexts/FilterContext";
import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function Filter() {
  const { sort, searchValue, setSearchValue } = useFilterContext();

  const [sortValue, setSortValue] = useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSortValue(event.target.value);
    sort(event.target.value);
  };
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} sx={{ margin: "auto" }}>
          <TextField
            label="Search Products"
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <FilterAltIcon />
        </IconButton>
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
      </Box>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        keepMounted
      >
        <DialogTitle>
          <h1>Hello</h1>
        </DialogTitle>
      </Dialog>
    </Container>
  );
}

export default Filter;
