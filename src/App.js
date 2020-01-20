import React, { useState, useEffect, useCallback } from 'react';
import uuid from 'uuid';
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
import Layout from './Layout';
import Map from './Map';
import Controls from './Controls';
import SaveDialog from './SaveDialog';

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

  const handleClickSave = ({ id, name }) => {
    const ride = {
      ...newRide.ride[0],
      id: id || uuid(),
      name
    };

    saveRide(ride).then(() => {
      setOpen(false);
    });
  }

  const saveRide = ride => putRide(ride)
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

  const openSaveDialog = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const newRide = getNewRide(path, viewport);
  const layers = [
    ...rides.map(makePath),
    ...icons.map(makeIcon),
    ...newRide.ride.map(makePath),
    ...newRide.icons.map(makeIcon),
  ];

  return (
    <Layout rides={rides} selectRide={selectRide} saveRide={saveRide}>
      <Map
        viewport={viewport}
        setViewport={setViewport}
        path={path}
        setPath={setPath}
        layers={layers}
      />
      {!!path.length && (
        <Controls
          openSaveDialog={openSaveDialog}
          path={path}
          setPath={setPath}
        />
      )}
      <SaveDialog
        open={open}
        handleClickSave={handleClickSave}
        handleClose={handleClose}
      />
    </Layout>
  );
};

export default App;
