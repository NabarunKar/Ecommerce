import React from "react";
import UseFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

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
            <Link to={`/products/${data._id}`}>
              <Avatar src={data.thumbnail}></Avatar>
            </Link>
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
