import { FlyToInterpolator } from 'react-map-gl';

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibmF0aGFua2lwcCIsImEiOiJjazNid2k3enIwN2QzM2Nucmp5b3NmaXY0In0.cMIErB8-bLVio-MGSeXlfg';

export const VIEWPORT_USA = {
  latitude: 36.0,
  longitude: -97.0,
  zoom: 3.25,
  transitionDuration: 'auto',
  transitionInterpolator: new FlyToInterpolator(),
  // transitionEasing: d3.easeCubic
};
