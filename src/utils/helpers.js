import {lineString} from '@turf/helpers';
import length from '@turf/length';
import {
  COLORS,
  MAPBOX_ACCESS_TOKEN,
  NEW_ID,
  VIEWPORT_USA
} from '../config';

export const isNotNew = ride => ride.id !== NEW_ID;

function startAndEndIcons(ride) {
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

export const configureRides = (rides, selectedRide = {}) =>
  rides.map(ride => {
    const isSelected = ride.id === selectedRide.id;
    return {
      ...ride,
      isSelected,
      riders: ride.riders || '',
      icons: isSelected ? startAndEndIcons(ride) : [],
      color: isSelected ? COLORS.blue : COLORS.black,
      milage: ride.path.length > 1
        ? length(lineString(ride.path), { units: 'miles' })
        : 0,
    };
  });

export const getNewRide = (path, viewport) => {
  let ride = [];
  if (!!path.length) {
    ride = [{
      id: NEW_ID,
      name: '• New ride •',
      color: COLORS.blue,
      path,
      viewport
    }];
  }
  return ride;
}

export const fetchPath = (coordinates) => {
  const c = coordinates
    .reduce((a, c) => { a.push(`${c[0]},${c[1]}`); return a; }, [])
    .join(';');
  const r = coordinates
    .map(() => 20)
    .join(';');
  return fetch(`https://api.mapbox.com/matching/v5/mapbox/cycling/${c}?radiuses=${r}&tidy=true&geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => res.json())
    .then(({ matchings }) => matchings.reduce(
      (a,c) => {
        a.push(c.geometry.coordinates);
        return a;
      }, [])
    );
}

export const colorizePaths = (rides, ride) =>
  rides.map(r => ({
    ...r,
    color: r.id === ride.id
      ? COLORS.blue
      : COLORS.black,
  }));

export const moveMapTo = ({ longitude, latitude, zoom }) => ({
  ...VIEWPORT_USA,
  longitude,
  latitude,
  zoom,
});
