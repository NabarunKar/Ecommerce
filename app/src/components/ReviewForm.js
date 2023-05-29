import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePost } from "../hooks/usePost";

function ReviewForm(props) {
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
    </div>
  );
}

export default ReviewForm;
