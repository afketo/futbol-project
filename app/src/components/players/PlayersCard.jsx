import dateFormat from "dateformat";
import { useAuthHeader } from "react-auth-kit";
import {
  Card,
  CardFooter,
  Image
} from "@nextui-org/react";

import playerService from "../../services/players";
import ProfilePicture from "../../assets/images/default_player.png";
import { useState } from "react";
import PlayerModal from "./PlayerModal";

const Players = ({ players }) => {
  const [player, setPlayer] = useState({});
  const token = useAuthHeader();

  const handleOnClick = async (id) => {
    try {
      const playerObject = await playerService.getPlayer(id, token());
      setPlayer(playerObject);
    } catch (err) {
      // TODO Error handling
      console.log(err);
    }
  };

  return (
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mx-2">     

      <PlayerModal player={player}/>

      {players.map((player) => (
        <Card
          key={player.id}
          isFooterBlurred
          radius="lg"
          className="border-none mx-1 items-center mb-2"
          isPressable
          onClick={() => handleOnClick(player.id)}
        >
          <Image
            alt={player.name}
            className="object-cover mb-5 pt-1"
            width={200}
            src={ProfilePicture}
            slots="entro"
          />
          <CardFooter
            slots="entro"
            className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10"
          >
            <small className="mr-auto w-1/3">
              {dateFormat(player.birthday, "dd/mm/yyyy")}
            </small>
            <strong className="w-1/3">{player.name}</strong>
            <small className="ml-auto" style={{ color: "red" }}>
              {player.position}
            </small>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Players;
