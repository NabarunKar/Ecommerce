import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, error, isPending } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user);
    await signup(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name</label>
      <input
        type="text"
        onChange={(e) =>
          setUser((prevState) => ({ ...prevState, name: e.target.value }))
        }
        value={user.name}
      />

      <label>Email</label>
      <input
        type="email"
        onChange={(e) =>
          setUser((prevState) => ({ ...prevState, email: e.target.value }))
        }
        value={user.email}
      />

      <label>Password</label>
      <input
        type="password"
        onChange={(e) =>
          setUser((prevState) => ({ ...prevState, password: e.target.value }))
        }
        value={user.password}
      />
      <button disabled={isPending}>SignUp</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default SignUp;
