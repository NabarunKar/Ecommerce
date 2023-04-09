import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    await signup(email, password);

  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

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
      <button disabled={isPending}>SignUp</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default SignUp;
