import { IconLayer, PathLayer } from '@deck.gl/layers';
import { COLORS } from '../config';
// import rider from './rider.png';
import rider from '../static/directions_bike_24px.svg';
// import { fetchPath } from './fetchPath';

// function getPath(data) {
//   const setsOf100Points = [];
//   for (let i = 0; data.path.length > i; i += 100) {
//     setsOf100Points.push(data.path.slice(i, i+100));
//   }
//   return Promise.all(setsOf100Points.map(fetchPath))
//     .then(paths =>
//       [{ path: paths.reduce((a,c) => a.concat(c), []) }]
//     );
// }

function makeIconLayer(data) {
  return new IconLayer({
    id: data.name,
    data: [{ coordinates: data.path }],
    iconAtlas: rider,
    iconMapping: {
      rider: {x: 0, y: 0, width: 24, height: 24, mask: true}
    },
    getIcon: () => 'rider',
    getColor: () => data.color,
    getPosition: d => d.coordinates,
    sizeMinPixels: 28
  });
}

function makePathLayer(data) {
  return new PathLayer({
    id: data.id,
    data: [{ path: data.path }],
    getColor: () => data.color,
    rounded: true,
    widthMinPixels: 2,
  });
}

export function makeRideLayer(ride) {
  const layers = [makePathLayer(ride)];
  if (ride.isSelected) {
    const startIconData = {
      ...ride,
      name: `${ride.name}-start`,
      color: COLORS.green,
      path: ride.path[0]
    };
    layers.push(makeIconLayer(startIconData));

    if (ride.path.length > 1) {
      const endIconData = {
        ...ride,
        name: `${ride.name}-end`,
        color: COLORS.red,
        path: ride.path[ride.path.length - 1]
      };
      layers.push(makeIconLayer(endIconData));
    }
  }
  return layers;
}
