import React from 'react';

const dot = ` ${String.fromCharCode(183)} `;

const Controls = ({ viewport, path, setPath }) => (
  <div className="Controls">
    <b>Recording...</b>
    <a onClick={() => setPath(path.slice(0, -1))}>undo</a>
    {dot}
    <a onClick={() => {if (window.confirm('are you sure?')) setPath([]);}}>
      reset
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
  </div>
);

export default Controls;
