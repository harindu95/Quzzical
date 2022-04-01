import Login from "./Login";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoginStatus] = useState(false);

  function login(name) {
    setUsername(name);
    setLoginStatus(true);
  }

  if (loggedIn) {
    return <Main />;
  } else {
    return <Login login={login} />;
  }
}

export default App;
