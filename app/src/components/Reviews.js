import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { usePost } from "../hooks/usePost";

function Reviews(props) {
  const [data, isPending, error] = UseFetch(
    `/api/products/reviews/${props.id}`
  );

  const initialReviewState = {
    productId: props.id,
    rating: 0,
    content: "",
    userId: "",
  };

  const [review, setReview] = useState(initialReviewState);

  const { user } = useAuthContext();

  const [postReview, isPostPending, postError] = usePost(
    "/api/products/reviews/"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      review.userId = user._id;
    }
    await postReview(review);
    setReview(initialReviewState);
  };

  return (
    <div>
      {user && !isPostPending && (
        <div>
          <h2>Write a review</h2>
          <form onSubmit={handleSubmit}>
            <h2>Rating : {review.rating}</h2>
            0
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={review.rating}
              onChange={(e) =>
                setReview({ ...review, rating: Number(e.target.value) })
              }
            />
            5
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={review.content}
              placeholder="Your thoughts"
              onChange={(e) =>
                setReview({ ...review, content: e.target.value })
              }
            ></textarea>
            <button>Submit</button>
            {postError && <div>{postError}</div>}
          </form>
        </div>
      )}
      {isPostPending && <div>Submitting your review...</div>}
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && (
        <div>
          <h1>Reviews ({data.length})</h1>
          {data.map((r) => (
            <li key={r._id}>
              <div>
                <b>
                  {r.userName} ({r.userId}) [{r.rating}]
                </b>
                {user && r.userId === user._id && (
                  <>
                    <Link>Edit</Link> <Link>Delete</Link>
                  </>
                )}
                <p>{r.content}</p>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reviews;