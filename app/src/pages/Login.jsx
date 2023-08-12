import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";

import UserForm from "../components/login/UserForm";

const Login = () => {

  useEffect(() => {
    if (IsAuthenticated()) {
        navigate("/players")
    }
  }, []);

  const signIn = useSignIn();
  const IsAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();

  const getLoggedUser = (userObject) => {
    if (
      signIn({
        token: userObject.access_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: userObject,
      })
    ) {
      navigate("/players");
    } else {
      console.error("Something went wrong");
    }
  };

  return (
      // <div className="absolute inset-x-1/3 top-44 flex flex-col items-center">
      <div className="flex justify-center items-center h-screen bg-green-50">
        <UserForm loggedUser={getLoggedUser} />
      </div>
  );
  // }
};

export default Login;
