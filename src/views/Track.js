import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getTrack } from '../api_resources/request';
import { Image, Row, Col, Badge } from 'react-bootstrap';

import Loading from '../components/Loading';

const Track = () => {
  const { trackId } = useParams();
  const [track, setTrack] = useState({});
  const history = useHistory();

  useEffect(() => {
    getTrack(trackId).then((data) => {
      setTrack((a) => ({...a, ...data}))
    });
  }, [trackId])
  return (
    <div className="container">
      {
        !!track.id
        ?
        <div>
          <div className="header">
          <h1>{ track.name }</h1>
          <h6>{ !track.explicity ? <Badge variant="secondary">EXPLICITY</Badge> : '' }</h6>
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
                    <span>{track.popularity}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Artists</span>
                  </Col>
                  <Col>
                      {
                        track.artists.map((artist) => {
                          return(
                            <Row key={artist.id}>
                              <Col>
                                <Link to={`/artist/${artist.id}`}>
                                  {artist.name}
                                </Link>
                              </Col>
                            </Row>
                          )
                        })
                      }
                  </Col>
                </Row>
                <br />
                <Row>
                  <div>
                    <audio controls>
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  </div>
                </Row>
                <br />
                <Row>
                  <Col className="col-sm-3">
                    <button onClick={history.goBack} className="btn btn-secondary">
                      Back
                    </button>
                  </Col>
                  <Col className="col-sm-6">
                    <a href={track.external_urls.spotify} target="blank" className="btn btn-success">
                      <span>Listen on Spotify</span>
                    </a>
                  </Col>
                </Row>
              </Col>
              <Col>
                <div className="header-image">
                  <Image src={track.album.images[0].url} rounded />
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

export default Track;
