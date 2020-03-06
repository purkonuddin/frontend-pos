import React, {Component} from 'react';
import { Button, Container, Form, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { connect } from "react-redux";
// import { loginUser } from "../redux/actions/user";

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

  // onSubmitForm = (e)=>{
  //   this.props.dispatch(loginUser(this.state));
  //   this.props.history.push('/');
  //
  //   e.preventDefault();
  // }

  onSubmitForm = async (e)=>{
    e.preventDefault();
     await axios.post("http://localhost:8080/api/user/login",{id:this.state.username, password:this.state.password})
    .then(respone => {
      if (respone.data.message === "Login Success!") {
        this.setState({
          loggedIn: true,
          errMsg: respone.data.message
        })
        localStorage.setItem("usertoken", respone.data.user.token);
        localStorage.setItem("username", respone.data.user.name);
        localStorage.setItem("userid", respone.data.user.id);

        this.props.history.push('/');
        // window.location.reload();
      } else {
        this.setState({errMsg: respone.data.message})
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
    // console.log(this.props.user);
  return (
    <Container>
      <Row>
        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {this.state.errMsg}
          </p>
        </Alert>
      </Row>
      <Row className="justify-content-md-center">
      <Form onSubmit={() => this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.inputChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.inputChange}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit"  onClick={this.onSubmitForm}>
          Submit
        </Button>
      </Form>
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
