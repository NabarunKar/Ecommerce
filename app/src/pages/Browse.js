import React from "react";
import Filter from "../components/Filter";
import { useProductContext } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { Box, Container, Grid } from "@mui/material";
import { useFilterContext } from "../contexts/FilterContext";

function Browse() {
  const { isLoading, error } = useProductContext();
  const { filteredProducts, searchValue } = useFilterContext();
  return (
    <Container>
      <Filter />
      <Container sx={{ position: "fixed" }}></Container>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {filteredProducts && (
        <div>
          {!isLoading && filteredProducts.length > 0 && (
            <Container sx={{ px: 0, my: 2 }}>
              (
              {
                filteredProducts.filter((ele) =>
                  ele.title.toLowerCase().includes(searchValue.toLowerCase())
                ).length
              }{" "}
              results)
            </Container>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{
                justifyContent: "center",
                mb: 10,
              }}
            >
              {filteredProducts
                .filter((ele) =>
                  ele.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((p) => (
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
