import React, {Component} from 'react';
import { Button, Container, Form, Row, Alert, Card, Col } from 'react-bootstrap';
import axios from 'axios';
import { connect } from "react-redux";

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      user:[],
      username:'',
      password:'',
      errMsg : ''
    }
  }

  onSubmitForm = async (e)=>{
    e.preventDefault();
     await axios.post(`${process.env.REACT_APP_URL_API}user/login`,{id:this.state.username, password:this.state.password})
    .then(response => {
      if (response.data.message === "Login Success!") {
        this.setState({
          loggedIn: true,
          errMsg: response.data.message
        })
        localStorage.setItem("usertoken", response.data.user.token);
        localStorage.setItem("username", response.data.user.name);
        localStorage.setItem("userid", response.data.user.id);

        this.props.history.push('/');
        // window.location.reload();
      } else {
        this.setState({errMsg: response.data.message})
      }
    }).catch(this.setState({errMsg: 'Invalid username or password'}))
  }

  handleSubmit = (event)=> {
    event.preventDefault();

  }

  inputChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    console.log('props ->', this.props);
  return (
    <Container>
      {this.state.errMsg !== '' ? ( 
          <Row className="justify-content-md-center">
            <Alert variant="danger" dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                {this.state.errMsg}
              </p>
            </Alert>
          </Row> 
      ) : null
      }
      <Row className="justify-content-md-center justify-content-lg-start"> 
        <Col className='col-sm-10 col-lg-5'>
          <Card.Body>
            <Card.Img src={require('../assets/food-and-restaurant.png')} />
            <Card.Title>Food and restaurant</Card.Title>
          </Card.Body>
        </Col>
        <Col className='col-sm-10 col-lg-5 mt-lg-5 border-left'>
          <Form onSubmit={() => this.handleSubmit} className='mt-lg-5'>
            <Form.Group controlId="formBasicEmail" >
              <Form.Label>User Id</Form.Label>
              <Form.Control type="text" name="username" placeholder="your id" value={this.state.username} onChange={this.inputChange}/>
              <Form.Text className="text-muted">
                mamsukan id user / cashier / admin
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChange}/>
            </Form.Group>
            {/*<Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>*/}
            <Button variant="primary" type="submit"  onClick={this.onSubmitForm}>
              Submit
            </Button>
          </Form>
        </Col>
         
      </Row>
      <Row className="justify-content-md-center">
      <p>2020 &copy; point of sales</p>
      </Row>
    </Container>
  );
}
}

const stateApp=(state)=>{
  return {
    user:state.user,
  }
}

export default connect(stateApp) (Login);
