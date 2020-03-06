import React from 'react';
import {connect} from 'react-redux';

const Story =()=> {
    return (
      <div>
        Hallo {this.props.user.name}
      </div>
    );
}

const stateApp=(state)=>{
  return {
    products:state.products,
    user:state.user
  }
}

export default connect(stateApp) (Story);
