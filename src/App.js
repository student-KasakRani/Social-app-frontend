import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [page, setPage] = useState("login");

  if (!user) {
    return (
      <div>
        {page === "login" ? (
          <>
            <Login setUser={setUser} />
            <button onClick={() => setPage("signup")}>Go Signup</button>
          </>
        ) : (
          <>
            <Signup />
            <button onClick={() => setPage("login")}>Go Login</button>
          </>
        )}
      </div>
    );
  }

  return <Feed user={user} setUser={setUser} />;
}

export default App;


        
