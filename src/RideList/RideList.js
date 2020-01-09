import React, { useState } from 'react';

const RideList = ({ rides, selectRide }) => {
  const [selected, setSelected] = useState();

  return (
    <div class="RideList">
      <div>My Rides</div>
      { !rides.length && <div>Loading...</div> }
      {
        rides
          .concat({ name: 'Show All', viewport: {} })
          .map((ride,i) => (
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
    </div>
  );

};

export default RideList;
