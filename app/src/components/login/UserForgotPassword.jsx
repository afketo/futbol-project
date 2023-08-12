import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
  Input
} from "@nextui-org/react";

import { MailFilledIcon } from "../../assets/icons/MailFilledIcon";

const UserForgotPassword = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [ username, setUsername ] = useState("");

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <Link className="cursor-pointer font-thin" onPress={onOpen}>
        Recuperar contraseña
      </Link>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reiniciar contraseña
              </ModalHeader>
              <ModalBody>
                <p className="font-light">
                  Introduce tu email y te enviaremos las instrucciones de como reiniciar la contraseña.
                </p>
                {/* <form onSubmit={handleSubmit}> */}
                <form>
                  <Input
                    isRequired
                    type="text"
                    variant="bordered"
                    label="Usuario"
                    startContent={
                      <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    onChange={handleInputUsername}
                    value={username}
                  />
                </form>
              </ModalBody>
                <Button className="container w-32 bg-lime-700 font-semibold hover:bg-lime-600 mt-2" color="primary" onPress={onClose}>
                  Recuperar
                </Button>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserForgotPassword;
