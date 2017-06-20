import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/list.jsx';
import ListEntry from './components/listentry.jsx';
import Login from './components/login.jsx';
import Search from './components/search.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      login: false
    };
  }

  componentDidMount() {
    // should send a get request for the resturants list
    $.ajax({
      url: 'http://127.0.0.1:3000/list',
      method: 'GET',
      success: (data) => {
        this.setState({ list: JSON.parse(data).businesses })
      },
      error: () => {
        console.log('Error fetching data from server');
      }
    });
  }

  onSearch(e) {
    // should send a post request to find matching resturants
    console.log(`sending ${e.target.value} to server`);
    $.ajax({
      url: 'http://127.0.0.1:3000/resturants',
      method: 'POST',
      data: {query: e.target.value},
      success: (response) => {
        console.log('POST: ', response);
      },
      error: () => {
        console.log('POST request failed');
      }
    });
  }

  onLogin() {
    // send a post request to server to login to the owner page
  }

  render() {
    return (
      <div className=".col-md-8">
        <div>
          <Search onSearch={this.onSearch.bind(this)}/>
        </div>
        <div><Login onLogin={this.onLogin.bind(this)}/></div>
        <div>
          <List list={this.state.list}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
