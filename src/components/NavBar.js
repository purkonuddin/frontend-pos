import React from 'react';
import {connect} from 'react-redux';
// import { Container, Row, Card, Col, Media, Table,Nav, Form, Image, Header, Pagination } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar =(props)=>{ 
  const keluar = e => { 
      localStorage.removeItem("usertoken");
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      window.location.reload(); 
  };

  return(
    <div>
      <Link to="/home" className="m-2 mt-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/fork.png')} alt="Fork" /></Link>
      <Link to="/chart" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/clipboard.png')} alt="order"/></Link>
      <Link to="/products" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/add.png')} alt="add" /></Link>
      <Link to="/category" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/categories.png')} alt="add" /></Link>
      <Link to="/users" className="m-2 p-2 card" style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/staff.png')} alt="users" /></Link>
      <Link to="/keluar" className="m-2 p-2 card" onClick={e=>keluar(e)} style={{display: 'inline-block', border:'0px'}}><img style={{width: '20px'}} src={require('../assets/logout.png')} alt="add" /></Link>
    </div>
  )
}

const stateApp=(state)=>{
  return {
    user:state.user
  }
}

export default connect(stateApp) (NavBar); 