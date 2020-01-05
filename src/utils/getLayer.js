import { PathLayer } from '@deck.gl/layers';
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

export function getLayer(data) {
  // const path = data.path.length > 1
  //   ? getPath(data)
  //   : [{ path: data.path }];

  return new PathLayer({
    id: data.name,
    data: [{ path: data.path }],
    getColor: () => data.color || [0, 0, 0],
    rounded: true,
    widthMinPixels: 2,
  });
}
