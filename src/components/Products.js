import React, {Component} from 'react';
import { Container, Row, Col, Media, Table, Form, Image, Header, Pagination } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';

class Products extends Component {
  constructor(props){
    super(props);
    this.state = {
      products:[],
      deleteId:'',
      id:'',
      name:'',
      description:'',
      stock:'',
      price:'',
      image:'',
      id_category:'',
      category:'',
      msg:'',
      actions:'Add',
      selectedFile: null,
      loaded:''
    }
  }

  setValue=()=>{
    this.setState({
      id:'',
      name:'',
      description:'',
      stock:'',
      price:'',
      image:'',
      id_category:'',
      category:'',
      msg:'',
      actions:'Add',
      selectedFile: null,
      loaded:''
    })
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    // console.log(this.state.name);
    if (this.state.actions === 'update') {
      let product ={
        name:this.state.name,
        description:this.state.description,
        stock:this.state.stock,
        price:this.state.price,
        id_category:this.state.id_category
      }
      axios.patch(`http://localhost:8080/api/product/${this.state.id}`, product, {headers: { "x-access-token": localStorage.getItem("usertoken") }})
      .then((response) => {
        // console.log(response);
        if (response.data.data.affectedRows === 1) {
          this.setState({
            id:'',
            name:'',
            description:'',
            stock:'',
            price:'',
            image:'',
            id_category:'',
            category:'',
            msg:'Update success'
          })
        }
      })
      .catch(err=>console.log(err))
    }else{
        if (this.state.name === '' || this.state.description === '' || this.state.price === '' || this.state.stock === '' || this.state.selectedFile === '' || this.state.id_category === '') {
          this.setState({msg:'no data inputed'})
        }else {
          let product = new FormData()
           product.set('name',this.state.name)
           product.set('description',this.state.description)
           product.set('stock',this.state.stock)
           product.set('price',this.state.price)
           product.append('image',this.state.selectedFile)
           product.set('id_category',this.state.id_category)

          axios.post("http://localhost:8080/api/product/", product, {headers: {
            "x-access-token": localStorage.getItem("usertoken")
          }}).then((response) => {
            if (response.data.message.affectedRows === 1) {
              this.setState({
                id:'',
                name:'',
                description:'',
                stock:'',
                price:'',
                image:'',
                id_category:'',
                category:'',
                msg:'Add product success!'
              })
            }
          })
          .catch(err=>console.log(err))
        }
      }
  }

  deleteProduct=(deleteId)=>{
    // console.log(deleteId);
    axios.delete(`http://localhost:8080/api/product/${deleteId}`,{headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }})
    .then(res => {
      if(res.data.message=== "Product deleted"){
        this.setState({
          msg: `Data.affectedRows 1 #Id ${this.state.deletId}`
        })
      }
    });
  }

  confirmDeleteProduct=(data)=>{
    this.setState({
      deleteId:data.id
    })
  }

  editProduct=(data)=>{
    this.setState({
      id:data.id,
      name:data.name,
      description:data.description,
      stock:data.stock,
      price:data.price,
      image:data.image,
      id_category:data.id_category,
      category:data.name_category,
      actions:'update',
      msg:'',
    })
  }

  get_products=()=>{
    axios.get("http://localhost:8080/api/product",{headers: {
      "x-access-token": localStorage.getItem("usertoken")
    }}).then((response) => {
      // console.log(response);
      this.setState({
        products: response.data.result
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  componentDidMount(){
    this.get_products();
  }

  render(){
  return (
    <Container>
        <Row>
          <Col>
            <Media>
              <Media.Body>

              <Row>
                <Col xs={6} md={4}>
                <button><i className="fa fa-plus-square" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={this.setValue}> Add </i></button>
                </Col>
                <Col xs={12} md={8}>
                  <span>
                    <div className="alert alert-light" role="alert">
                    {this.state.msg}
                    </div>
                  </span>
                </Col>
              </Row>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th  className="text-center">#</th>
                      <th className="text-center">Item ID</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Description</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Unit/Pcs</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Category</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.products.map((data, index)=>{
                      return(
                        <tr key={index}>
                          <td className="text-center">{index+1}</td>
                          <td className="text-center">{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.description}</td>
                          <td  className="text-center"><img className="w-25" src={data.image} alt="produk"/></td>
                          <td className="text-center">{data.stock}</td>
                          <td className="text-center">{data.price}</td>
                          <td>{data.name_category}</td>
                          <td>
                          <i className="fa fa-edit" aria-hidden="true" onClick={()=>this.editProduct(data)}  data-toggle="modal" data-target="#exampleModal"></i>
                          <i className="fa fa-trash" aria-hidden="true" onClick={()=>this.confirmDeleteProduct(data)}  data-toggle="modal" data-target="#hapusModal"></i>
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>

              </Media.Body>
            </Media>
          </Col>
        </Row>
        <Row>
        <div>
        {
          // <Pagination
          // activePage={this.state.activePage}
          // itemsCountPerPage={10}
          // totalItemsCount={450}
          // pageRangeDisplayed={5}
          // onChange={this.handlePageChange.bind(this)}
          // />
      }
      </div>
        </Row>
        <Row>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.state.actions}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <Form  onSubmit={this.handleSubmit}>
                <Form.Group as={Row} controlId="formPlaintextName">
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="..." />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextDescription">
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="..." />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPrice">
                  <Form.Label column sm="2">
                    Price
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="..." />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextStock">
                  <Form.Label column sm="2">
                    Stock
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="stock" value={this.state.stock} onChange={this.handleChange} placeholder="..." />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextImage">
                  <Form.Label column sm="2">
                    Image
                  </Form.Label>
                  <Col sm="10">
                    {
                      this.state.actions !== "update" &&
                      <><Form.Control type="file" name="image" ref={this.fileInput} onChange={this.onChangeHandler} /></>
                    }

                    {
                      this.state.image !== "" &&
                      <><Image src={this.state.image} roundedCircle /></>
                    }
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                  <Form.Label column sm="2">Category</Form.Label>
                  <Col sm="10">
                  <Form.Control name="id_category" value={this.state.id_category} as="select"  sm="10" onChange={this.handleChange}>
                  {
                    this.state.actions === "update" &&
                    <><option value={this.state.id_category}>{this.state.category}</option></>
                  }
                    <option value='1'>Makanan</option>
                    <option value='2'>Minuman</option>
                  </Form.Control>
                  </Col>
                </Form.Group>

              </Form>
              <div className="alert alert-light" role="alert">
                {this.state.msg}
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}> {this.state.actions}</button>
              </div>
            </div>
          </div>
        </div>
        </Row>
        <Row>
        <div className="modal fade" id="hapusModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" className="btn btn-primary" onClick={()=>this.deleteProduct(this.state.deleteId)}> Hapus</button>
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

export default connect(stateApp) (Products);
