import React from 'react';
import ReactDOM from 'react-dom';
import ListEntry from './listentry.jsx';

const List = (props) => (
  <ul className="list">
    {props.list.map((restaurant, index) => <ListEntry restaurant={restaurant} key={index} handleQueue={props.handleQueue}/>)}
  </ul>
);

export default List;
