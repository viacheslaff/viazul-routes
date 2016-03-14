define([
    'stops',
    'schedule',
    'async!http://maps.google.com/maps/api/js?sensor=false'
], function(stops, schedule) {

    var map,
        currentFrom,
        markers = {},
        polylines = [],
        infoElement = document.getElementById('info');

    map = new google.maps.Map(document.getElementById('main-map'), {
        center: stops['Habana'].position,
        zoom: 8
    });

    function redrawMap() {
        drawMarkers();
        drawPolylines();
    }

    function drawMarkers() {
        for (var name in markers) {
            markers[name].setMap(null);
            delete markers[name];
        }

        for (var name in stops) {
            markers[name] = new google.maps.Marker({
                position: stops[name].position,
                map: map,
                title: name
            });

            markers[name].addListener('click', selectFrom.bind(this, name));
        }
    }

    function drawPolylines() {
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        polylines = [];

        var itineraries = schedule.getItinerariesFrom(currentFrom);

        for (var i = 0; i < itineraries.length; i++) {
            var legs = itineraries[i],
                path = [];

            path.push(stops[legs[0].from].position);

            for (var j = 0; j < legs.length; j++) {
                path.push(stops[legs[j].to].position);
            }

            var polyline = new google.maps.Polyline({
                path: path,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            polyline.setMap(map);

            polylines.push(polyline);
        }
    }

    function logInfo() {
        if (currentFrom) {
            infoElement.innerHTML =
                'Routes from ' + currentFrom + '\n' +
                schedule.printItinerariesFrom(currentFrom);
        }
        else {
            infoElement.innerHTML = '';
        }
    }

    var flightPlanCoordinates = [
        {lat: 37.772, lng: -122.214},
        {lat: 21.291, lng: -157.821},
        {lat: -18.142, lng: 178.431},
        {lat: -27.467, lng: 153.027}
    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);


    function selectFrom(from) {
        currentFrom = from;
        logInfo();
        redrawMap();
    }

    redrawMap();
});