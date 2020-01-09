import { NEW } from '../config/constants';

export function addPathToRides(path, rides, viewport) {
  let updatedRides = [...rides];
  if (path.length) {
    const newRide = {
      name: NEW,
      path,
      viewport
    };
    if (rides[rides.length - 1].name !== NEW) {
      updatedRides.push(newRide);
    } else {
      updatedRides = updatedRides
      .slice(0, -1)
      .concat(newRide);
    }
  } else {
    updatedRides.pop();
  }
  return updatedRides;
}
