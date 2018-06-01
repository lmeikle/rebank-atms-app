/**
 * Taken from
 * https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
 */
export default function calculateDistance(lat1, lon1, lat2, lon2)
{
	function toRad(n)
	{
		return n * Math.PI / 180;
	}

	let R = 6371; // km
	let dLat = toRad(lat2 - lat1);
	let dLon = toRad(lon2 - lon1);
	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
		Math.cos(toRad(lat2)) *
		Math.sin(dLon / 2) *
		Math.sin(dLon / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
}