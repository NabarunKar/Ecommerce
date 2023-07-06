import React from "react";
import Filter from "../components/Filter";
import { useProductContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import BackButton from "../components/BackButton";
import { Box, Container, Grid } from "@mui/material";
import { useFilterContext } from "../contexts/FilterContext";

function Browse() {
  const { isLoading, error } = useProductContext();
  const { sortedProducts } = useFilterContext();
  return (
    <Container>
      <BackButton />
      <Filter />
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {sortedProducts && (
        <div>
          {!isLoading && <h1>Total: {sortedProducts.length}</h1>}
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              Grid
              container
              spacing={{ xs: 2, md: 3 }}
              // columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {sortedProducts.map((p) => (
                <ProductCard data={p}></ProductCard>
              ))}
            </Grid>
          </Box>
        </div>
      )}
    </Container>
  );
}

export default Browse;
