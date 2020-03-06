import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

const Card =(props)=>{
  return(
    <div className="card">
      keranjang belanja
    </div>
  )
}

const stateApp=(state)=>{
  return {
    user:state.user
  }
}

export default connect(stateApp) (Card);

// // src/components/NavBar.js
//
// import React from "react";
// import { useAuth0 } from "../react-auth0-spa";
// import { Link } from "react-router-dom";
//
// const NavBar = () => {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//
//   return (
//     <div>
//       {!isAuthenticated && (
//         <button onClick={() => loginWithRedirect({})}>Log in</button>
//       )}
//
//       {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
//
//       {isAuthenticated && (
//         <span>
//           <Link to="/">Home</Link>&nbsp;
//           <Link to="/profile">Profile</Link>
//         </span>
//       )}
//     </div>
//
//   );
// };
//
// export default NavBar;
