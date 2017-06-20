import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.password = '';
  }

  handleLogin() {

  }

  render() {
    return (
      <div>
        <form className="form-inline">
          <div className="form-group">
            <label className="sr-only">username</label>
            <input type="text" className="form-control" id="exampleInputEmail3" placeholder="username"></input>
          </div>
          <div className="form-group">
            <label className="sr-only">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword3" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-default" onClick={this.handleLogin.bind(this)}>Sign in</button>
        </form>
      </div>
    );
  }
}


export default Login;
