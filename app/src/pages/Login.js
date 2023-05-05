import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    await login(email, password);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <h1>Logging in...</h1>}
      {!isPending && !user && (
        <form onSubmit={handleSubmit}>
          <h3>Log In</h3>

          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button disabled={isPending}>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
