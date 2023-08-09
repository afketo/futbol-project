import { useState, useEffect } from 'react'
import playerService from './services/players'
import PlayerForm from './components/PlayerForm'
import Players from './components/Players'
import UserForm from './components/UserForm'

function App() {
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState({})

  // https://testapi.io/dashboard
  useEffect(() => {
    playerService
      .getAll()
      .then(initialPlayers => {
        setPlayers(initialPlayers)
      })
  }, [])

  useEffect(() => {
    const userDataJSON = window.localStorage.getItem('userDataJSON')
    if (userDataJSON) {
      const user = JSON.parse(userDataJSON)
      setUser(user)
      playerService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser({})
    playerService.setToken('')
    window.localStorage.removeItem('userDataJSON')
  }

  const getLoggedUser = (userObject) => {    
      setUser(userObject)
      playerService.setToken(userObject.token)
      window.localStorage.setItem('userDataJSON', JSON.stringify(userObject))
  }

  const setPlayerObject = (playerObject) => {
    setPlayers([...players, playerObject])
  }

  if (!user.token) {
    return (
      <div>
        <h1>Login</h1>
        <UserForm 
          loggedUser={getLoggedUser}
        />
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Add new player</h1>
        <PlayerForm 
          onSubmit={setPlayerObject} 
          onClickLogout={handleLogout}
        />
        <h1>Players</h1>
        <Players players={players} />
      </div>
    )
  }
}

export default App
