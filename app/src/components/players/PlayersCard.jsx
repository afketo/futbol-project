import dateFormat from "dateformat";
import { useAuthHeader } from "react-auth-kit";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const { VITE_BACKEND_PROTOCOL, VITE_BACKEND_URL, VITE_BACKEND_PORT } =
  import.meta.env;
const backendUrl =
  VITE_BACKEND_PROTOCOL + "://" + VITE_BACKEND_URL + ":" + VITE_BACKEND_PORT;
const backendUrlImages = backendUrl + "/images/";

import PlayerModalAdd from "./PlayerModalAdd";
import { UserIcon } from "../../assets/icons/UserIcon";
import playerService from "../../services/players";
import { useState } from "react";
import PlayerModal from "./PlayerModal";

const Players = ({ players, handlePlayerUpdated }) => {
  const [clicked, isClicked] = useState(false);

  const [player, setPlayer] = useState({});
  const token = useAuthHeader();

  const handleClick = () => {
    isClicked(!clicked);
  };

  const handlePlayerCreatedByModal = (newPlayerObject) => {
    handlePlayerUpdated(newPlayerObject);
  };

  const handleOnClick = async (id) => {
    try {
      const playerObject = await playerService.getPlayer(id, token());
      setPlayer(playerObject);
    } catch (err) {
      // TODO Error handling
      console.log(err);
    }
  };

  const handlePlayerUpdatedByModal = (newPlayerObject) => {
    handlePlayerUpdated(newPlayerObject);
  };

  return (
    <>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mx-2">
        <PlayerModal
          player={player}
          handlePlayerUpdated={handlePlayerUpdatedByModal}
        />
        <PlayerModalAdd
          isActive={clicked}
          handlePlayerUpdated={handlePlayerCreatedByModal}
        />

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
              // src={ProfilePicture}
              src={
                player.picture
                  ? backendUrlImages + player.picture
                  : backendUrlImages + "default_player.png"
              }
            />
            <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
              <small className="mr-auto w-min">
                {dateFormat(player.birthday, "dd/mm/yyyy")}
              </small>
              <strong>
                {player.name} {player.firstname}
              </strong>
              <small className="ml-auto" style={{ color: "red" }}>
                {player.position}
              </small>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 right-0 pr-2 pb-2 z-20">
        <Button
          color="success"
          className="hover:bg-green-400 hover:border-medium "
          startContent={<UserIcon />}
          onClick={() => handleClick()}
        >
          Añadir jugador
        </Button>
      </div>
    </>
  );
};

export default Players;
