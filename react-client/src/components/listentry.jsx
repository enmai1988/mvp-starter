import React from 'react';
import ReactDOM from 'react-dom';

const ListEntry = (props) => (
  <li className="list-entry">
    <div>{props.restaurant.name}</div>
    <img src={props.restaurant.image_url} height="120" width="150"></img>
    <input className="btn btn-default" type="submit" value="Select"></input>
  </li>
);

export default ListEntry;
