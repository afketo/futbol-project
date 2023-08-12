import { useState } from "react";
import loginService from "../../services/login";
import { Input, Button } from "@nextui-org/react";

import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";
import { MailFilledIcon } from "../../assets/icons/MailFilledIcon";
import { PasswordFilledIcon } from "../../assets/icons/PasswordFilledIcon";
import { LoginIcon } from "../../assets/icons/LoginIcon";
import UserForgotPassword from "./UserForgotPassword";

const UserForm = ({ loggedUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInputemail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ email, password });
      loggedUser(user);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-96 p-6 shadow-lg bg-white rounded-lg">
      <div className="text-center mb-10">
        <h1>CHANGEME LOGO</h1>
        <h1 className="mt-3 font-bold">Iniciar sesión</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            isRequired
            type="text"
            variant="bordered"
            label="Email"
            startContent={
              <MailFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            onChange={handleInputemail}
            value={email}
          />
          <Input
            type={isVisible ? "text" : "password"}
            variant="bordered"
            label="Contraseña"
            className="mt-2"
            startContent={
              <PasswordFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            onChange={handleInputPassword}
            value={password}
          />
          <div className="text-center mt-3">
            <Button
              className="bg-lime-700 font-semibold hover:bg-lime-600"
              color="primary"
              type="submit"
              size="md"
              endContent={<LoginIcon />}
            >
              Acceder
            </Button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-2 flex-nowrap mt-5 items-center">
        <UserForgotPassword />
        <span className="ml-auto font-thin text-sm">ayuda@changeme.com</span>
      </div>
    </div>
  );
};

export default UserForm;
