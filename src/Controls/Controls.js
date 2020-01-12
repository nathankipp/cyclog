import uuid from 'uuid';
import React, { useState } from 'react';
import { NEW } from '../config';

// const dot = ` ${String.fromCharCode(183)} `;

const Controls = ({ viewport, path, setPath, saveRide }) => {
  const [name, setName] = useState(NEW);

  function save() {
    const data = {
      id: uuid(),
      rider: 'Nathan',
      order: 1,
      name,
      path,
      viewport: {
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom,
      },
    };
    return saveRide(data);
  }

  return (
    <div className="Controls">
      <div><b>Recording...</b></div>
      <div>
        <a onClick={() => setPath(path.slice(0, -1))}>undo last</a>
        <a onClick={() => {
          if (window.confirm('are you sure?')) {
            setPath([]);
          }}}>
          start over
        </a>
      </div>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} />
        <button onClick={save}>save</button>
      </div>
    </div>
  );
}

export default Controls;
