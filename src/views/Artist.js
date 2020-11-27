import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getArtist } from '../api_resources/request';
import { Image, Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';

const Artist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({});
  const history = useHistory();

  useEffect(() => {
    getArtist(artistId).then((data) => {
      setArtist((a) => ({...a, ...data}))
    });
  }, [artistId])
  return (
    <div className="container">
      {
        !!artist.id
        ?
        <div>
          <div className="header">
            <h1>{ artist.name }</h1>
          </div>
          <hr />
          <div className="content">
            <Row>
              <Col>
                <h6>Artist details</h6>
                <Row>
                  <Col>
                    <span>Popularity</span>
                  </Col>
                  <Col>
                    <span>{artist.popularity}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Followers</span>
                  </Col>
                  <Col>
                    <span>{artist.followers.total}</span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col className="col-sm-3">
                    <button onClick={history.goBack} className="btn btn-secondary">
                      Back
                    </button>
                  </Col>
                  <Col className="col-sm-6">
                    <a href={artist.external_urls.spotify} target="blank" className="btn btn-success">
                      <span>See on Spotify</span>
                    </a>
                  </Col>
                </Row>
                
              </Col>
              <Col>
                <div className="header-image">
                  <Image src={artist.images.length > 0 ? artist.images[0].url : ''} rounded />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        :
        <Loading />
      }
    </div>
  )
};

export default Artist;
