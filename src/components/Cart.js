import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

import {connect} from 'react-redux';

class Cart extends Component {
  render(){
    console.log(this.props);
  return (
    <div>
      <Button primary>Cart  </Button>
    </div>
  );
}
}

const stateApp=(state)=>{
  return {
    user:state.user,
    products:state.products
  }
}

export default connect(stateApp) (Cart);
