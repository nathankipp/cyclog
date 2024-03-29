// import { FlyToInterpolator } from 'react-map-gl';

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmF0aGFua2lwcCIsImEiOiJjazNid2k3enIwN2QzM2Nucmp5b3NmaXY0In0.cMIErB8-bLVio-MGSeXlfg';

export const DRAWER_WIDTH = 300;

export const NEW_ID = 'NEW_ID';

export const IS_LANDSCAPE = () => window.innerHeight < window.innerWidth;
export const IS_NARROW = window.innerWidth < 500;
export const VIEWPORT_USA = {
  latitude: 39.0,
  longitude: -97.0,
  zoom: IS_NARROW ? 2.25 : 3.25,
  // transitionDuration: 0,
  // transitionInterpolator: new FlyToInterpolator(),
  // transitionEasing: d3.easeCubic,
};

export const COLORS = {
  black: [0, 0, 0],
  red: [150, 50, 50],
  green: [50, 150 ,50],
  blue: [50, 50, 150],
  yellow: [255, 255, 0],
  gray: [200,200,200],
};
