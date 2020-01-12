import React, { useState, useEffect } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { MAPBOX_ACCESS_TOKEN, VIEWPORT_USA, COLORS, NEW } from './config';
import {
  fetchRides,
  putRide,
  makeIcon,
  makePath,
  startAndEndIcons
} from './utils';
import RideList from './RideList';
import Controls from './Controls';

function getNewRide(path, viewport) {
  return [{
    name: NEW,
    color: COLORS.blue,
    path,
    viewport
  }];
}

const App = () => {
  const [rides, setRides] = useState([]);
  const [icons, setIcons] = useState([]);
  const [path, setPath] = useState([]);
  const [viewport, setViewport] = useState(VIEWPORT_USA);

  useEffect(() => {
    fetchRides().then(setRides);
  }, []);

  function selectRide(ride = {}) {
    const updatedRides = rides.map(r => ({
      ...r,
      color: r.name === ride.name ? COLORS.blue : COLORS.black,
    }));
    setRides(updatedRides);
    setIcons(ride.name ? startAndEndIcons(ride) : []);
    setViewport({ ...VIEWPORT_USA, ...ride.viewport });
  }

  useEffect(() => {
    if (!!path.length) {
      selectRide(getNewRide(path, viewport));
      const end = path.length - 1;
      setViewport({
        ...viewport,
        longitude: path[end][0],
        latitude: path[end][1],
      });
    }
  }, [path]);

  function saveRide(ride) {
    putRide(ride)
    .then(() => {
      setRides([ ...rides, { ...ride, color: COLORS.black } ]);
      setPath([]);
    });
  }

  let newRide = [];
  let newRideIcons = [];
  if (path.length) {
    newRide = getNewRide(path, viewport);
    newRideIcons = startAndEndIcons(newRide[0]);
  }

  const layers = [
    ...rides.map(makePath),
    ...icons.map(makeIcon),
    ...newRide.map(makePath),
    ...newRideIcons.map(makeIcon),
  ];

  return (
    <>
      <RideList
        rides={rides}
        selectRide={selectRide}
      />
      { !!path.length && (
          <Controls
            viewport={viewport}
            path={path}
            setPath={setPath}
            saveRide={saveRide}
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
        width="75vw"
      >
        <DeckGL
          viewState={viewport}
          layers={layers}
        />
      </MapGL>
    </>
  );
};

export default App;
