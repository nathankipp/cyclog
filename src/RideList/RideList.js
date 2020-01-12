import React, { useState } from 'react';

const RideList = ({ rides, selectRide }) => {
  const [selected, setSelected] = useState();

  return (
    <div className="RideList">
      <div>My Rides</div>
      { !rides.length && <div>Loading...</div> }
      {
        rides.map((ride,i) => (
          <div
            key={ride.name}
            className={i === selected ? 'selected': ''}
          >
            <a onClick={() => {
              setSelected(i);
              selectRide(ride);
            }}>
              {ride.name}
            </a>
          </div>
        ))
      }
      <div><a onClick={() => {
        setSelected();
        selectRide();
      }}>Show All</a></div>
    </div>
  );

};

export default RideList;
