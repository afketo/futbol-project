import { NavLink } from "react-router-dom";
import { useAuthUser, useSignOut  } from "react-auth-kit";

const Navbar = () => {
  const auth = useAuthUser();
  const signOut = useSignOut()

  return (
    <div>
      <div>
        <NavLink to="/players">Players</NavLink>
        <NavLink to="/teams">Teams</NavLink>
      </div>
      <div>Welcome {auth().username}</div>
      <div><button onClick={() => signOut()}>Sign Out</button></div>
    </div>
  );
};

export default Navbar;
