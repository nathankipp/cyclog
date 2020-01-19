import { COLORS } from '../config';

export const colorizePaths = (rides, ride) => rides.map(r => ({
  ...r,
  color: r.id === ride.id
    ? COLORS.blue
    : COLORS.black,
}));
