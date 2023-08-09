import { useState } from "react"
import loginService from '../services/login'

const UserForm = ({ loggedUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleInputUsername = (event) => {
    setUsername(event.target.value)
  }
  
  const handleInputPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      loggedUser(user)
      setUsername('')
      setPassword('')
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div>Username: <input type="text" onChange={handleInputUsername} value={username} /></div>
          <div>Password: <input type="password" onChange={handleInputPassword} value={password} /></div>
          <div><button>Login</button></div>
        </form>
      </div>
  )
}

export default UserForm