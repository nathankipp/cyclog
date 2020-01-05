import React from 'react';
import { VIEWPORT_USA } from '../config';

const dot = ` ${String.fromCharCode(183)} `;

const Controls = ({ data, viewport, setViewport, path = [], setPath }) => (
  <div className="Controls">
    {
      data.map((d,i) =>
        <div key={d.name} style={{color: `rgb(${d.color[0]}, ${d.color[1]}, ${d.color[2]})`}}>
          <a onClick={() => setViewport({ ...VIEWPORT_USA, ...d.viewport })}>
            {d.name}
          </a>
        </div>
      )
    }
    { !!path.length && (
      <>
        <hr />
        Recording:
        {' '}
        <a onClick={() => setPath(path.slice(0, -1))}>undo last</a>
        {dot}
        <a onClick={() => {if (window.confirm('are you sure?')) setPath([]);}}>
          clear all
        </a>
        {dot}
        <a onClick={() => {
          const p = {
            name: 'foo',
            path,
            viewport: {
              latitude: viewport.latitude,
              longitude: viewport.longitude,
              zoom: viewport.zoom,
            },
          };
          console.log(JSON.stringify(p, '', 2))
          alert('open the console to see your data');
        }}>
          done
        </a>
      </>
    )}
  </div>
);

export default Controls;
