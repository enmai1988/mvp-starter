import React from 'react';
import ReactDOM from 'react-dom';

const Search = (props) => (
  <div>
    <input type="text" className="form-control" placeholder="Search resturants" onChange={props.onSearch}></input>
  </div>
)

export default Search;
