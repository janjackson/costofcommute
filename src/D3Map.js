import * as d3 from 'd3'
import L from 'leaflet'
import 'leaflet-routing-machine';

/* 
    Expected inputs:
    element - ID of element to append map to
    home - Object - { lat: ###, lng: ### }
    locations - Array - [{ lat: ###, lng: ### }, { lat: ###, lng: ### }, { lat: ###, lng: ### }, ...] 
*/
const D3Map = (routes, home, locations) => {
    var map = L.map('map').setView([52.19226, 0.15216], 13);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    Promise.all(routes).then((routes) => {
        routes.forEach((route, i) => {
            const coordinates = route.shape.map(point => point.split(","))
            L.polyline(coordinates, {
                weight: (i * 3) + 2
            }).addTo(map);
            L.marker([route.waypoint[1].mappedPosition.latitude, route.waypoint[1].mappedPosition.longitude]).addTo(map);
        })
    })

    var homeIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Home_font_awesome.svg/512px-Home_font_awesome.svg.png',
        iconSize: [50, 50]
    }); 

    L.marker([home.lat, home.lng], {
        icon: homeIcon
    }).addTo(map);


}

export default D3Map