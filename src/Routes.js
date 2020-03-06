import React from "react";
import { Container, Row, Card, Col, Media, Table,Nav, Form, Image, Header, Pagination } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {connect} from 'react-redux';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Cards from './components/Card';
import Headers from './components/Header';
import App from './components/App';
import Home from './components/Home';
import Products from './components/Products';
import Category from './components/Category';
import Chart from './components/Chart';
import Story from './components/Story';
import Search from './components/Search';
// localStorage.setItem('usertoken', 'usertoken');

const Routes =(props)=> {
  if (localStorage.usertoken === undefined) {
    return(
      <Router>
        <Route path="/" exact component={App}/>
        <Route path="/login" component={Login}/>
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
          <Route path="/chart" component={Chart}/>
          <Route path="/story" component={Story}/>
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
