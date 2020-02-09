import { FlyToInterpolator } from 'react-map-gl';

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmF0aGFua2lwcCIsImEiOiJjazNid2k3enIwN2QzM2Nucmp5b3NmaXY0In0.cMIErB8-bLVio-MGSeXlfg';

export const DRAWER_WIDTH = 300;

export const VIEWPORT_USA = {
  latitude: 39.0,
  longitude: -97.0,
  zoom: 3.25,
  transitionDuration: 'auto',
  transitionInterpolator: new FlyToInterpolator(),
  // transitionEasing: d3.easeCubic,
};

export const COLORS = {
  black: [0, 0, 0],
  red: [150, 50, 50],
  green: [50, 150 ,50],
  blue: [50, 50, 150]
};
