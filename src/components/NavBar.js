import React from 'react';
import {connect} from 'react-redux';
import { Container, Row, Card, Col, Media, Table,Nav, Form, Image, Header, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar =(props)=>{
  // console.log('navbar :', props);
  const keluar = e => {
    // e.preventDefault();
    // Axios.post(
    //   "http://localhost:8080/api/user/login",
    //   { token: localStorage.usertoken },
    //   {
    //     headers: { "x-access-token": localStorage.usertoken }
    //   }
    // ).then(() => {
      localStorage.removeItem("usertoken");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      window.location.reload();
    // });
  };

  return(
    <div>
      <Link to="/home" className="m-2 mt-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/fork.png')} alt="Fork" /></Link>
      <Link to="/chart" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/clipboard.png')} alt="order"/></Link>
      <Link to="/products" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/add.png')} alt="add" /></Link>
      <Link to="/category" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><i className="fa fa-tags"></i> </Link>
      <Link to="/category" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><i className="fa fa-user"></i></Link>
      <Link to="/keluar" className="m-2 p-2 card" onClick={e=>keluar(e)} style={{display: 'inline-block', border:'0px'}}><i className="fa fa-sign-out"> </i></Link>
    </div>
  )
}

const stateApp=(state)=>{
  return {
    user:state.user
  }
}

export default connect(stateApp) (NavBar);

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
