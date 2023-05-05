import React from "react";
import { useParams } from "react-router-dom";
import UseFetch from "../hooks/useFetch";
import BackButton from "./BackButton";

function Review() {
  const { id } = useParams();
  const [data, isPending, error] = UseFetch(
    `/api/products/reviews/review/${id}`
  );
  return (
    <div>
      <BackButton />
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <h1>
            {data.userName} <small>({data.userId})</small>
          </h1>
          <h2>Rating: {data.rating}</h2>
          <p>{data.content}</p>
        </div>
      )}
    </div>
  );
}

export default Review;
