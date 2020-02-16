const hash = () => window.location.hash;

export default {
  getRidersFromUrl: () => {
    const riders = hash().match(/#\/([\w,]*)\//);
    return riders && riders[1] && riders[1].split(',');
  },
  getSelectedRideFromUrl: (rides) => rides.find(ride =>
    hash().match(new RegExp(`/${ride.id}$`))),
  updateRidersHash: (riders) =>
    window.location.hash = hash().replace(/\/[\w,]*\//, `/${riders.join(',')}/`),
  updateRideHash: (ride) =>
    window.location.hash = hash().replace(/\/[\w\d-]*$/, `/${ride.id}`)
}
