import React, {Component} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {connect} from 'react-redux';
import axios from 'axios';

class Category extends Component {
  constructor(){
    super()
    this.state={
      dataCategory:[],
      dataPost:{
        id:0,
        name_category:''
      },
      edit:false,
      deleteres:[]
    }
  }

  clearData=()=>{
    let newdatapost = {...this.state.dataPost}
    newdatapost['id']='';
    newdatapost['name_category']='';
    this.setState({
      dataPost:newdatapost
    });
  }

  getDataId=(e)=>{
    axios.get(`${process.env.REACT_APP_URL_API}category/${e.target.value}`)
      .then(res=>{
        // console.log(res.data);
        this.setState({
          dataPost:res.data.data[0],
          edit:true
        })
      })
  }

  onSubmitForm=()=>{
    if(this.state.edit===false){
      axios.post(`${process.env.REACT_APP_URL_API}category`, this.state.dataPost)
      .then(()=>{
        this.reloadData();
        this.clearData();
      })
    }else{
      axios.patch(`${process.env.REACT_APP_URL_API}category/${this.state.dataPost.id}`, this.state.dataPost)
      .then(()=>{
        this.reloadData();
        this.clearData();
      })
    }
  }

  inputChange=(e)=>{
    let newdatapost={...this.state.dataPost};
    if (this.state.edit===false) {
      newdatapost['id']=new Date().getTime();
    }

    newdatapost[e.target.name]=e.target.value;

    this.setState(
      {
        dataPost: newdatapost
      },
      ()=>console.log(this.state.dataPost))
  }

  handleRemove=(e)=>{
    // console.log(e.target.value);
    
    axios.delete(`${process.env.REACT_APP_URL_API}category/${e.target.value}`)
    .then((response)=>{
      // console.log(response.data);
      let deleteres=[];
      deleteres['status']=response.data.status;
      deleteres['message']=response.data.message;
      deleteres['result']=response.data.result;

      this.setState({
        deleteres:deleteres
      },
      ()=>console.log(this.state.deleteres))
      this.reloadData();
    })
  }

  reloadData=()=>{
    axios.get(`${process.env.REACT_APP_URL_API}category/`)
    .then(res=>{
      // console.log(res.data);
      this.setState({
        dataCategory:res.data.data,
        edit:false
      })
    })
  }

  componentDidMount(){
      this.reloadData();
  }

  render(){
    // console.log(this.state.dataCategory);
    return(
      <Container fluid>
        <Row  className="justify-content-md-center">
          <Col className="col-sm-12 col-md-5 col-lg-6">
          <Card className='m-3'>
            <Card.Header>
            Add / Update Category
            </Card.Header>

            <Card.Body>
            <input className="rounded p-1 text-capitalize" type='text' value={this.state.dataPost.name_category} name='name_category' placeholder='category' onChange={this.inputChange}/>
            <button className="rounded p-1 btn btn-sm btn-success ml-n5" type='submit' onClick={this.onSubmitForm}>Save </button>
            </Card.Body>
            <Card.Footer>
            <code>Select item at list category to edit and remove it</code>
            </Card.Footer>
          </Card>
          </Col>

          <Col className="col-sm-12 col-md-5 col-lg-6">
          <Card className='m-3'>
            <Card.Header>
            List Category
            </Card.Header>
            <Card.Body>
            <table>
              <thead>
                <tr className='list-group-item-warning'><th className='p-2'>#</th><th className='w-50'>Category</th><th>Actions</th></tr>
              </thead>
              <tbody>
              {
                this.state.dataCategory.map((category, index)=>{
                  return(
                    <tr key={index}>
                      <td>{index+1}{') '}</td>
                      <td className='text-capitalize'>{category.name_category}</td> 
                      <td>
                      <span>
                          <button className="btn btn-sm btn-danger" value={category.id} onClick={this.handleRemove}  data-toggle="modal" data-target="#hapusModal">delete</button>
                          <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" value={category.id} onClick={this.getDataId}>edit</button>
                      </span>
                      </td>
                    </tr>
                  );
                })
              }
              </tbody>
              <tfoot></tfoot>
              </table>
              </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
        <div className="modal fade" id="hapusModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">response : {this.state.deleteres.status}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body alert-info"> 
              
              {this.state.deleteres.message}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">ok</button> 
              </div>
            </div>
          </div>
        </div>

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
