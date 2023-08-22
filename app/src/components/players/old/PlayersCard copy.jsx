import dateFormat from "dateformat";
import { useAuthHeader } from "react-auth-kit";
import {
  Card,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import playerService from "../../../services/players";
import ProfilePicture from "../../assets/images/default_player.png";
import { useState } from "react";

const Players = ({ players }) => {
  const [player, setPlayer] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const token = useAuthHeader();

  const handleOnClick = async (id) => {
    try {
      const playerObject = await playerService.getPlayer(id, token());
      setPlayer(playerObject);
      onOpen();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 mx-2">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {player.name}
              </ModalHeader>
              <ModalBody>
                <p>Abriendo la ficha de {player.name}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
