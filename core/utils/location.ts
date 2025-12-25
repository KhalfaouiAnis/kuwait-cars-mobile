const R = 6371.0;
const toRadians = (deg: number) => deg * (Math.PI / 180);

export function haversineDistance(
  lat1?: number,
  lon1?: number,
  lat2?: number,
  lon2?: number
) {

  if(!lat1 || !lat2 || !lon1 || !lon2) return 0
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  const dlon = lon2Rad - lon1Rad;
  const dlat = lat2Rad - lat1Rad;

  const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dlon / 2) *
      Math.sin(dlon / 2);

  return Math.floor(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R)
}

// const dc_lat = 36.828537825339424;
// const dc_lon = 10.198356471955776;
// const beijing_lat = 36.835835691865796;
// const beijing_lon = 10.208898559212685;

// const distanceInKM = haversineDistance(
//   dc_lat,
//   dc_lon,
//   beijing_lat,
//   beijing_lon
// );
