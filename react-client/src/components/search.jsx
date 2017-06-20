import React from 'react';
import ReactDOM from 'react-dom';

const Search = (props) => (
  // <form>
  //   <input id="search" type="text" className="form-control" placeholder="Search resturants" onChange={props.handleChange}></input>
  //   <input className="btn btn-default" type="submit" onClick={(e) => props.handleSearch(e)}></input>
  // </form>
  <form>
    <input id="search" type="text" className="search-query form-control" placeholder="Search" onChange={props.handleChange}/>
    <span id="search_btn" className="input-group-btn">
      <button className="btn btn-danger" type="button" onClick={(e) => props.handleSearch(e)}>
        <span className="glyphicon glyphicon-search"></span>
      </button>
    </span>
  </form>
);

export default Search;
