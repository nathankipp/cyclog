import { COLORS } from '../config';

export function getNewRide(path, viewport) {
  let ride = [];
  if (!!path.length) {
    ride = [{
      id: '__new__',
      name: '• New ride •',
      color: COLORS.blue,
      path,
      viewport
    }];
  }
  return ride;
}
