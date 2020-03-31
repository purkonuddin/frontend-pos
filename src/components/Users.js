import React, {Component} from 'react';
import { Container, Row, Col, Form, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import qs from "qs";

class Users extends Component {
  constructor(props){
    super(props);
    this.state={
      uploadimage:false,
      dataprofile:[],
      dataUser:[], 
      dataPost:{
        id:'',
        name:'',
        password:'',
        status:'',
        image:'',
      },
      confirmPassword: '',
      edit:false,
      deleteid: '',
      delete:false,
      message:null,
      selectedFile:null,
      loaded: 0,
    };
    this.fileInput = React.createRef();
  }
 
  password = (value) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if(strongRegex.test(value)) {
      this.setState({ message:'strong' })
    } else if(mediumRegex.test(value)) {
      this.setState({ message:'medium' })
    } else {
      this.setState({message: 'The password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character and must be eight characters or longer'});
    }

    let newdatapost = {...this.state.dataPost}
    newdatapost['password']=value;
    this.setState({
      dataPost:newdatapost 
    },()=>console.log(this.state.dataPost));
  } 

  handlePassword = (event) => {
    this.password(event.target.value);
    
  }

  handleConfirmPassword = (event) => {
    console.log(event.target.value);
    
    if (event.target.value !== this.state.dataPost.password) {
      this.setState({message:'handle confirm password: not match'});
    }else{
      this.setState({message:'', confirmPassword:event.target.value});
    }
  }

  onChangeHandler=event=>{
    var filetypeallowed = /(png|gif|jpg)/;
    var mimetype = filetypeallowed.test(event.target.files[0].name); // return boolean
    if (mimetype) {
    let newdatapost={...this.state.dataPost};
    newdatapost['image']=event.target.files[0];

    this.setState(
      {
        dataPost: newdatapost,
        message:''
      },
      ()=>console.log(this.state.dataPost))
    }else{
      this.setState({message:'file yang di ijinkan png, gif, jpg'},
      ()=>console.log(this.state.message))
    }
  }

  clearData=()=>{
    let newdatapost = {...this.state.dataPost}
    newdatapost['id']='';
    newdatapost['name']='';
    newdatapost['password']='';
    newdatapost['status']='';
    newdatapost['image']=''; 
    this.setState({
      dataPost:newdatapost,
      edit:false,
      message:''
    });
  }

  setDelete=(e)=>{
    this.setState({
      deleteid: e.target.value,
      delete:true
    })
  }

  // uploadImageUser=(e)=>{
  //   console.log(e.target.value);
    
  //   this.setState({uploadimage:!this.state.uploadimage});
  //   // this.getDataId;
  // }

  getDataId=async(e)=>{
    //  console.log('value : ',e.target.value);
    //  console.log('upload :',e.target.id==='btnupload');
     if (e.target.id==='btnupload') {
       this.setState({uploadimage:!this.state.uploadimage});
     }else{
      this.setState({uploadimage:false});
     }
     await axios.get(`${process.env.REACT_APP_URL_API}user/${e.target.value}`)
      .then((res)=>{
        // console.log('--',res.data[0]);
        this.setState({
          dataPost:res.data[0],
          confirmPassword:res.data[0].password,
          edit:true
        },()=>console.log(this.state.dataPost))
      })
  }
  
  onSubmitForm= e =>{
    if(this.state.edit===false){
      // console.log('state=',this.state.dataPost);
      const bodyFormData = qs.stringify({
        name: this.state.dataPost.name,
        status: this.state.dataPost.status,
        password: this.state.dataPost.password
      }); 

      axios.post(`${process.env.REACT_APP_URL_API}user/signup`, bodyFormData)
      .then((response)=>{
        console.log(response);
        
        this.reloadData();
        this.clearData();
      })
      .catch(err => {
        console.log(err)
        this.setState({message:err})
      })
    }else{
      // this.handleSubmit();
      if(this.state.uploadimage===true){
        // post user image   
        const formuser = new FormData()
        // formuser.set('name',this.state.dataPost.name)
        // formuser.set('password',this.state.dataPost.password)
        // formuser.set('status',this.state.dataPost.satatus) 
        formuser.append('image',this.state.dataPost.image)  
        // console.log('user->',this.state.dataPost);
        
        axios.post(`${process.env.REACT_APP_URL_API}user/${this.state.dataPost.id}`, formuser, {
          headers: {
            "Content-Type": "multipart/form-data" 
          }})
        .then((result)=>{
          this.reloadData();
          this.clearData();
          this.setState({
            edit:false
          });
          console.log(result);
        })
        .catch(err => {
          console.log(err)
          this.setState({message:err})
        })
      }else{
        const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
                
        if(mediumRegex.test(this.state.dataPost.password)===false){
          this.setState({message:'check your password'})
          console.log('gagal');
          
        }else if(this.state.dataPost.password !== this.state.confirmPassword){
          this.setState({message:'password not match'})
          console.log('gagal');
        }else{
          // patch user data
          axios.patch(`${process.env.REACT_APP_URL_API}user/${this.state.dataPost.id}`, this.state.dataPost)
          .then(()=>{
            this.reloadData();
            this.clearData();
            this.setState({edit:false, message:'...updated! ... silahkan logout dan login kembali.'})
            
          })
          .catch(err => {
            console.log(err)
            this.setState({message:err})
          })
        } 
      }
      
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
    axios.delete(`${process.env.REACT_APP_URL_API}user/${e.target.value}`)
    .then(()=>{this.reloadData()})
    .catch(err => {
      console.log(err)
      this.setState({deleteid:0})
    })
  }

  reloadData=()=>{
    axios.get(`${process.env.REACT_APP_URL_API}user/`)
    .then(res=>{
      // console.log(res.data.result);
      let myid = localStorage.getItem('username'); 

      this.setState({
        dataUser:res.data.result,
        edit:false,
        dataprofile: res.data.result.filter((items) => new RegExp(myid, "i").exec(items.name))
      })
      // filter data
      
    })
  }  

  componentDidMount(){
      this.reloadData(); 
  }

  render(){ 
    console.log(this.state.uploadimage);
    const uid = localStorage.userid;
  return (
    <Container fluid>
        <Row>
          <Col className="col-sm-12 col-md-12 col-lg-12">
          <Card className='mt-3 mb-5'>
            <Card.Header>
            Profile 
            </Card.Header>
            <Card.Body>  
              {this.state.dataprofile.map((profile, index)=>{
                return(
                  <div key={index}>
                    <div className='cardx'>
                      <Image className='cardx img-thumbnail' src={profile.image}/> 
                      <div className="justify-content-md-center" style={{cursor: 'pointer', position: 'absolute', background: 'rgba(0, 0, 0, .075)', color: '#f1f1f1', padding: '20px'}}>
                        <button className="btn btn-sm fa fa-edit btn-outline-warning" data-toggle="modal" data-target="#userModal" value={profile.id} id={'btnupload'} onClick={this.getDataId}>
                        image
                        {/* <span className="fa fa-edit btn-outline-warning" aria-hidden="true">upload</span> */}
                        </button>
                      </div>
                    </div>
                    <p className='text-capitalize'>Hallo, {profile.name}</p> 
                    <p className='text-capitalize'>Anda login sebagai {profile.status} </p> 
                    <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#userModal" value={profile.id} onClick={this.getDataId}>edit</button>
                  </div>
                )
              })}
            </Card.Body>
          </Card>
          </Col> 
          {uid === '1' ?(
            <Col className="col-sm-12 col-md-12 col-lg-12">
            <Card className='mt-3 mb-5'>
              <Card.Header>
              List User 
              <span>
              <button className="btn btn-sm btn-primary bg-primary cardx h-auto" data-toggle="modal" data-target="#userModal" onClick={this.clearData}>tambah</button>
              </span>
              </Card.Header>
              <Card.Body>
                <table>
                  <thead>
                  <tr className='list-group-item-warning'><th className='p-2'>#</th><th className='w-25'>Items</th><th>Description</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                {
                  this.state.dataUser.map((users, index)=>{
                    if (users.id.toString()===uid) {
                      return(
                        <tr key={index}><td>{''}</td></tr>
                      )
                    }else{
                      return(
                        <tr key={index}>
                          <td >{index}{') '}</td>
                          <td className='text-capitalize'>{users.name}</td>
                          <td>{users.status}</td>
                          <td>
                          <span> 
                              <button className="btn btn-sm btn-danger" value={users.id} onClick={this.setDelete}  data-toggle="modal" data-target="#hapususerModal">delete</button>
                              <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#userModal" value={users.id} onClick={this.getDataId}>edit</button>
                          </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                }
                </tbody>
                <tfoot></tfoot>
                </table>
                
                </Card.Body>
                <Card.Footer> 
                </Card.Footer>
              </Card>
              </Col>
          ):null} 
        </Row>
        <Row>
        <div className="modal fade" id="userModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">User</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
               {/* ------- */}
               <div className="modal-body">
                <Form>
                  <Form.Group as={Row} controlId="formPlaintextName">
                    <Form.Label column sm="2">
                      Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" name="name" value={this.state.dataPost.name} onChange={this.inputChange} placeholder="item name" />
                    </Col>
                  </Form.Group> 

                  <Form.Group as={Row} controlId="formPlaintextStock">
                    <Form.Label column sm="2">
                      password
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control type="password" name="password" onChange={this.handlePassword} placeholder="password" />
                    </Col>
                  </Form.Group>
                  {this.state.edit===true && this.state.uploadimage===false && 
                    <Form.Group as={Row} controlId="formPlaintextStock" className='has-warning'>
                      <Form.Label column sm="2">
                        confirm password
                      </Form.Label>
                      <Col sm="10">
                      <Form.Control type="password" name="comfirmpassword" onChange={this.handleConfirmPassword} placeholder="confirm password" />
                      </Col> 
                    </Form.Group>
                  }
                  {this.state.edit===true && this.state.uploadimage===true?(
                    <Form.Group as={Row} controlId="formPlaintextImage">
                      <Form.Label column sm="2">
                        Image
                      </Form.Label>
                      <Col sm="10">
                        {/* {
                          this.state.edit === true && */}
                          <><Form.Control type="file" name="image" ref={this.fileInput} onChange={this.onChangeHandler} /></>
                        {/* } */}
                        {
                          this.state.message
                        }

                        {
                          this.state.dataPost.image !== "" &&
                          <><Image className='card-img w-50' src={this.state.dataPost.image} /></>
                        }
                      </Col>
                    </Form.Group>
                  ):null} 

                  <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                    <Form.Label column sm="2">Status</Form.Label>
                    <Col sm="10">
                    <Form.Control name="status" value={this.state.dataPost.status} onChange={this.inputChange} as="select"  sm="10">
                      <>
                      {
                        this.state.edit === true &&
                        <option value={this.state.dataPost.status}>{this.state.dataPost.status}</option>
                      }
                      <option value={'admin'}>{'admin'}</option> 
                      <option value={'cashier'}>{'cashier'}</option> 
                      </>
                    </Form.Control>
                    </Col>
                  </Form.Group>
                  <p>{this.state.message}</p>
                </Form>
                <div className="alert alert-light" role="alert">
                  {this.state.msg}
                </div>
              </div>
              {/* ------- */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type='submit'  className="btn btn-primary" onClick={this.onSubmitForm}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <Row>
        <div className="modal fade" id="hapususerModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">delete</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              Hapus data ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Batal</button>
                <button type="button" className="btn btn-primary" value={this.state.deleteid} onClick={this.handleRemove}> Hapus</button>
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
    user:state.user 
  }
}

export default connect(stateApp) (Users);
