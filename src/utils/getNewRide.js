import { COLORS } from '../config';
import { startAndEndIcons } from './startAndEndIcons';

export function getNewRide(path, viewport) {
  let ride = [];
  let icons = [];
  if (!!path.length) {
    ride = [{
      color: COLORS.blue,
      path,
      viewport
    }];
    icons = startAndEndIcons(ride[0]);
  }
  return {
    ride,
    icons
  }
}
