import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";
import Login from "./pages/Login";
import Player from "./pages/Players";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Test from './components/Test'

function App() {
  return (
    <>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https"}
      >
        <Routes>
          <Route
            path={"/login"}
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path={"/players"}
            element={
              <RequireAuth loginPath={"/login"}>
                {/* <Test> */}
                  <Navbar />
                  <Player />
                {/* </Test> */}
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
