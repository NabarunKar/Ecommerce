import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

function Reviews(props) {
  const { user } = useAuthContext();

  return (
    <div>
      {props.data && (
        <div>
          {props.data.map((r) => (
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
