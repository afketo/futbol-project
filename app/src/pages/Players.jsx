import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { useAuthHeader } from "react-auth-kit";

import playerService from "../services/players";
// import PlayerForm from "../components/players/old/PlayerForm";
import PlayersCard from "../components/players/PlayersCard";
// import PlayersTable from "../components/players/PlayersTable";

const Player = () => {
  const token = useAuthHeader();

  const [players, setPlayers] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  // https://testapi.io/dashboard
  useEffect(() => {
    playerService.getAll(token()).then((data) => {
      setPlayers(data);
    });
  }, []);

  const setPlayerObject = (playerObject) => {
    setPlayers([...players, playerObject]);
  };

  const handlePlayerUpdated = (newPlayerObject) => {
    // TODO Realizar el update onSubmit
    // const indexOldPlayer = players.findIndex(player => player.id === newPlayerObject.id)
    const updatedPlayer = players.filter(
      (player) => player.id !== newPlayerObject.id
    );
    setPlayers([newPlayerObject, ...updatedPlayer]);
  };

  players.sort((a, b) => {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }

    // names must be equal
    return 0;
  });

  return (
    <div className="bg-green-50">
      <h1>Añadir jugador</h1>
      {/* <PlayerForm onSubmit={setPlayerObject} /> */}
      <h1>Jugadores</h1>
      <PlayersCard players={players} handlePlayerUpdated={handlePlayerUpdated} />

      {/* // TODO activar switch para hacer modo card|tabla
        <div className="flex justify-center items-center mb-5">
          Ficha <Switch isSelected={isSelected} onValueChange={setIsSelected}> Tabla </Switch>
        </div>
        {isSelected
        ? <PlayersTable users={players} />
        : <Players players={players} />} */}
    </div>
  );
};

export default Player;
