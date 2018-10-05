import * as d3 from 'd3'
import L from 'leaflet'
import 'leaflet-routing-machine';

class LeafletMap {
    constructor(routes, home, locations, handleDrag) {
        this.routes = routes
        this.home = home
        this.locations = locations
        this.handleDrag = handleDrag

        this.initialize()
    }

    initialize() {
        const vis = this

        const map = L.map('map').setView([52.19226, 0.15216], 13);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const lengthScale = d3.scaleLinear()
            .domain(d3.extent(this.locations, d => d.number))
            .range([2, 7])

        console.log(vis.routes)
        



        // Add lines + markers for each location
        vis.routes.forEach((route, i) => {

            L.marker([route.waypoint[1].mappedPosition.latitude, route.waypoint[1].mappedPosition.longitude]).addTo(map);
        })

        // Map fits all routes that we want to show
        const corner1 = [d3.max(vis.routes, (d) => d.boundingBox.topLeft.latitude), d3.min(vis.routes, (d) => d.boundingBox.topLeft.longitude)]
        const corner2 = [d3.min(vis.routes, (d) => d.boundingBox.bottomRight.latitude), d3.max(vis.routes, (d) => d.boundingBox.bottomRight.longitude)]
        map.fitBounds([
            corner1,
            corner2
        ])

        const homeIcon = L.icon({
            iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Home_font_awesome.svg/512px-Home_font_awesome.svg.png',
            iconSize: [50, 50]
        });

        L.marker([this.home.lat, this.home.lng], {
            icon: homeIcon,
            draggable: true,
            autoPan: true
        }).addTo(map).on("dragend", (e) => {
            this.handleDrag(e.target._latlng)
        })
    }

    update() {
/*         const vis = this

        const lineGenerator = d3.line()

        var svg = d3.select(map.getPanes().overlayPane).append("svg"),
            g = svg.append("g").attr("class", "leaflet-zoom-hide");

        function projectPoint(x, y) {
            var point = map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

        const lines = d3.selectAll("") */

/*         const coordinates = route.shape.map(point => point.split(","))
        L.polyline(coordinates, {
            weight: lengthScale(this.locations[i].number)
        }).addTo(map); */
    }
}

/* const D3Map = (routes, home, locations, handleDrag) => {
    const map = L.map('map').setView([52.19226, 0.15216], 13);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    Promise.all(routes).then((routes) => {
        const lengthScale = d3.scaleLinear()
            .domain(d3.extent(locations, d => d.number))
            .range([2, 7])

        // Add lines + markers for each location
        routes.forEach((route, i) => {
            const coordinates = route.shape.map(point => point.split(","))
            L.polyline(coordinates, {
                weight: lengthScale(locations[i].number)
            }).addTo(map);
            L.marker([route.waypoint[1].mappedPosition.latitude, route.waypoint[1].mappedPosition.longitude]).addTo(map);
        })

        // Map fits all routes that we want to show
        const corner1 = [d3.max(routes, (d) => d.boundingBox.topLeft.latitude), d3.min(routes, (d) => d.boundingBox.topLeft.longitude)]
        const corner2 = [d3.min(routes, (d) => d.boundingBox.bottomRight.latitude), d3.max(routes, (d) => d.boundingBox.bottomRight.longitude)]
        map.fitBounds([
            corner1,
            corner2
        ])
    })

    const homeIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Home_font_awesome.svg/512px-Home_font_awesome.svg.png',
        iconSize: [50, 50]
    });

    L.marker([home.lat, home.lng], {
        icon: homeIcon,
        draggable: true,
        autoPan: true
    }).addTo(map).on("dragend", (e) => {
        handleDrag(e.target._latlng)
    })

}
 */
export default LeafletMap