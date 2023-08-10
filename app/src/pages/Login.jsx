import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import playerService from '../services/players'
import UserForm from '../components/UserForm'

const Login = () => {

  useEffect(() => {
    if (IsAuthenticated()) navigate('/players')
  }, [])

  const signIn = useSignIn()
  const IsAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  

  const getLoggedUser = (userObject) => {    
      if(signIn({
        token: userObject.token,
        expiresIn: 3600,
        tokenType: 'Bearer',
        authState: userObject
      }))
      {navigate('/players')}
      else{console.error('Something went wrong');}
  }

    return (
      <div>
        <h1>Login</h1>
        <UserForm 
          loggedUser={getLoggedUser}
        />
      </div>
    )
  // }
}

export default Login
