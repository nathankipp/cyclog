import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { MAPBOX_ACCESS_TOKEN } from '../config';

const Map = ({
  viewport,
  setViewport,
  path,
  setPath,
  layers
}) => (
  <MapGL
    {...viewport}
    onClick={e => {
      setPath([ ...path, e.lngLat]);
      setViewport({
          ...viewport,
          longitude: e.lngLat[0],
          latitude: e.lngLat[1],
        });
      }}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      height="100%"
      width="100%"
    >
      <DeckGL
        viewState={viewport}
        layers={layers}
      />
  </MapGL>
);

export default Map;
