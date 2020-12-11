import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getAlbum } from '../../api_resources/request';
import { Row, Col } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Thumbnail from '../../components/Thumbnail';
import TracksList from '../../components/TracksList';
import DetailHeader from '../../components/DetailHeader';
import Hr from '../../components/structure/hr';

const Album = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAlbum(albumId).then((data) => {
      setAlbum((a) => ({...a, ...data}))
      setIsLoading((l) => (l = false))
    });
  }, [albumId])
  return (
    <>
      {
        isLoading
        ?
        <Loading />
        :
        <div>
          <div className="header">
            <h1>{ album.name }</h1>
          </div>
          <Hr />
          <div className="content">
            <Row>
              <Col>
                <h6>Album details</h6>
                <DetailHeader>
                  <Row>
                    <Col>
                      <span>Popularity</span>
                    </Col>
                    <Col>
                      <span>{album.popularity}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Genres</span>
                    </Col>
                    <Col>
                      <span>{album.genres.join(', ')}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span>Artists</span>
                    </Col>
                    <Col>
                      {
                        album.artists.map((artist) => {
                          return (
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
                </DetailHeader>
                <Row>
                  <TracksList title="Album tracks" tracks={album.tracks.items || [] } />
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="col-sm-12">
                    <Thumbnail imageSrc={album.images} />
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
                    <a href={album.external_urls.spotify} target="blank" className="btn btn-success">
                      <span>See on Spotify</span>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      }
    </>
  )
};

export default Album;
