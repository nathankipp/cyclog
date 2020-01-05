import { MAPBOX_ACCESS_TOKEN } from '../config';

export function fetchPath(coordinates) {
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
    .then(({ matchings }) => {
      let path = [];
      matchings.map(({ geometry: { coordinates } }) => {
        path = path.concat(coordinates);
      });
      return path;
    });
}
