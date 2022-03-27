import "./Login.css";

export default function Login() {
  return (
    <div className="Login">
      <section className="login-section">
        <h1> Quizzical </h1>
        <label htmlFor="username">Username</label>
        <input id="username"></input>
        <button>Login</button>
        <div className="padding"></div>
      </section>
    </div>
  );
}
