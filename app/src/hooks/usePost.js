import { useState } from "react";

export const usePost = (url) => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const post = async (obj, token) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
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

  return [post, isPending, error];
};
