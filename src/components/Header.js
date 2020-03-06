import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, Button, FormControl  } from 'react-bootstrap';


const Header =(props)=>{

  return(
    <Navbar bg="light" expand="sm" className="w-100 bg-white border-bottom">
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand href="#home" className="mr-auto ml-3"><i className="fa fa-bars"></i></Navbar.Brand>

         <Navbar.Brand href="#home" className="mr-auto">Sales of Point</Navbar.Brand>
         <Form inline>
          <Link to="/search"><i className="fa fa-search"></i></Link>
         </Form>
       </Navbar.Collapse>
     </Navbar>
  )
}

const stateApp=(state)=>{
  return {
    user:state.user
  }
}

export default connect(stateApp) (Header);
