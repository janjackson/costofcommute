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

        vis.map = L.map('map').setView([52.19226, 0.15216], 13);

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(vis.map);

        // Add lines + markers for each location
        vis.routes.forEach((route, i) => {

            L.marker([route.waypoint[1].mappedPosition.latitude, route.waypoint[1].mappedPosition.longitude]).addTo(vis.map);
        })

        // Map fits all routes that we want to show
        const corner1 = [d3.max(vis.routes, (d) => d.boundingBox.topLeft.latitude), d3.min(vis.routes, (d) => d.boundingBox.topLeft.longitude)]
        const corner2 = [d3.min(vis.routes, (d) => d.boundingBox.bottomRight.latitude), d3.max(vis.routes, (d) => d.boundingBox.bottomRight.longitude)]
        vis.map.fitBounds([
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
        }).addTo(vis.map).on("dragend", (e) => {
            this.handleDrag(e.target._latlng)
        })

        vis.map.getBounds().pad(0)

        vis.update(vis.locations, vis.routes)
    }

    update(locations, routes) {
        const vis = this
        vis.locations = locations
        vis.routes = routes

        clearMap()

        const lengthScale = d3.scaleLinear()
            .domain(d3.extent(vis.locations, d => d.number))
            .range([2, 7])

        vis.routes.forEach((route, i) => {
            const coordinates = route.shape.map(point => point.split(","))
            L.polyline(coordinates, {
                weight: lengthScale(vis.locations[i].number)
            }).addTo(vis.map);
        })

        function clearMap() {
            for (var i in vis.map._layers) {
                if (vis.map._layers[i]._path != undefined) {
                    try {
                        vis.map.removeLayer(vis.map._layers[i]);
                    }
                    catch (e) {
                        console.log("problem with " + e + vis.map._layers[i]);
                    }
                }
            }
        }


/*         const lineGenerator = d3.line()
            .x(d => {
                console.log(applyLatLngToLayer(d))
                return applyLatLngToLayer(d).x
            })
            .y(d => applyLatLngToLayer(d).y)

        var svg = d3.select(vis.map.getPanes().overlayPane).append("svg")
            .attr("width", "1000px")
            .attr("height", "1000px")

        var g = svg.append("g").attr("class", "leaflet-zoom-hide");

        const lengthScale = d3.scaleLinear()
            .domain(d3.extent(this.locations, d => d.number))
            .range([2, 7]) */

        /*         var transform = d3.geo.transform({ point: projectPoint }),
                    path = d3.geo.path().projection(transform);
         */

/*         function projectPoint(x, y) {
            var point = vis.map.latLngToLayerPoint(new L.LatLng(y, x));
            this.stream.point(point.x, point.y);
        }

        var transform = d3.geoTransform({
            point: projectPoint
        });

        var d3path = d3.geoPath().projection(transform);

        const lines = g.selectAll(".line")
            .data(vis.routes)

        lines.enter().append("path")
            .attr("class", "line")
            .attr("d", d => lineGenerator(d.shape.map(point => (point.split(",")))))
            .attr("stroke", "grey")
            .attr("stroke-width", (d, i) => lengthScale(vis.locations[i].number))
            .attr("fill", "none")

        function applyLatLngToLayer(d) {
            var x = Number(d[1])
            var y = Number(d[0])
            return vis.map.latLngToLayerPoint(new L.LatLng(y, x))
        }

        vis.map.on("viewreset", reset)
        vis.map.on("move", reset)

        console.log(vis.map.getBounds())
        console.log(vis.map.getBounds().pad)

        function reset() {
            const corner1 = [d3.max(vis.routes, (d) => d.boundingBox.topLeft.latitude), d3.min(vis.routes, (d) => d.boundingBox.topLeft.longitude)]
            const corner2 = [d3.min(vis.routes, (d) => d.boundingBox.bottomRight.latitude), d3.max(vis.routes, (d) => d.boundingBox.bottomRight.longitude)]

            g.attr("transform", "translate(" + (-corner1[0] * 1.1) + "," + (-corner1[1] * 1.1) + ")");
        }
 */
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