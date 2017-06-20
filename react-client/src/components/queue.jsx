import React from 'react';
import ReactDOM from 'react-dom';
import QueueEntry from './queueentry.jsx'

const Queue = (props) => (
  <ul>
    <div>
      <div className="name">{props.restaurant.name}</div>
      <img src={props.restaurant.image_url} height="120" width="150"></img>
    </div>
    {props.queue.map((customer, index) => <QueueEntry key={index} customer={customer}/>)}
    <div id="info">
      <span>Please enter your information:</span>
      <form className="form-inline">
        <div className="form-group">
          <input type="text" className="form-control" id="firstname" placeholder="firstname"></input>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="lastname" placeholder="lastname"></input>
        </div>
        <button type="submit" className="btn btn-default" onClick={(e) => props.handleWait(e, props.restaurant.name)}>Submit</button>
      </form>
    </div>
  </ul>
);

export default Queue;
