import React, {Component} from 'react';
import { Button, Container, Row, Col, Media } from 'react-bootstrap';
import {connect} from 'react-redux';

class Category extends Component {
  render(){
    return(
      <Container>
          <Row>
            <Col>
              <Media>
                ok
              </Media>
            </Col>
          </Row>
        </Container>
    );
  }
}

const stateApp=(state)=>{
  return {
    user:state.user,
    products:state.products
  }
}

export default connect(stateApp) (Category);
