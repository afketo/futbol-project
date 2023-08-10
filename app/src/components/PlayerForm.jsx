import { useState } from 'react'
import playerService from '../services/players'

const PlayerForm = ({ onSubmit }) => {  
  const [newName, setNewName] = useState('')
  const [newBirthday, setNewBirthday] = useState('')
  const [newPosition, setNewPosition] = useState('')

  const handleInputPlayerName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputPlayerBirthday = (event) => {
    setNewBirthday(event.target.value)
  }

  const handleInputPlayerPosition = (event) => {
    setNewPosition(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const playerObject = {
      name: newName,
      birthday: newBirthday,
      position: newPosition
    }

    playerService
      .create(playerObject)
      .then(returnedPlayer => {
        onSubmit(returnedPlayer)
        setNewName('')
        setNewBirthday('')
        setNewPosition('')
      })
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div>Player name: <input type="text" onChange={handleInputPlayerName} value={newName} /></div>
          <div>Player birthday: <input type="text" onChange={handleInputPlayerBirthday} value={newBirthday} /></div>
          <div>Player position: <input type="text" onChange={handleInputPlayerPosition} value={newPosition} /></div>
          <div><button>Add Player</button></div>
        </form>
      </div>
  )
}

export default PlayerForm