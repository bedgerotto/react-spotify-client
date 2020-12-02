import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { getTrack } from '../api_resources/request';
import { Row, Col, Badge } from 'react-bootstrap';

import Loading from '../components/Loading';
import PreviewTrack from '../components/PreviewTrack';
import Thumbnail from '../components/Thumbnail';
import LikeHandler from '../components/LikeHandler';

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
          <h1 className="d-inline">{ track.name }</h1>
          <h6 className="d-inline">{ track.explicity ? <Badge variant="secondary">EXPLICITY</Badge> : '' }</h6>
          <LikeHandler className="mt-1 float-right" trackId={track.id} />
          </div>
          <hr />
          <div className="content">
            <Row>
              <Col>
                <h6>Track details</h6>
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
                    <span>Album</span>
                  </Col>
                  <Col>
                    <span>
                      <Link to={`/album/${track.album.id}`}>
                        {track.album.name}
                      </Link>
                    </span>
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
                  <PreviewTrack previewUrl={track.preview_url} />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="col-sm-12">
                    <Thumbnail imageSrc={track.album.images} />
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
                    <a href={track.external_urls.spotify} target="blank" className="btn btn-success">
                      <span>Listen on Spotify</span>
                    </a>
                  </Col>
                </Row>
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
