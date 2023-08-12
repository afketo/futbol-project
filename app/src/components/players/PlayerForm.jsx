import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useAuthHeader } from 'react-auth-kit'

import playerService from '../../services/players'



const PlayerForm = ({ onSubmit }) => {
  const token = useAuthHeader()

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
      .create(playerObject, token())
      .then(returnedPlayer => {
        onSubmit(returnedPlayer)
        setNewName('')
        setNewBirthday('')
        setNewPosition('')
      })
    }

  return (
    <div className='mt-5'>
        <form onSubmit={handleSubmit}>
          <div>Player name: <Input type="text" onChange={handleInputPlayerName} value={newName} /></div>
          <div>Player birthday: <Input type="text" onChange={handleInputPlayerBirthday} value={newBirthday} /></div>
          <div>Player position: <Input type="text" onChange={handleInputPlayerPosition} value={newPosition} /></div>
          <div><Button onClick={handleSubmit}>Add Player</Button></div>
        </form>
      </div>
  )
}

export default PlayerForm