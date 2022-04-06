import { useState } from "react";
import "./Login.css";

export default function Login({ login }) {
  const [username, setInput] = useState("");

  function handleClick(e) {
    login(username);
  }

  function onChange(e) {
    setInput(e.target.value);
  }

  return (
    <div className="Login">
      <section className="login-section">
        <h1> Quizzical </h1>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={onChange}></input>
        <button onClick={handleClick}>Login</button>
        <div className="padding"></div>
      </section>
    </div>
  );
}
