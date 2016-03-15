define([
    'stops',
    'schedule',
    'async!http://maps.google.com/maps/api/js?sensor=false'
], function(stops, schedule) {

    var map,
        currentFrom,
        markers = {},
        polylines = [],
        itineraries = [],
        reachableStops = [],
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
                title: name,
                icon: getIcon(name),
            });

            markers[name].addListener('click', selectFrom.bind(this, name));
        }
    }

    function getIcon(stopName) {
        var icon = {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            fillColor: 'grey',
            fillOpacity: 1,
            strokeColor: 'black',
            strokeWeight: 1
        };

        if (stopName === currentFrom) {
            icon.fillColor = 'orange';
        }
        else if (reachableStops.indexOf(stopName) !== -1) {
            icon.fillColor = 'green';
        }

        return icon;
    }

    function drawPolylines() {
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        polylines = [];

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


    function selectFrom(from) {
        currentFrom = from;
        itineraries = schedule.getItinerariesFrom(currentFrom);

        reachableStops = [];

        itineraries.forEach(function(itinerary) {
            itinerary.forEach(function(leg) {
                if (reachableStops.indexOf(leg.to) === -1) {
                    reachableStops.push(leg.to)
                }
            })
        });

        logInfo();
        redrawMap();
    }

    redrawMap();
});