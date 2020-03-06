import React, {Component} from 'react';
import { Container, InputGroup, FormControl, Row, Col, Spinner, Media,Card, Table, Form, Image, Header, Pagination, Badge, ButtonGroup, Button, Modal } from 'react-bootstrap';
import Axios from "axios";
import qs from "qs";
import { connect } from "react-redux";
import { getProducts } from "../redux/actions/product";
import { checkout, getCheckout } from "../redux/actions/checkout";
// import MydModalWithGrid from "MydModalWithGrid";
class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      productData:[],
      allProductData:[],
      carts:[],
      checkoutDetail:[],
      no_transaction:0,
      modalShow:false,
      search: ""
    }
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      productData: this.state.allProductData.filter((items) => new RegExp(event.target.value, "i").exec(items.name))
    })
    // console.log('panjang cari :', this.state.productData);
  }

  setModalShow = ()=>{
    this.setState({modalShow:!this.state.modalShow});
  }

  getCheckout = async no_transaction => {
    await this.props.dispatch(getCheckout(no_transaction));
    this.setState({
      checkoutDetail: this.props.checkout.checkoutData.result
    });
  };

  submitCart = async () => {

    if (this.state.carts.length !== 0) {
      const idUser = localStorage.getItem('userid');
      const number = idUser+Date.now();

        for (let i = 0; i < this.state.carts.length; i++) {
          const bodyFormData = qs.stringify({
            id_user : idUser,
            no_transaction: number,
            id_product: this.state.carts[i].id,
            qty: this.state.carts[i].qty
          });
          this.props.dispatch(checkout(bodyFormData, idUser, number));
        }

        setTimeout(() => {
          this.getCheckout(number);
        }, 1000);

        this.setState({no_transaction:number})

      await this.cancelCart();
      await this.getProduct();
      await this.setModalShow();
    }
  };

  cancelCart = () => {
    this.setState({
      carts: []
    });
  };

  plusProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    let carts = [...this.state.carts];
    let cart = { ...carts[index] };
    cart.qty += 1;
    carts[index] = cart;
    if (this.state.carts[index].stock >= cart.qty) {
      this.setState({ carts });
    }
  };

  minProduct = id => {
    const index = this.state.carts.findIndex(function(onCarts) {
      return onCarts.id === id;
    });
    if (this.state.carts[index].qty > 1) {
      let carts = [...this.state.carts];
      let cart = { ...carts[index] };
      cart.qty -= 1;
      carts[index] = cart;
      this.setState({ carts });
    } else {
      const carts = this.state.carts.filter(cart => cart.id !== id);
      this.setState({ carts: carts });
    }
  };

  selectedProduct = product => {
    if (product.stock > 0) {
      const index = this.state.carts.findIndex(function(onCarts) {
        return onCarts.id === product.id;
      });
      if (index < 0) {
        var newProduct = Object.assign(product, { qty: 1 });
        this.setState({
          carts: this.state.carts.concat(newProduct)
        });
      }
    }
  };

  getProduct = async () => {
    await this.props.dispatch(getProducts());
    this.setState({
      productData: this.props.product.productData,
      allProductData: this.props.product.productData
    });
  };

  componentDidMount = () => {
    this.getProduct();
  };

  render(){
    function formatNumber(num) {
      return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    function formatCapitalize(s){
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }

    let countTotal = this.state.carts.reduce(function(prev, cur) {
      return prev + cur.price * cur.qty;
    }, 0);

    let countTotals = formatNumber(countTotal);

  return (
    <div>
      <Row>
        <Col sm={8}>
          {!this.props.product.isPending ? (
            <>
            <Row  className="justify-content-md-center mt-lg-2 ml-lg-5 mr-lg-5">
               <InputGroup className="mb-3">
                  <InputGroup.Prepend  placeholder="Search...">
                    <InputGroup.Text id="basic-addon3">
                      search
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl id="basic-url"  value={this.state.search} onChange={this.handleSearch} aria-describedby="basic-addon3" />
                </InputGroup>
            </Row>
            <Row  className="justify-content-md-center">

              {
                this.state.productData.map((product, index)=>{
                  return(
                    <Card style={{ width: '10rem', cursor: 'pointer' }} key={index} onClick={() => this.selectedProduct(product)} className="m-1 mt-2">
                      <Card.Img variant="top" src={product.image} />
                      <Card>
                        <Card.Title>{formatCapitalize(product.name)}</Card.Title>
                        <Card.Text>
                          {formatNumber(product.price)}
                        </Card.Text>
                        <Card.Text>
                        </Card.Text>
                      </Card>
                      {
                        this.state.carts.filter((items) => new RegExp(product.id, "i").exec(items.id)).length === 1 ? (
                          <div className="justify-content-md-center h-100" style={{position: 'absolute', bottom: 0, background: 'rgb(0, 0, 0)', background: 'rgba(0, 0, 0, 0.5)', color: '#f1f1f1', width: '100%', padding: '20px'}}>
                            <i className="fa fa-check-square-o btn-outline-warning" aria-hidden="true"></i>
                          </div>
                        ) : null
                      }
                    </Card>
                  )
                })
              }
              </Row>
              </>
            ):(
              <Row  className="justify-content-md-center">
                <Spinner animation="border" /> Loading...
              </Row>
            )
          }
        </Col>
        <Col className="bg-white border-left p-0 border-0" style={{minHeight:'300px'}} sm={4}>
          <Card className="text-center">
          <Card.Header>Cart <Badge variant="secondary"> {this.state.carts.length}</Badge></Card.Header>
          <Card.Body>
          {this.state.carts.length === 0 ? (
            <>
              <div className="text-center">
              <Card.Body>
                <Card.Title>Food and restaurant</Card.Title>
                <Card.Img src={require('../assets/food-and-restaurant.png')} />
              </Card.Body>
              </div>
            </>
            ):(
              <>
              { this.state.carts.map((cartList, index) => {
                  return (
                    <Card body key={index} style={{border:'0px'}}>
                      <Row>
                        <Col><Card.Img src={cartList.image} /></Col>
                        <Col>
                          <Row>
                          {cartList.name}
                          </Row>
                          <Row>
                          <ButtonGroup size="sm">
                            <Button onClick={() =>this.minProduct(cartList.id)}>-</Button>
                            <Button>{cartList.qty}</Button>
                            <Button onClick={() =>this.plusProduct(cartList.id)}>+</Button>
                          </ButtonGroup>
                          </Row>
                        </Col>
                        <Col>
                          <Row>{cartList.price}</Row>
                          <Row>{formatNumber(cartList.price * cartList.qty)}</Row>
                        </Col>
                      </Row>
                    </Card>
                  )
                })
              }
              <Card body>{countTotals}</Card>
              <div>* Harga belum termasuk PPN</div>
              <div>
                <Button data-toggle="modal" data-target="#checkoutModal" onClick={() => this.submitCart()} variant="primary" size="lg" block>
                  Check Out
                </Button>
                <Button onClick={() => this.cancelCart()} variant="secondary" size="lg" block>
                  Cancel
                </Button>
              </div>
              </>
            )
          }
          </Card.Body>
          </Card>

        </Col>
      </Row>

      <MydModalWithGrid {...this.props} no_transaction={this.state.no_transaction} show={this.state.modalShow} onHide={this.setModalShow} />

    </div>
  );
}
}

const stateApp=(state)=>{
  return {
    user:state.user,
    product:state.product,
    checkout:state.checkout
  }
}

export default connect(stateApp) (Home);


function MydModalWithGrid(props) {
  function formatNumber(num) {
    return "Rp. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  let checkout_countTotal = props.checkout.checkoutData.reduce(function(prev, cur) {
    return prev + cur.price * cur.qty;
  }, 0);

  let sub_total = formatNumber(checkout_countTotal);
  let ppn = formatNumber(checkout_countTotal*10/100);
  let total = formatNumber(checkout_countTotal+(checkout_countTotal*10/100));

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      {
      !props.checkout.isFulfilled ? (
        <Modal.Body className="justify-content-md-center">
          <Spinner animation="border" /> Loading...
        </Modal.Body>
      ) : (
          <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Detail Transaction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col xs={12} md={8}>
                  No.#<code>{props.no_transaction}</code>
                </Col>
                <Col xs={6} md={4}>
                  <code>-</code>
                </Col>
              </Row>
              <Row className="show-grid"   className="border-bottom">
                <Col md={3}> <code>Qty</code> </Col>
                <Col md={3}> <code>Item</code> </Col>
                <Col md={3}> <code>Price</code> </Col>
                <Col md={3}> <code>Tl</code> </Col>
              </Row>
              {
                props.checkout.checkoutData.map((item, index)=>{
                  return(
                    <Row className="show-grid" key={index}>
                      <Col md={1}> <code>{item.qty}</code> </Col>
                      <Col md={4}> <code>|{item.name}}</code> </Col>
                      <Col md={3}> <code>@ {formatNumber(item.price)}</code> </Col>
                      <Col md={4}> <code>{formatNumber(item.sub_total)}</code> </Col>
                    </Row>
                  )
                })
              }
              <Row className="show-grid"   className="border-top">
                <Col md={4}> <code>sub total</code> </Col>
                <Col md={2}> <code> </code> </Col>
                <Col md={2}> <code> </code> </Col>
                <Col md={4}> <code>{sub_total}</code> </Col>
              </Row>
              <Row className="show-grid">
                <Col md={4}> <code>ppn</code> </Col>
                <Col md={1}> <code> </code> </Col>
                <Col md={3}> <code>|10%</code> </Col>
                <Col md={4}> <code>{ppn}</code> </Col>
              </Row>
              <Row className="show-grid" className="border">
                <Col md={4}> <code>Total</code> </Col>
                <Col md={2}> <code> </code> </Col>
                <Col md={2}> <code> </code> </Col>
                <Col md={4}> <code>{total}</code> </Col>
              </Row>
              <Row className="show-grid">
                <Col><p>Payment type : Cash</p></Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
          </>
        )
      }
    </Modal>
  );
}
