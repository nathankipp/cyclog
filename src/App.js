import React from 'react';
import { withRouter } from 'react-router-dom';
import uuid from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';
import { VIEWPORT_USA, NEW_ID, COLORS } from './config';
import {
  configureRides,
  deleteRide,
  fetchRides,
  getNewRide,
  isNotNew,
  makeRideLayer,
  moveMapTo,
  putRide,
  routing,
} from './utils';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from './Content';
import Header from './Header';
import Drawer from './Drawer';
import RideDetails from './RideDetails';
import RideList from './RideList';
import Map from './Map';
import Controls from './Controls';
import SaveDialog from './SaveDialog';
import DeleteConfirm from './DeleteConfirm';

// import data from './data';

class App extends React.Component {
  state = {
    rides: [],
    riders: routing.getRidersFromUrl(this.props.match),
    selectedRide: {},
    path: [],
    viewport: VIEWPORT_USA,
    isDrawerOpen: true,
    isSaveDialogOpen: false,
    isDeleteConfirmOpen: false,
    deleteFn: null
  };

  componentDidMount = () => {
    const { rideId } = this.props.match.params;
    fetchRides()
      /*
       * to import data
       * 1) uncomment this block
       * 2) let any ride in RideList be editable
       * 3) use ui to load a ride then edit and save it
       */
      // .then((rides) => {
      //   rides.push({
      //     ...data[0],
      //     id: NEW_ID,
      //     riders: 'nathan',
      //   });
      //   return rides;
      // })
      .then(configureRides)
      .then(rides => this.setState({ rides }, () => {
          const selectedRide = rides.find(r => r.id === rideId);
          if (selectedRide) {
            this.selectRide(selectedRide);
          }
        })
      );
  }

  deleteRideFn = (selectedRide) => () => {
    const { rides } = this.state;
    return deleteRide(selectedRide)
      .then(() => new Promise(resolve =>
        this.setState({
          rides: rides.filter(r => r.id !== selectedRide.id),
          selectedRide: {},
        }, resolve))
      );
  }

  selectRide = (selectedRide) => {
    if (!selectedRide) {
      this.setState({ viewport: moveMapTo(VIEWPORT_USA) });
      return;
    }
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
        ...rides.filter(isNotNew),
        ...newRide
      ];
      newState.rides = configureRides(newRides, newRide[0]);
      newState.selectedRide = newState.rides.find(r => r.isSelected);
    } else {
      newState.rides = rides.filter(isNotNew);
      newState.selectedRide = {};
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
        const newRides = [...rides.filter(isNotNew)];
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

  toggleDrawer = (isDrawerOpen) => this.setState({ isDrawerOpen });
  toggleSaveDialog = (isSaveDialogOpen) => this.setState({ isSaveDialogOpen });
  toggleDeleteConfirm = (isDeleteConfirmOpen) => this.setState({ isDeleteConfirmOpen });
  setViewport = (viewport) => this.setState({ viewport });

  render() {
    const {
      rides: allRides,
      selectedRide,
      path,
      viewport,
      isDrawerOpen,
      isSaveDialogOpen,
      isDeleteConfirmOpen,
      deleteFn
    } = this.state;

    // const { rideId } = this.props.match.params;
    // let viewport = this.state.viewport;
    // if (selectedRide && selectedRide.id !== rideId) {
    //   const r = allRides.find(r => r.id === rideId);
    //   if (r && r.viewport) {
    //     viewport = r.viewport;
    //   }
    // }

    const { riders } = this.props.match.params;
    const rides = allRides
      .filter((ride) => riders
        .split(',')
        .map((name) => {
          if (name === 'jessecoconut') {
            return ride.riders === 'jesse' || !ride.riders;
          }
          return ride.riders.includes(name) || !ride.riders
        })
        .every(v => v)
      )
      .map(ride => ({
        ...ride,
        color: path.length && ride.id !== selectedRide.id ? COLORS.gray : ride.color,
      }))
      .sort((a,b) => +(a.id === selectedRide.id) - +(b.id === selectedRide.id));
    const layers = [...rides.map(makeRideLayer)];
    const showControls = !!path.length && selectedRide && selectedRide.id === NEW_ID;

    return (
      <div style={{display: 'flex'}}>
        <CssBaseline />
        <Header
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
          riders={riders}
          addRider={this.addRider}
          removeRider={this.removeRider}
        />
        <Drawer
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={this.toggleDrawer}
        >
          <RideList
            rides={rides}
            selectRide={this.selectRide}
            toggleSaveDialog={this.toggleSaveDialog}
            toggleDeleteConfirm={this.toggleDeleteConfirm}
          />
        </Drawer>
        <Content isDrawerOpen={isDrawerOpen}>
          <Map
            viewport={viewport}
            setViewport={this.setViewport}
            path={path}
            setPath={this.setPath}
            layers={layers}
          />
          {selectedRide.id && <RideDetails ride={selectedRide} />}
          {showControls && (
            <Controls
              undoPath={this.undoPath}
              toggleSaveDialog={this.toggleSaveDialog}
              toggleDeleteConfirm={this.toggleDeleteConfirm}
            />
          )}
        </Content>
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
      </div>
    );
  }
}

export default withRouter(App);
