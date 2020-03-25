import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux';

import Login from './components/Login';
import NavBar from './components/NavBar'; 
import Headers from './components/Header';
import App from './components/App';
import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Charts from './components/Chart'; 
import Users from './components/Users';
import Search from './components/Search'; 

const Routes =(props)=> {
  if (localStorage.usertoken === undefined) {
    return(
      <Router>
        <Route path="/" exact component={App}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/home" exact component={Login}/>
        <Route path="/products" component={Login}/>
        <Route path="/category" component={Login}/>
        <Route path="/chart" component={Login}/>
        <Route path="/users" component={Login}/>
        <Route path="/search" component={Login}/>
      </Router>
    )
  }

  return (
    <Container fluid>
      <Router>
        <Row> <Headers/>
        </Row>
        <Row>
          <Col sm={12} md={1} lg={1} className="border-right bg-white">
          {
            <NavBar/>
          }

          </Col>
          <Col sm={11} lg={11}>
          <Route path="/" exact component={App}/>
          <Route path="/home" exact component={Home}/>
          <Route path="/products" component={Products}/>
          <Route path="/category" component={Category}/>
          <Route path="/chart" component={Charts}/>
          <Route path="/users" component={Users}/>
          <Route path="/search" component={Search}/> 
          </Col>
        </Row>
      </Router>
    </Container>

  );
}

const stateApp=(state)=>{
  return {
    products:state.products,
    user:state.user
  }
}

export default connect(stateApp) (Routes);
