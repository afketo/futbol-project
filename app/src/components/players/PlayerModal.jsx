import { useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/select";

import { UserIcon } from "../../assets/icons/UserIcon";
import useEscapeFirstRender from "../hooks/useEscapeFirstRender";
import playerService from "../../services/players";

const PlayerModal = ({ player, handlePlayerUpdated, handlePlayerRemoved }) => {
  const token = useAuthHeader();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [playerObject, setPlayerObject] = useState({});
  const [profilePicture, setProfilePicture] = useState({});
  const [image, setImage] = useState();
  const [isDragging, setIsDragging] = useState(false);

  // * Renderiza los cards con la información de los jugadores
  useEscapeFirstRender(() => {
    setPlayerObject({ ...playerObject, ...player });
    onOpen();
  }, player);

  // * Recoge los inputs del Modal y los guarda en playerObject
  const handleInput = (event) => {
    const { target } = event;
    console.log(target);
    const targetName = target.name;
    const targetValue = target.value;

    setPlayerObject({
      ...playerObject,
      [targetName]: targetValue,
    });
  };

  // * Recoge el input de la imagen del Modal
  const handlePlayerPicture = (event) => {
    setIsDragging(true);
    const files = event.target.files;
    console.log(files);
    if (files.length === 0) return; // No hay archivo

    // Realiza la previsualizacion en el Modal
    if (files[0].type.split("/")[0] === "image") {
      setProfilePicture({
        name: files[0].name,
        url: URL.createObjectURL(files[0]),
      });

      // Guardamos la imagen para subirla al  backend
      setImage(files[0]); // ! PARA LA IMAGEN DEL PLAYER
    } else {
      // TODO Controlar errores
      console.log("no es una imagen");
      return;
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();

    setIsDragging(true);
    const files = event.dataTransfer.files;

    if (files.length === 0) return; // No hay archivo
    // Realiza la previsualizacion en el Modal
    if (files[0].type.split("/")[0] === "image") {
      setProfilePicture({
        name: files[0].name,
        url: URL.createObjectURL(files[0]),
      });

      // Guardamos la imagen para subirla al  backend
      setImage(files[0]); // ! PARA LA IMAGEN DEL PLAYER
    } else {
      // TODO Controlar errores
      console.log("no es una imagen");
      return;
    }
  };

  // * Cuando se ejecuta la X del Modal de la imagen, realiza el reseteo de States
  const deleteProfilePicture = () => {
    setIsDragging(false);
    setProfilePicture({});
  };

  // * Maneja el borrado de jugador
  const handleRemoveInput = async (id) => {
    const removedPlayer = await playerService.remove(id);
    if (removedPlayer === 204) {
      handlePlayerRemoved(id);
      onClose(); // Cerramos Modal
    }
  };

  // * Maneja el submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(); // ! PARA LA IMAGEN DEL PLAYER
    formData.append("image", image); // ! PARA LA IMAGEN DEL PLAYER
    formData.append("id", playerObject.id); // ! PARA LA IMAGEN DEL PLAYER

    try {
      const updatedPlayer = await playerService.update(
        playerObject.id,
        playerObject,
        isDragging, // ! Indicamos a la api que tenemos una imagen nueva
        formData, // ! Enviamos el form de la imagen
        token()
      );

      onClose(); // Cerramos Modal
      handlePlayerUpdated(updatedPlayer); // Enviamos a PlayersCard la nueva info del jugador
      setIsDragging(false);
      setProfilePicture({});
    } catch (err) {
      // TODO handling error
      console.log("error updating: ", err);
    }
  };

  return (
    <Modal
      size="4xl"
      backdrop="blur"
      className="bg-green-50"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <ModalHeader className="flex-col items-center justify-center text-2xl">
                {player.name} {player.firstname} {player.lastname}
                <p className="mt-2 text-base font-normal">{player.alias}</p>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-5 grid-rows-3 gap-3">
                  <div
                    className="row-span-3 border border-3 border-dashed border-blue-300 bg-gray-50"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    {isDragging ? (
                      <div>
                        <span
                          onClick={() => deleteProfilePicture()}
                          className="cursor-pointer text-red-500 font-bold"
                        >
                          &times; {console.log(isDragging)}
                        </span>
                        <Image
                          src={profilePicture.url}
                          onChange={handlePlayerPicture}
                        />
                      </div>
                    ) : (
                      <div className="mt-5 text-center">
                        Arrastre foto o{" "}
                        <span>
                          <Input
                            id="picture"
                            type="file"
                            size="sm"
                            onChange={handlePlayerPicture}
                            name="picture"
                          />
                        </span>
                      </div>
                    )}
                  </div>
                  <Input
                    type="text"
                    variant="underlined"
                    label="Nombre"
                    isRequired
                    value={playerObject.name}
                    onChange={handleInput}
                    name="name"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Primer apellido"
                    value={playerObject.firstname}
                    onChange={handleInput}
                    name="firstname"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Segundo apellido"
                    value={playerObject.lastname}
                    onChange={handleInput}
                    name="lastname"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Alias"
                    value={playerObject.alias}
                    onChange={handleInput}
                    name="alias"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Nacionalidad"
                    value={playerObject.nationality}
                    onChange={handleInput}
                    name="nationality"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="DNI"
                    value={playerObject.card_identificacion}
                    onChange={handleInput}
                    name="card_identificacion"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Fecha nacimiento"
                    value={playerObject.birthday}
                    onChange={handleInput}
                    name="birthday"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Lugar nacimiento"
                    value={playerObject.birthplace}
                    onChange={handleInput}
                    name="birthplace"
                  />
                  {/* <Input

                    id="picture"
                    type="file"
                    name="playerImage"
                    onChange={handlePlayerPicture}
                    value={playerObject.picture}
                    name="picture"
                  /> */}
                  <Input
                    type="text"
                    variant="underlined"
                    label="Club"
                    value={playerObject.club}
                    onChange={handleInput}
                    name="club"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Club fecha inicio"
                    value={playerObject.club_start}
                    onChange={handleInput}
                    name="club_start"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Club fecha fin"
                    value={playerObject.club_end}
                    onChange={handleInput}
                    name="club_end"
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Club anterior"
                    value={playerObject.club_previous}
                    onChange={handleInput}
                    name="club_previous"
                  />
                </div>
                <div>
                  <hr />
                  Mas info
                  <hr />
                </div>
                <div className="grid grid-cols-5 grid-rows-3 gap-3">
                  <Select
                    variant="underlined"
                    label="Posición"
                    className="max-w-xs"
                    name='position'
                    selectedKeys={[playerObject.position]}
                    onChange={handleInput}
                  >
                    <SelectItem key="Portero" value="Portero">
                      Portero
                    </SelectItem>
                    <SelectItem key="Defensa" value="Defensa">
                      Defensa
                    </SelectItem>
                    <SelectItem key="Centrocampista" value="Centrocampista">
                      Centrocampìsta
                    </SelectItem>
                    <SelectItem key="Delantero" value="Delantero">
                      Delantero
                    </SelectItem>
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="danger"
                  variant="bordered"
                  onClick={() => handleRemoveInput(playerObject.id)}
                  startContent={<UserIcon />}
                  className="hover:bg-red-100"
                >
                  Borrar
                </Button>
                <Button color="primary" type="submit">
                  Actualizar
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PlayerModal;
