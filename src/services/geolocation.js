
const geolocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latUser = position.coords.latitude;
        const lonUser = position.coords.longitude;
        resolve({latUser, lonUser});
    });
});

export default geolocation;
