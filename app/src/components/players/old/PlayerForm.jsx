import { useState } from "react";
import { Button } from "@nextui-org/react";


import PlayerModalAdd from "../PlayerModalAdd";
import {UserIcon} from "../../../assets/icons/UserIcon";

const PlayerForm = ({ handlePlayerUpdated }) => {
  const [ clicked, isClicked ] = useState(false)

  const handleClick = () => {
    isClicked(!clicked)
  }

  const handlePlayerCreatedByModal = (newPlayerObject) => {
    handlePlayerUpdated(newPlayerObject)
  }

  return (
      <div className="fixed bottom-0 right-0 pr-2 pb-2 z-20">

        <PlayerModalAdd isActive={clicked} handlePlayerUpdated={handlePlayerCreatedByModal} />

        <Button 
          color="success" 
          className="hover:bg-green-400 hover:border-medium" 
          startContent={<UserIcon />}
          onClick={() => handleClick()}
        >
          Añadir jugador
        </Button>
      </div>
  );
};

export default PlayerForm;
