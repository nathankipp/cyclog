import React, { useState, useEffect, useCallback } from 'react';
import Layout from './Layout';
import Map from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { VIEWPORT_USA, COLORS } from './config';
import {
  colorizePaths,
  moveMapTo,
  fetchRides,
  putRide,
  makeIcon,
  makePath,
  startAndEndIcons,
  getNewRide,
} from './utils';
import Controls from './Controls';

const App = () => {
  const [rides, setRides] = useState([]);
  const [icons, setIcons] = useState([]);
  const [path, setPath] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState(VIEWPORT_USA);

  useEffect(() => {
    fetchRides().then(setRides);
  }, []);

  const selectRide = useCallback((ride) => {
    const newRides = colorizePaths(rides, ride);
    const newIcons = ride.id ? startAndEndIcons(ride) : [];
    const newViewport = moveMapTo(ride.viewport);
    setRides(newRides);
    setIcons(newIcons);
    setViewport(newViewport);
  }, [rides]);

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

  const newRide = getNewRide(path, viewport);
  const layers = [
    ...rides.map(makePath),
    ...icons.map(makeIcon),
    ...newRide.ride.map(makePath),
    ...newRide.icons.map(makeIcon),
  ];

  return (
    <Layout rides={rides} selectRide={selectRide}>
      <Map
        viewport={viewport}
        setViewport={setViewport}
        path={path}
        setPath={setPath}
        layers={layers}
      />
      {!!path.length && (
          <Controls
            open={open}
            setOpen={setOpen}
            viewport={viewport}
            path={path}
            setPath={setPath}
            newRide={newRide.ride[0]}
            saveRide={saveRide}
          />
        )
      }
    </Layout>
  );
};

export default App;
