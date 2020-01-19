import { VIEWPORT_USA } from '../config';

export const moveMapTo = ({ longitude, latitude, zoom }) => ({
  ...VIEWPORT_USA,
  longitude,
  latitude,
  zoom,
});
