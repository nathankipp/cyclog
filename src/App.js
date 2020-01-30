import React from 'react';
import uuid from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import { VIEWPORT_USA, COLORS } from './config';
import {
  moveMapTo,
  fetchRides,
  putRide,
  makeRideLayer,
  startAndEndIcons,
  getNewRide,
} from './utils';
import Layout from './Layout';
import Map from './Map';
import Controls from './Controls';
import SaveDialog from './SaveDialog';

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

const existingRides = ride => ride.id !== '__new__';

export default class App extends React.Component {
  state = {
    rides: [],
    selectedRide: null,
    path: [],
    viewport: VIEWPORT_USA,
    modalOpen: false,
  };

  componentDidMount = () => {
    fetchRides()
      .then(configureRides)
      .then(rides => {
        this.setState({
          ...this.state,
          rides,
        });
      });
  }

  selectRide = (ride) => {
    const { rides } = this.state;
    const newRides = configureRides(rides, ride);
    const newViewport = moveMapTo(ride.viewport);
    this.setState({
      ...this.state,
      rides: newRides,
      selectedRide: ride,
      viewport: newViewport,
    });
  }

  setPath = (path) => {
    const newState = { ...this.state, path };
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
    this.setState(newState);
  }

  toggleModal = (modalOpen) => this.setState({ ...this.state, modalOpen });

  saveRide = (ride) => {
    const { path, viewport } = this.state;
    const isNew = ride.id === '__new__';
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
          ...this.state,
          path: isNew ? [] : path,
          rides,
          selectedRide: payload,
          modalOpen: false,
        });
      });
  }

  setViewport = (viewport) => this.setState({ ...this.state, viewport });

  render() {
    const { rides, selectedRide, path, viewport, modalOpen } = this.state;
    const layers = [...rides.map(makeRideLayer)];
    const showControls = !!path.length && selectedRide && selectedRide.id === '__new__';

    return (
      <Layout
        rides={rides}
        selectRide={this.selectRide}
        selectedRideId={selectedRide && selectedRide.id}
        toggleModal={this.toggleModal}
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
            path={path}
            setPath={this.setPath}
            toggleModal={this.toggleModal}
          />
        )}
        <SaveDialog
          open={modalOpen}
          toggle={this.toggleModal}
          ride={selectedRide || {}}
          saveRide={this.saveRide}
        />
      </Layout>
    );
  }
}
