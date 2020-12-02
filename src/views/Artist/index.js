import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getArtist, getArtistTopTracks, getArtistAlbums } from '../../api_resources/request';
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import Loading from '../../components/Loading';
import Thumbnail from '../../components/Thumbnail';
import TracksList from '../../components/TracksList';
import AlbumsList from '../../components/AlbumsList';
import TrackArtist from '../../components/TrackArtist';

const Artist = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({ followers: {}, external_urls: {} });
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTracksLoading, setIsTracksLoading] = useState(true);
  const [isAlbumsLoading, setIsAlbumsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getArtist(artistId).then((data) => {
      if (!data.error) {
        setArtist((a) => ({...a, ...data}))
      }
      setIsLoading((l) => l = false)
    });

    getArtistTopTracks(artistId).then((data) => {
      if (!data.error) {
        setTopTracks((t) => (t = data.tracks))
      }
      setIsTracksLoading((l) => l = false)
    })
    .catch((error) => {
      console.log(error)
    });

    getArtistAlbums(artistId).then((data) => {
      if (!data.error) {
        setAlbums((a) => (a = data.items))
      }
      setIsAlbumsLoading((l) => l = false)
    }).catch((error) => {
      console.log(error)
    });;
  }, [artistId])
  return (
    <>
      {
        isLoading
        ?
        <Loading />
        :
        <div>
          <div className="header">
            <h1 className="d-inline">{ artist.name }</h1>
            <TrackArtist className="float-right" artistId={artist.id} />
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
                  <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title={isTracksLoading ? <div><Loading size="sm" /> Top tracks</div> : 'Top tracks'}>
                      {
                        isTracksLoading ?
                        <Loading />
                        :
                        <TracksList title="" tracks={topTracks} />
                      }
                    </Tab>
                    <Tab eventKey="profile" title={isAlbumsLoading ? <div><Loading size="sm" /> Albums</div> : 'Albums'}>
                      { <AlbumsList title="" albums={albums} /> }
                    </Tab>
                  </Tabs>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Col className="col-sm-12">
                    <Thumbnail imageSrc={artist.images} />
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
            </Row>
          </div>
        </div>
      }
    </>
  )
};

export default Artist;
