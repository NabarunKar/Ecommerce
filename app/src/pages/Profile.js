import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {
  const { user } = useAuthContext();

  return <div>{JSON.stringify(user)}</div>;
}

export default Profile;
