import { useState } from "react";

export const useDelete = (url) => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const deleteReq = async (token) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_PROXY}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      console.log(JSON.stringify(json));
      setIsPending(false);
    }

    return json;
  };

  return [deleteReq, isPending, error];
};
