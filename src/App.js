import React, { useState, useEffect } from 'react';
import Layout from './Layout';
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

const colorizePaths = (rides, ride) => rides.map(r => ({
  ...r,
  color: r.id === ride.id
    ? COLORS.blue
    : COLORS.black,
}));

const moveMapTo = ({ longitude, latitude, zoom }) => ({
  ...VIEWPORT_USA,
  longitude,
  latitude,
  zoom,
});

const App = () => {
  const [rides, setRides] = useState([]);
  const [icons, setIcons] = useState([]);
  const [path, setPath] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState(VIEWPORT_USA);

  useEffect(() => {
    fetchRides().then(setRides);
  }, []);

  function selectRide(ride) {
    const newRides = colorizePaths(rides, ride);
    const newIcons = ride.id ? startAndEndIcons(ride) : [];
    const newViewport = moveMapTo(ride.viewport);
    setRides(newRides);
    setIcons(newIcons);
    setViewport(newViewport);
  }

  useEffect(() => {
    if (!!path.length) {
      const newRide = getNewRide(path, viewport);
      const end = path.length - 1;
      const newViewport = {
        ...viewport,
        longitude: path[end][0],
        latitude: path[end][1],
      };
      selectRide(newRide);
      setViewport(newViewport);
    }
  }, [path]);

  function saveRide(ride) {
    return putRide(ride)
      .then(() => {
        const newRides = [
          ...rides,
          {
            ...ride,
            color: COLORS.black
          }
        ];
        setRides(newRides);
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
    <Layout rides={rides} selectRide={selectRide}>
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
          height="100%"
          width="100%"
        >
          <DeckGL
            viewState={viewport}
            layers={layers}
          />
      </MapGL>
      {!!path.length && (
          <Controls
            open={open}
            setOpen={setOpen}
            viewport={viewport}
            path={path}
            setPath={setPath}
            newRide={newRide[0]}
            saveRide={saveRide}
          />
        )
      }
    </Layout>
  );
};

export default App;
