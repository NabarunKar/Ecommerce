import React from "react";
import UseFetch from "../hooks/useFetch";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

function ProductItem(props) {
  const productData = props.data;
  const [data, isPending, error] = UseFetch(
    `/api/products/${productData.productId}`
  );
  return (
    <>
      {data && (
        <ListItem>
          <ListItemAvatar>
            <Avatar src={data.thumbnail}></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={data.title}
            secondary={`${
              productData.color ? `COLOR ${productData.color}` : ""
            } ${productData.size ? `SIZE ${productData.size}` : ""} ${
              productData.quantity ? `QTY ${productData.quantity}` : ""
            }`}
          />
        </ListItem>
      )}
    </>
  );
}

export default ProductItem;
