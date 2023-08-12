import { NavLink } from "react-router-dom";
import { useAuthUser, useSignOut } from "react-auth-kit";
import {
  Navbar as NavbarUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

const Navbar = (props) => {
  const auth = useAuthUser();
  const signOut = useSignOut();

  return (
      <NavbarUI className="bg-green-100" isBordered position="sticky">
        <NavbarBrand>
          <p>CHANGEME LOGO</p>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <NavLink to="/players">Jugadores</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/teams">Equipos</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/competitions">Competiciones</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/methodology">Metodología</NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to="/guide">Guía</NavLink>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2" isDisabled>
                <p className="font-bold">{auth().username}</p>
              </DropdownItem>
              <DropdownItem key="settings">Preferencias</DropdownItem>
              <DropdownItem key="logout" className=" bg-rose-100" color="danger" onClick={() => signOut()}>
                Cerrar Sesion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarUI>
  );
};

export default Navbar;
