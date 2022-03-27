let data = [];
db.collection("locations").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let dat = doc.data();
        dat.name = dat.event;
        delete dat.event;
        data.push(dat);
    });
    run();
});
/*let data = [
    {
        "address":"1415 Rhoadmiller St, Richmond, VA 23220",
        "latitude":37.56651,
        "longitude":-77.45572,
        "name":"Feed More",
        "description":"You can get food here on 3/27/2022, from 6pm-8pm."
    },
    {
        "address":"1021 Oliver Hill Way, Richmond, VA 23219",
        "latitude":37.542561,
        "longitude":-77.423912,
        "name":"Capital Area Partnership Uplifting People (CAPUP)",
        "description":"You can get food here on 3/28/2022, from 5pm-7pm"
    },
    {
        "address":"400 Chimborazo Blvd, Richmond, VA 23223",
        "latitude":37.5279,
        "longitude":-77.4099,
        "name":"Masjid Bilal",
        "description":"You can get food here on 3/27/2022, from 3pm-5pm"
    }
]*/
function run(){
    var map = L.map('map').setView([37.56651, -77.45572], 13);
    icon = L.divIcon({
        className: 'custom-div-icon',
            html: "<div style='background-color:#4838cc;' class='marker-pin'></div><i class='fa-solid fa-wheat-awn'></i>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibHVrZXRyZW5hbWFuIiwiYSI6ImNsMTg4NmduZzA5cGszYnVsYmM1MjZ0d2UifQ.sIOH_Wp8owixptV9YIau4g'
    }).addTo(map);
    function generateLocation(obj){
        console.log(obj);
        var marker = L.marker([obj.latitude, obj.longitude],{
            title:"Kroger's Grocery Store",
            "icon":icon
        }).addTo(map);
        var popup = L.popup({
            closeButton: false,
            autoClose: false
          })
          .setLatLng([obj.latitude, obj.longitude])
          .setContent(`
          <div><h1>${obj.name}</h1>
            <p>You are able to get food at this location.</p>
            <p>${obj.description}</p>
            <p>Available from ${obj["start-time"]} to ${obj["end-time"]}</p>
            <p>Click <a target = "_blank" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(obj.address)}">here</a> for direcitons.</p>
          </div>`);
        marker.bindPopup(popup);
    }
    data.forEach(function(val){
        generateLocation(val);
    })
    
}