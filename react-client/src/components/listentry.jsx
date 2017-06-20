import React from 'react';
import ReactDOM from 'react-dom';

const ListEntry = (props) => (
  <li className="list-entry">
    <div>{props.restaurant.name}</div><div>{`   Rating: ${props.restaurant.rating}`}</div>
    <div>{props.restaurant.location.display_address}</div>
    <img src={props.restaurant.image_url} height="120" width="150"></img>
    <button className="btn btn-default" type="submit" onClick={() => props.handleQueue(props.restaurant)}>Select</button>
  </li>
);

export default ListEntry;
