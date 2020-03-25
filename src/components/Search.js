import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Container, Row ,Card, Form, Button, FormControl } from 'react-bootstrap';
// import { Link } from "react-router-dom";

class Search extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: '',
     searchResponse:[]
    }
  }

  handleChange=(e)=>{
   this.setState({value: e.target.value});
  }

  handleSubmit=(e)=>{
   e.preventDefault();
   axios.post(`${process.env.REACT_APP_URL_API}search`,{cari:this.state.value}, {headers: {
     "x-access-token": localStorage.getItem("usertoken")
   }}).then((response) => {
     console.log(response);
     this.setState({
       searchResponse:response.data.result
     })
   })
   .catch(function (error) {
     console.log(error);
   })
  }
  render(){
    return(
      <Container fluid>
        <Row className="justify-content-md-center">
          <Form inline onSubmit={this.handleSubmit}>
            <FormControl type="text" placeholder="Search" name="cari" className=" mr-sm-2" value={this.setState.value} onChange={this.handleChange}/>
            <Button type="submit" value="search" variant="link" className="btn btn-link"><i className="fa fa-search"></i></Button>
          </Form>
        </Row>
        <Row  className="justify-content-md-center">
          {
            this.state.searchResponse.length !== 0 ? (
              <div>
                <Row  className="justify-content-md-center">
                <p>Result : <span>{this.state.searchResponse.length}</span> data found</p>
                </Row>
                <Row  className="justify-content-md-center">
                  {
                    this.state.searchResponse.map((data, index)=>{
                      return(
                        <Card style={{ width: '10rem' }} key={index}>
                          <Card.Img variant="top" src={data.image} />
                          <Card>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                              {data.price}
                            </Card.Text>
                            <Card.Text>
                            </Card.Text>
                          </Card>
                        </Card>
                      )
                    })
                  }
                  </Row>
                </div>
            ) : (
              <div>result ...!</div>
            )
          }
        </Row>
      </Container>
    )
  }
}

const stateApp=(state)=>{
  return {
    user:state.user
  }
}

export default connect(stateApp) (Search);
