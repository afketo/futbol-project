import { useAuthHeader, useSignOut } from "react-auth-kit";
import loginService from "../services/login";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Test({ children }) {
  const [tokenOk, setTokenOk] = useState(true);
  const token = useAuthHeader()
  const signOut = useSignOut();
  const navigate = useNavigate()

  
  const respuesta = async () => {
    try{
        const data = await loginService.verifyToken(token())
        setTokenOk(true)
    }
    catch(err) {
        console.log('error: ', {err});
    }
  }

  const otro = respuesta()
  console.log(otro);
  
  return tokenOk ? children : signOut()
}

export default Test;
