import React, { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { MAPBOX_ACCESS_TOKEN, VIEWPORT_USA } from './config';
import { fetchRides, makeLayer, addPathToRides } from './utils';
import RideList from './RideList';
import Controls from './Controls';

const getColor = selected => selected
  ? [221, 0, 0]
  : [0, 0, 0];

const App = () => {
  const [rides, setRides] = useState([]);
  const [path, setPath] = useState([]);
  const [viewport, setViewport] = useState(VIEWPORT_USA);

  useEffect(() => {
    fetchRides().then(data => {
      setRides([...data]);
    });
  }, []);

  useEffect(() => {
    const updatedRides = addPathToRides(path, rides, viewport);
    setRides(updatedRides);
  }, [path]);

  function selectRide(ride) {
    const updatedRides = rides.map(r => ({
      ...r,
      color: getColor(r.name === ride.name),
    }));
    setRides(updatedRides);
    setViewport({ ...VIEWPORT_USA, ...ride.viewport });
  }

  const hasPath = !!path.length;

  return (
    <>
      <RideList
        rides={rides}
        selectRide={selectRide}
      />
      { hasPath && (
          <Controls
            viewport={viewport}
            path={path}
            setPath={setPath}
          />
        )
      }
      <MapGL
        {...viewport}
        onClick={e => {
          setPath([ ...path, e.lngLat]);
          setViewport({
            ...viewport,
            longitude: e.lngLat[0],
            latitude: e.lngLat[1],
          });
        }}
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        height="100vh"
        width="80vw"
      >
        <DeckGL
          viewState={viewport}
          layers={[...rides.map(makeLayer)]}
        />
      </MapGL>
    </>
  );
};

export default App;
