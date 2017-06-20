import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/list.jsx';
import ListEntry from './components/listentry.jsx';
import Login from './components/login.jsx';
import Search from './components/search.jsx';
import Queue from './components/queue.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.history = {};
    this.state = {
      list: [],
      selection: null,
      isLoggedIn: false,
      enqueue: false,
      queue: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: 'http://127.0.0.1:3000/list',
      method: 'GET',
      success: (data) => {
        console.log(data);
        this.setState({ list: data });
        this.history[''] = data;
      },
      error: () => {
        console.log('Error fetching data from server');
      }
    });
  }

  handleQueue(restaurant) {
    console.log(restaurant);
    $.ajax({
      url: 'http://127.0.0.1:3000/queue',
      method: 'GET',
      data: {name: restaurant.name},
      success: (data) => {
        console.log('handleQueue: ', data);
        this.setState({
          selection: restaurant,
          enqueue: !this.state.enqueue,
          queue: data
        });
      },
      error: () => {
        console.log('failed to get queue');
      }
    });
  }

  handleWait(e, name) {
    // should send customer informatin to server
    e.preventDefault();
    let customer = {
      restaurant_name: name,
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value
    }
    console.log(customer);
    $.ajax({
      url: 'http://127.0.0.1:3000/queue',
      method: 'POST',
      data: customer,
      success: (data) => {
        console.log(data);
        this.setState({ queue: data });
      },
      error: () => {
        console.log('failed');
      }
    });
  }

  handleChange(e) {
    e.preventDefault();

    let keyword = e.target.value.toLowerCase();
    let result = this.state.list.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword);
    });

    if (!this.history[keyword] || this.history[keyword].length < 1) {
      this.history[keyword] = result;
    }

    console.log('filter: ', result);
    this.setState({ list: this.history[keyword] });
  }

  handleSearch(e) {
    e.preventDefault();

    let query = document.getElementById('search').value;
    console.log(`sending ${query} to server`);

    $.ajax({
      url: 'http://127.0.0.1:3000/restaurants/imports',
      type: 'POST',
      data: {query: query},
      success: (data) => {
        console.log('post: ', data);
        this.setState({ list: data });
      },
      error: (data) => {
        console.log('search: ', data);
        console.log('POST request failed');
      }
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      isLoggedIn: !this.state.isLoggedIn
      // selection: this.state.list[0]
    });
    //
    // let regUser = {
    //   username: document.getElementById('username').value,
    //   password: document.getElementById('password').value
    // };
    // console.log(regUser);
    //
    // $.ajax({
    //   url: 'http://127.0.0.1:3000/login',
    //   type: 'POST',
    //   data: regUser,
    //   success: (response) => {
    //     console.log(response);
    //   },
    //   error: () => {
    //     console.log('login failed');
    //   }
    // });
  }

  handleSeatedOrRemove(e, customer) {
    // e.preventDefault();
    customer.restaurant_name = this.state.selection.name;
    $.ajax({
      url: 'http://127.0.0.1:3000/dequeue',
      type: 'POST',
      data: customer,
      success: (response) => {
        console.log('record removed');
        this.setState({ queue: response });
      },
      error: () => {
        console.log('Error removing record');
      }
    });
  }

  render() {
    return (
      <div className=".col-md-8">
        <div className="clearfix">
          <Search handleSearch={this.handleSearch.bind(this)} handleChange={this.handleChange.bind(this)}/>
        </div>
        <div>{this.state.isLoggedIn ? <div></div> : <Login handleLogin={this.handleLogin.bind(this)}/>}</div>
        <div className="list_container">
          {this.state.enqueue ?
            <Queue handleSeatedOrRemove={this.handleSeatedOrRemove.bind(this)} isLoggedIn={this.state.isLoggedIn} queue={this.state.queue} restaurant={this.state.selection} handleWait={this.handleWait.bind(this)}/> :
            <List list={this.state.list} handleQueue={this.handleQueue.bind(this)}/>
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
