import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import useEscapeFirstRender from "../hooks/useEscapeFirstRender";
import { useState } from "react";

const PlayerModal = ({ player }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [initialValue, setInitialValue] = useState({
    name: '',
	firstname: '',
	lastname: '',
	alias: '',
	card_identificacion: '',
    phpt: '',
	birthday: '',
	birthplace: '',
	nationality: '',
    club: '',
	club_start: '',
	club_end: '',
	club_previous: '',
  });

  useEscapeFirstRender(() => {
    setInitialValue({ ...initialValue, ...player });
    onOpen();
  }, player);

  const handleInput = (event) => {
    const { target } = event;
    const targetName = target.name;
    const targetValue = target.value;

    
    setInitialValue({ ...initialValue, ...player });
    setInitialValue({
      ...initialValue,
      [targetName]: targetValue,
    });
  };

  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {player.name}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-5 grid-rows-3 gap-3">
                <div className="row-span-3">Foto</div>
                <Input
                  type="text"
                  variant="underlined"
                  label="Nombre"
                  isRequired
                  value={initialValue.name}
                  onChange={handleInput}
                  name="name"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Primer apellido"
                  value={initialValue.firstname}
                  onChange={handleInput}
                  name="firstname"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Segundo apellido"
                  value={initialValue.lastname}
                  onChange={handleInput}
                  name="lastname"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Alias"
                  value={initialValue.alias}
                  onChange={handleInput}
                  name="alias"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Nacionalidad"
                  value={initialValue.nationality}
                  onChange={handleInput}
                  name="nationality"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="DNI"
                  value={initialValue.card_identificacion}
                  onChange={handleInput}
                  name="card_identificacion"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Fecha nacimiento"
                  value={initialValue.birthday}
                  onChange={handleInput}
                  name="birthday"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Lugar nacimiento"
                  value={initialValue.birthplace}
                  onChange={handleInput}
                  name="birthplace"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Club"
                  value={initialValue.club}
                  onChange={handleInput}
                  name="club"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Club fecha inicio"
                  value={initialValue.club_start}
                  onChange={handleInput}
                  name="club_start"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Club fecha fin"
                  value={initialValue.club_end}
                  onChange={handleInput}
                  name="club_end"
                />
                <Input
                  type="text"
                  variant="underlined"
                  label="Club anterior"
                  value={initialValue.club_previous}
                  onChange={handleInput}
                  name="club_previous"
                />
              </div>
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
  );
};

export default PlayerModal;
