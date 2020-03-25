// export default App;
import React from 'react';
import { Link } from "react-router-dom";
import {Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
// import Login from './/Login';

const App =(props)=> {
  if (localStorage.usertoken === undefined) {
    return(
      <div> 
        <Link to="/login">Login</Link>
      </div>
    )
  }
    const username = localStorage.getItem('username');
    // window.location.reload(); 
    
    return (
          <div>
            <Alert variant="success" dismissible>
              <Alert.Heading>Hallo <span className='text-uppercase'>{username}</span></Alert.Heading> 
              <p> <a href={'/home'}>Reload halaman</a> untuk melanjutkan dan <span code> pilih menu yang ada!</span></p>
            </Alert>
          </div> 
    )
}

const stateApp=(state)=>{
  return {
    products:state.products,
    user:state.user
  }
}

export default connect(stateApp) (App);
