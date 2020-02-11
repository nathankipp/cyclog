import React from 'react';
import uuid from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { VIEWPORT_USA, COLORS, NEW_ID } from './config';
import {
  moveMapTo,
  fetchRides,
  putRide,
  deleteRide,
  makeRideLayer,
  startAndEndIcons,
  getNewRide,
} from './utils';
import Layout from './Layout';
import RideList from './RideList';
import Map from './Map';
import Controls from './Controls';
import SaveDialog from './SaveDialog';
import DeleteConfirm from './DeleteConfirm';

function configureRides(rides, selectedRide = {}) {
  return rides.map(ride => {
    const isSelected = ride.id === selectedRide.id;
    return {
      ...ride,
      isSelected,
      icons: isSelected ? startAndEndIcons(ride) : [],
      color: isSelected ? COLORS.blue : COLORS.black,
    };
  });
}

const existingRides = ride => ride.id !== NEW_ID;

export default class App extends React.Component {
  state = {
    rides: [],
    selectedRide: {},
    path: [],
    viewport: VIEWPORT_USA,
    isSaveDialogOpen: false,
    isDeleteConfirmOpen: false,
    deleteFn: null
  };

  componentDidMount = () => {
    fetchRides()
      .then(configureRides)
      .then(rides => this.setState({ rides }));
  }

  deleteRideFn = (selectedRide) => () => {
    const { rides } = this.state;
    return deleteRide(selectedRide)
      .then(() => new Promise(resolve =>
        this.setState({
          rides: rides.filter(r => r.id !== selectedRide.id)
        }, resolve))
      );
  }

  selectRide = (selectedRide) => {
    const { rides } = this.state;
    const newRides = configureRides(rides, selectedRide);
    const viewport = moveMapTo(selectedRide.viewport);
    const deleteFn = this.deleteRideFn(selectedRide);
    this.setState({
      selectedRide,
      rides: newRides,
      deleteFn,
      viewport,
    });
  }

  setPath = (path) => {
    const deleteFn = () => this.setPath([]);
    const newState = { path, deleteFn };
    const { rides, viewport } = this.state;
    if (!!path.length) {
      const newRide = getNewRide(path, viewport);
      const newRides = [
        ...rides.filter(existingRides),
        ...newRide
      ];
      newState.rides = configureRides(newRides, newRide[0]);
      newState.selectedRide = newRide[0];
    } else {
      newState.rides = rides.filter(existingRides);
      newState.selectedRide = null;
    }
    return new Promise(resolve => this.setState(newState, resolve));
  }

  undoPath = () => {
    const { path } = this.state;
    this.setPath(path.slice(0, -1));
  }

  saveRide = (ride) => {
    const { path, viewport } = this.state;
    const isNew = ride.id === NEW_ID;
    const id = isNew ? uuid() : ride.id;
    const payload = {
      ...ride,
      id,
      viewport,
    };
    return putRide(payload)
      .then(fetchRides)
      .then((rides) => {
        const newRides = [...rides.filter(existingRides)];
        if (!isNew && !!path.length) {
          newRides.push(getNewRide(path, viewport)[0]);
        }
        return configureRides(newRides, payload);
      })
      .then((rides) => {
        this.setState({
          rides,
          selectedRide: payload,
          deleteFn: this.deleteRideFn(payload),
          path: isNew ? [] : path,
          isSaveDialogOpen: false,
        });
      });
  }

  toggleSaveDialog = (isSaveDialogOpen) => this.setState({ isSaveDialogOpen });
  toggleDeleteConfirm = (isDeleteConfirmOpen) => this.setState({ isDeleteConfirmOpen });
  setViewport = (viewport) => this.setState({ viewport });

  render() {
    const { rides, selectedRide, path, viewport, isSaveDialogOpen, isDeleteConfirmOpen, deleteFn } = this.state;
    const layers = [...rides.map(makeRideLayer)];
    const showControls = !!path.length && selectedRide && selectedRide.id === NEW_ID;

    return (
      <>
        <Layout
          rideList={() =>
            <RideList
              rides={rides}
              selectRide={this.selectRide}
              toggleSaveDialog={this.toggleSaveDialog}
              toggleDeleteConfirm={this.toggleDeleteConfirm}
            />
          }
        >
          <Map
            viewport={viewport}
            setViewport={this.setViewport}
            path={path}
            setPath={this.setPath}
            layers={layers}
          />
          {showControls && (
            <Controls
              undoPath={this.undoPath}
              toggleSaveDialog={this.toggleSaveDialog}
              toggleDeleteConfirm={this.toggleDeleteConfirm}
            />
          )}
        </Layout>
        <SaveDialog
          open={isSaveDialogOpen}
          toggle={this.toggleSaveDialog}
          ride={selectedRide}
          saveRide={this.saveRide}
        />
        <DeleteConfirm
          open={isDeleteConfirmOpen}
          toggle={this.toggleDeleteConfirm}
          deleteFn={deleteFn}
        />
      </>
    );
  }
}
