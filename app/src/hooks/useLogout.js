import { useHistory } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const routerHistory = useHistory();
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    routerHistory.replace("/");
  };

  return { logout };
};
