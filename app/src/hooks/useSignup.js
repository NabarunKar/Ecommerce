import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);

    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    

    const json = await response.json();

    if (!response.ok) {
      setIsPending(false);
      setError(json.message);
      console.log(json.message);
    }
    if (response.ok) {
      // save the user into localstorage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsPending(false);
    }
  };

  return { signup, isPending, error };
};


// .then((res) => {
    //   if (!res.ok) {
    //     throw Error(res.error);
    //   }
    //   return res.json();
    // })
    // .then((data) => {
    //   localStorage.setItem("user", JSON.stringify(data));
    //   dispatch({ type: "LOGIN", payload: data });
    //   setIsPending(false);
    //   setError(null);
    // })
    // .catch((err) => {
    //   setIsPending(false);
    //   setError(err.message);
    // });