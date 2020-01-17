import { IconLayer, PathLayer } from '@deck.gl/layers';
// import rider from './rider.png';
import rider from './directions_bike_24px.svg';
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

export function makeIcon(data) {
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

export function makePath(data) {
  return new PathLayer({
    id: data.name,
    data: [{ path: data.path }],
    getColor: () => data.color,
    rounded: true,
    widthMinPixels: 2,
  });
}
