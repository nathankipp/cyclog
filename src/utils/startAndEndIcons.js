import { COLORS } from '../config';

export function startAndEndIcons(ride) {
  if (!ride) return [];

  const icons = [];
  icons.push({
    ...ride,
    name: `${ride.name}-start`,
    color: COLORS.green,
    path: ride.path[0]
  });

  if (ride.path.length > 1) {
    icons.push({
      ...ride,
      name: `${ride.name}-end`,
      color: COLORS.red,
      path: ride.path[ride.path.length - 1]
    });
  }

  return icons;
};
