import React from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import { Navbar, Form } from 'react-bootstrap';


const Header =(props)=>{

  return(
    <Navbar bg="light" expand="sm" className="w-100 bg-white border-bottom">
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
       <Navbar.Collapse id="basic-navbar-nav" className='card-body carousel collapse navbar-collapse'>
        <Navbar.Brand href="#home" className="card-columns ml-3 navbar-brand"><i className="fa fa-bars"></i></Navbar.Brand>

         <Navbar.Brand href="#home" className="card-columns ml-3 navbar-brand mr-auto">Point Of Sales</Navbar.Brand>
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
