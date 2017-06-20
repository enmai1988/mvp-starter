import React from 'react';
import ReactDOM from 'react-dom';

const Search = (props) => (
  <div>
    <form>
      <input id="search" type="text" className="form-control" placeholder="Search resturants" onChange={props.handleChange}></input>
      <input className="btn btn-default" type="submit" onClick={props.handleSearch}></input>
    </form>
  </div>
)

export default Search;
