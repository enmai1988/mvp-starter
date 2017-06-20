import React from 'react';
import ReactDOM from 'react-dom';

const QueueEntry = (props) => (
  <li className="queue-entry">
    <span>{props.customer.firstname}</span> <span>{props.customer.lastname}</span>
  </li>
);

export default QueueEntry;
