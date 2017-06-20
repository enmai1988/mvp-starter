import React from 'react';
import ReactDOM from 'react-dom';

const Login =(props) => (
  <div id='login'>
    <form className="form-inline">
      <div className="form-group">
        <label className="sr-only">username</label>
        <input type="text" className="form-control" id="username" placeholder="username"></input>
      </div>
      <div className="form-group">
        <label className="sr-only">Password</label>
        <input type="password" className="form-control" id="password" placeholder="password"></input>
      </div>
      <button type="submit" className="btn btn-default" onClick={props.handleLogin}>Sign in</button>
      <button id="signup" type="submit" className="btn btn-default" onClick={props.handleLogin}>Sign up</button>
    </form>
  </div>
);


export default Login;
