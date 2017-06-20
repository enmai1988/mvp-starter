import React from 'react';
import ReactDOM from 'react-dom';

const QueueEntry = (props) => (
  <li className="queue_entry">
    <span>{props.customer.firstname}</span><span> </span><span>{props.customer.lastname}</span>
    {props.isLoggedIn ?
      <div>
        <button type="button" className="btn btn-success" onClick={(e) => props.handleSeatedOrRemove(e, {firstname: props.customer.firstname, lastname: props.customer.lastname})}>Seated</button>
        <button type="button" className="btn btn-danger" onClick={(e) => props.handleSeatedOrRemove(e, {firstname: props.customer.firstname, lastname: props.customer.lastname})}>Remove</button>
      </div> :
      <div></div>}
  </li>
);

export default QueueEntry;
