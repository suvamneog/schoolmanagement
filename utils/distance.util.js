/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param {number} lat1 - First latitude
 * @param {number} lon1 - First longitude
 * @param {number} lat2 - Second latitude
 * @param {number} lon2 - Second longitude
 * @returns {number} - Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  // Convert latitude and longitude from degrees to radians
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const radlon1 = (Math.PI * lon1) / 180;
  const radlon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dlon = radlon2 - radlon1;
  const dlat = radlat2 - radlat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  
  // Radius of earth in kilometers
  const r = 6371;
  
  // Calculate the result
  return c * r;
}

/**
 * Sort schools by distance from a given coordinate
 * @param {Object[]} schools - Array of school objects
 * @param {number} userLat - User's latitude
 * @param {number} userLon - User's longitude
 * @returns {Object[]} - Sorted array of schools with distance
 */
function sortSchoolsByDistance(schools, userLat, userLon) {
  // Add distance to each school
  const schoolsWithDistance = schools.map(school => {
    const distance = calculateDistance(
      userLat,
      userLon,
      school.latitude,
      school.longitude
    );
    return { ...school, distance: parseFloat(distance.toFixed(2)) };
  });

  // Sort by distance (ascending)
  return schoolsWithDistance.sort((a, b) => a.distance - b.distance);
}

module.exports = {
  calculateDistance,
  sortSchoolsByDistance
};