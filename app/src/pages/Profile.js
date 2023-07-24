import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

function Profile() {
  const { user } = useAuthContext();

  return (
    <div>
      {JSON.stringify(user)}
      <Link to="/orders">My orders</Link>
    </div>
  );
}

export default Profile;
