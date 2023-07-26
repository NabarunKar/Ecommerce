import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useHistory } from "react-router-dom";

export const useSignup = () => {
  const routerHistory = useHistory();
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (user) => {
    setIsPending(true);
    setError(null);

    const response = await fetch(`${process.env.REACT_APP_PROXY}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

      routerHistory.replace("/");
    }
  };

  return { signup, isPending, error };
};
