import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Player from "./pages/Players";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <Navbar />
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https"}
      >
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider> */}
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https"}
      >
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route
            path={"/players"}
            element={
              <RequireAuth loginPath={"/login"}>
                <Navbar />
                <Player />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
