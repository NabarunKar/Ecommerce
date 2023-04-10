import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);

    await login(email, password);
  };

  return (
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
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
