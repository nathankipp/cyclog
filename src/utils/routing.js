const hash = () => window.location.hash;
const routing = {
  getRidersFromUrl: (match) => {
    const { riders } = match.params;
    // const riders = hash().match(/#\/([\w,]*)\//);
    return riders && riders.split(',');
  },
  getSelectedRideFromUrl: (rides) => rides.find(ride =>
    hash().match(new RegExp(`/${ride.id}$`))),
  updateRidersHash: (riders) => {
    const r = riders.join(',');
    let newHash;
    if (hash()) {
      newHash = hash().replace(/#\/[\w,]*\//, `/${r}/`);
    } else {
      newHash = `/${r}/`;
    }
    window.location.hash = newHash;
  },
  updateRideHash: (ride) =>
    window.location.hash = hash().replace(/\/[\w\d-]*$/, `/${ride.id}`)
}

export default routing;
