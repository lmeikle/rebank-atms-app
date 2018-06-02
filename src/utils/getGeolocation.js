let geolocation = null;

export default function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation not supported');
    }

    if (geolocation) {
      resolve(geolocation);
    } else {
      navigator.geolocation.getCurrentPosition(positon => {
        geolocation = positon;
        console.log('geolocation', geolocation);
        resolve(geolocation);
      });
    }
  });
}
