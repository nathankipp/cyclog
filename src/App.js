import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import d from './data';
import { MAPBOX_ACCESS_TOKEN, VIEWPORT_USA } from './config';
import { getLayer } from './utils';
import Controls from './Controls';

const data = [ ...d ];
const layers = data.map(getLayer);
const NEW = "NEW"

const App = () => {
  const [viewport, setViewport] = useState(VIEWPORT_USA);
  const [path, setPath] = useState([]);

  const newId = layers.find(p => p.id === NEW);
  if (path.length) {
    const newLayer = getLayer({
      name: NEW,
      path,
      viewport
    });
    if (!newId) {
      layers.push(newLayer);
    } else {
      layers[layers.length - 1] = newLayer;
    }
  } else if (newId) {
    layers.pop();
  }

  return (
    <>
      <Controls
        data={data}
        viewport={viewport}
        setViewport={setViewport}
        path={path}
        setPath={setPath}
      />
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
        mapStyle="mapbox://styles/mapbox/light-v10"
        height="100vh"
        width="100vw"
      >
        <DeckGL
          viewState={viewport}
          layers={[...layers]}
        />
      </MapGL>
    </>
  );
};

export default App;
