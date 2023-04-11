import React from "react";
import UseFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [data, isPending, error] = UseFetch(`/api/users/${id}`);

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

export default Profile;
