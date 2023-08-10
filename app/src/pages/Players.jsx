import { useState, useEffect } from 'react'
import playerService from '../services/players'
import PlayerForm from '../components/PlayerForm'
import Players from '../components/Players'

function Player() {
  const [players, setPlayers] = useState([])

  // https://testapi.io/dashboard
  useEffect(() => {
    playerService
      .getAll()
      .then(initialPlayers => {
        setPlayers(initialPlayers)
      })
  }, [])

  const setPlayerObject = (playerObject) => {
    setPlayers([...players, playerObject])
  }
    return (
      <div>
        <h1>Add new player</h1>
        <PlayerForm 
          onSubmit={setPlayerObject} 
        />
        <h1>Players</h1>
        <Players players={players} />
      </div>
    )
}

export default Player
