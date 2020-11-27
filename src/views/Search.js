import React, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShare } from '@fortawesome/free-solid-svg-icons'

import { getSearch } from '../api_resources/request';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

const Search = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ q: '', offset: 0, limit: 10 });
  const [rows, setRows] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    getSearch(searchParams).then((data) => {
      setSearchParams({
        ...searchParams,
        ...{ offset: (searchParams.offset + searchParams.limit) }
      });
      setRows(rows.concat(data.artists.items, data.tracks.items));
      setLoading(false);
    });
  }

  const handleSeachValue = (event) => {
    setSearch(event.target.value);
    setSearchParams({
      ...searchParams,
      ...{q: event.target.value}
    })
  }
  return (
    <div className="container">
      <h1>Search</h1>
      <div className="col-sm-6">
        <div className="input-group mb-3">
          <input type="text" name="search" placeholder="Search" className="form-control" onChange={handleSeachValue} value={search} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      {
        loading
        ?
          <Loading />
        :
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              rows.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>
                      <Link to={`/${row.type}/${row.id}`}>
                        <FontAwesomeIcon icon={faShare} />
                      </Link>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </div>
  )
};

export default Search;
