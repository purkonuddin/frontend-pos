import React, {Component} from 'react';
import { Container, Row, Col, Form, Image, Card } from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';

class Products extends Component {
  constructor(props){
    super(props);
    this.state={
      dataCategory:[],
      dataProduct:[],
      dataPost:{
        id:0,
        name:'',
        description:'',
        stock:'',
        price:'',
        image:null,
        id_category:'',
        category:'',
      },
      edit:false,
      deleteid: 0,
      delete:false,
      message:null,
      selectedFile:null,
      loaded: 0,
    };
    this.fileInput = React.createRef();
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
    newdatapost['description']='';
    newdatapost['stock']='';
    newdatapost['price']='';
    newdatapost['image']='';
    newdatapost['id_category']='';
    newdatapost['category']='';
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

  getDataId=(e)=>{
    console.log(e.target.value);
    
    axios.get(`${process.env.REACT_APP_URL_API}product/${e.target.value}`)
      .then(res=>{
        console.log(res.data.data[0]);
        this.setState({
          dataPost:res.data.data[0],
          edit:true
        })
      })
  }
  
  onSubmitForm=()=>{
    if(this.state.edit===false){
      let product = new FormData()
      product.set('name',this.state.dataPost.name)
      product.set('description',this.state.dataPost.description)
      product.set('stock',this.state.dataPost.stock)
      product.set('price',this.state.dataPost.price)
      product.append('image',this.state.dataPost.image)
      product.set('id_category',this.state.dataPost.id_category)
      
      axios.post(`${process.env.REACT_APP_URL_API}product`, product, {headers: {
            "Content-Type": "multipart/form-data" 
          }})
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
      axios.patch(`${process.env.REACT_APP_URL_API}product/${this.state.dataPost.id}`, this.state.dataPost)
      .then(()=>{
        this.reloadData();
        this.clearData();
        this.setState({edit:false})
      })
      .catch(err => {
        console.log(err)
        this.setState({message:err})
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
    axios.delete(`${process.env.REACT_APP_URL_API}product/${e.target.value}`)
    .then(()=>{this.reloadData()})
    .catch(err => {
      console.log(err)
      this.setState({deleteid:0})
    })
  }

  // reloadData=()=>{
  //   axios.get(`${process.env.REACT_APP_URL_API}product`)
  //   .then(res=>{
  //     console.log(res.data.result);
  //     this.setState({
  //       dataProduct:res.data.result,
  //       edit:false
  //     })
  //   })
  // }

  reloadData=()=>{
    axios.get(`${process.env.REACT_APP_URL_API}pagination/1/2`)
    .then(res=>{
      // console.log('--->',res.data);
      this.setState({
        dataProduct:res.data.result,
        nextpage:res.data.next_page || null,
        prevpage:res.data.prev_page || null,
        perpage:res.data.per_page,
        totalrows:res.data.total,
        totalpage:res.data.total_page,
        currenpage:res.data.curren_page,
        edit:false
      })
    })
  } 

  category=()=>{
    axios.get(`${process.env.REACT_APP_URL_API}category/`)
    .then(res=>{
      // console.log(res.data.data);
      this.setState({
        dataCategory:res.data.data 
      })
    })
  }

  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`${process.env.REACT_APP_URL_API}pagination/${pageNumber}/2`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // console.log('paging',data);
    this.setState({
      dataProduct:data.result,
      nextpage:data.next_page || null,
      prevpage:data.prev_page || null,
      perpage:data.per_page,
      totalrows:data.total,
      totalpage:data.total_page,
      currenpage:data.curren_page,
      edit:false
    })
    
  }

  componentDidMount(){
      this.reloadData();
      this.category();
  }

  render(){
    // console.log(this.state);
    let products, renderPageNumbers;

    if (this.state.dataProduct !== null) {
      products = this.state.dataProduct.map((product, index)=>{
        return(
          <tr key={index}>
            <td >{index+1}{') '}</td>
            <td className='text-capitalize'>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.stock}</td>
            <td>{formatNumber(product.price)}</td>
            <td>
            <span>
                <button className="btn btn-sm btn-danger" value={product.id} onClick={this.setDelete}  data-toggle="modal" data-target="#hapusModal">delete</button>
                <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" value={product.id} onClick={this.getDataId}>edit</button>
            </span>
            </td>
          </tr>
        );
      })
    }

    const pageNumbers = [];
    if (this.state.totalrows !== null) {
      for (let i = 1; i <= Math.ceil(this.state.totalrows / this.state.perpage); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.currenpage === number ? 'btn btn-success' : 'btn';

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }

    
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
  return (
    <Container fluid>
        <Row>
          <Col className="col-sm-12 col-md-12 col-lg-12">
          <Card className='mt-3 mb-5'>
            <Card.Header>
            List Products 
            <span>
            <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.clearData}>tambah</button>
            </span>
            </Card.Header>
            <Card.Body>
              <table>
                <thead>
                <tr className='list-group-item-warning'><th className='p-2'>#</th><th className='w-25'>Items</th><th>Description</th><th>Stock</th><th>Price</th><th>Actions</th></tr>
                </thead>
                <tbody>
              { products
                // this.state.dataProduct.map((product, index)=>{
                //   return(
                //     <tr key={index}>
                //       <td >{index+1}{') '}</td>
                //       <td className='text-capitalize'>{product.name}</td>
                //       <td>{product.description}</td>
                //       <td>{product.stock}</td>
                //       <td>{formatNumber(product.price)}</td>
                //       <td>
                //       <span>
                //           <button className="btn btn-sm btn-danger" value={product.id} onClick={this.setDelete}  data-toggle="modal" data-target="#hapusModal">delete</button>
                //           <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#exampleModal" value={product.id} onClick={this.getDataId}>edit</button>
                //       </span>
                //       </td>
                //     </tr>
                //   );
                // })
              }
              </tbody>
              <tfoot></tfoot>
              </table>
              
              </Card.Body>
              <Card.Footer>
                <div>
                <span className='btn' onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
                <span className='btn' onClick={() => this.makeHttpRequestWithPage(this.state.prevpage)}>Prev</span>
                {renderPageNumbers}
                <span className='btn' onClick={() => this.makeHttpRequestWithPage(this.state.nextpage)}>Next</span>
                <span className='btn' onClick={() => this.makeHttpRequestWithPage(this.state.totalpage)}>&raquo;</span>
                page: {this.state.currenpage} of {this.state.totalpage}. rows: {this.state.totalrows}
                </div> 
                {/* <button value={this.state.prevpage} onClick={() => this.makeHttpRequestWithPage(this.state.prevpage)}>prev</button> 
                <button disabled>{this.state.currenpage}</button>
                <button value={this.state.nextpage} onClick={() => this.makeHttpRequestWithPage(this.state.nextpage)}>next</button>  
                page: {this.state.currenpage} of {this.state.totalpage}. rows: {this.state.totalrows} */}
              </Card.Footer>
            </Card>
            </Col>
          
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
                    <Form.Control type="text" name="name" value={this.state.dataPost.name} onChange={this.inputChange} placeholder="item name" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextDescription">
                  <Form.Label column sm="2">
                    Description
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="description" value={this.state.dataPost.description} onChange={this.inputChange} placeholder="item description" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextPrice">
                  <Form.Label column sm="2">
                    Price
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="price" value={this.state.dataPost.price} onChange={this.inputChange} placeholder="proce" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextStock">
                  <Form.Label column sm="2">
                    Stock
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" name="stock" value={this.state.dataPost.stock} onChange={this.inputChange} placeholder="stock" />
                  </Col>
                </Form.Group>

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
                      <><Image src={this.state.dataPost.image} roundedCircle /></>
                    }
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                  <Form.Label column sm="2">Category</Form.Label>
                  <Col sm="10">
                  <Form.Control name="id_category" value={this.state.dataPost.id_category} onChange={this.inputChange} as="select"  sm="10">
                   <>
                  { this.state.edit === true ? (
                   <option value={this.state.dataPost.id_category}>{this.state.dataPost.name_category}</option> 
                   ):(
                    <option value={1}>{'pilih category'}</option> 
                   )
                  }

                  { this.state.dataCategory.map((category, index)=>{
                      return( 
                        <option key={index} value={category.id}>{category.name_category}</option> 
                      )
                    })
                  } 
                    </>
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
                <button type='submit'  className="btn btn-primary" onClick={this.onSubmitForm}>Save</button>
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
    user:state.user,
    products:state.products
  }
}

export default connect(stateApp) (Products);
