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

  const handleSearch = (params) => {
    setLoading(true);
    const currentOffset = params.offset < 0 ? 0 : params.offset
    getSearch(searchParams).then((data) => {
      if (!data.error) {
        setSearchParams({
          ...searchParams,
          ...{ offset: currentOffset }
        });
  
        const items = [].concat((data.artists.items || []), (data.tracks.items || []), (data.albums.items || []))
        setRows(items);
        setLoading(false);
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  const handleSeachValue = (event) => {
    setSearch(event.target.value);
    setSearchParams({
      ...searchParams,
      ...{q: event.target.value, offset: 0}
    })
  }
  return (
    <div className="container">
      <h1>Search</h1>
      <div className="col-sm-6">
        <div className="input-group mb-3">
          <input type="text" name="search" placeholder="Search" className="form-control" onChange={handleSeachValue} value={search} />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={() => { handleSearch({ offset: searchParams.offset }) }}>
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
          <div>
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
            <button className="btn btn-secondary mr-1" onClick={() => handleSearch({ offset: searchParams.offset - searchParams.limit })}>Previous</button>
            <button className="btn btn-secondary" onClick={() => handleSearch({ offset: searchParams.offset + searchParams.limit })}>Next</button>
          </div>
      }
    </div>
  )
};

export default Search;
