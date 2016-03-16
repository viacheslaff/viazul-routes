define([
    'stops',
    'schedule',
    'async!http://maps.google.com/maps/api/js?sensor=false'
], function(stops, schedule) {

    var map,
        currentFrom,
        currentTo,
        markers = {},
        polylines = [],
        itineraries = [],
        changesToStop = {},
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
                icon: getIcon(name)
            });

            markers[name].addListener('click', onMarkerClick.bind(this, name));
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
        else if (stopName === currentTo) {
            icon.fillColor = 'red';
        }
        else if (changesToStop.hasOwnProperty(stopName)) {
            icon.fillColor = changesToStop[stopName] === 0 ? 'lime' : 'green' ;
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
                '<h3>Routes from ' + currentFrom + (currentTo ? ' to ' +  currentTo: '') + '</h3>\n' +
                printItineraries(itineraries);
        }
        else {
            infoElement.innerHTML = '';
        }
    }

    function printItineraries(itineraries) {
        var result = '';

        for (var i = 0; i < itineraries.length; i++) {
            var directLegs = itineraries[i].reduce(
                function (legs, newLeg) {
                    var lastLeg = legs[legs.length-1];

                    if (lastLeg && lastLeg.routeId === newLeg.routeId &&
                        lastLeg.arrival === newLeg.departure && lastLeg.to === newLeg.from) {

                        legs[legs.length-1] = {
                            departure: lastLeg.departure,
                            from: lastLeg.from,
                            arrival: newLeg.arrival,
                            to: newLeg.to,
                            routeId: lastLeg.routeId,
                            route: lastLeg.route
                        };
                    }
                    else {
                        legs.push(newLeg);
                    }

                    return legs;
                },
                []
            );

            result += '<p>';
            result += directLegs
                .map(function (leg) {
                    return formatTime(leg.departure) + ' – ' + formatTime(leg.arrival) + ' ' + leg.to;
                })
                .join(' => ');

            result += '</p>\n';
        }

        return result;
    }

    function formatTime(date) {
        var hours = date.getHours(),
            minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return '' + hours + ':' + minutes;
    }

    function onMarkerClick(stopName) {
        var from,
            to;

        if (!currentFrom || currentTo) {
            from = stopName;
            to = undefined;
        }
        else {
            from = currentFrom;
            to = stopName;
        }

        selectFromTo(from, to);
    }

    function selectFromTo(from, to) {
        currentFrom = from;
        currentTo = to;
        itineraries = schedule.getItinerariesFrom(currentFrom);

        if (currentTo) {
            itineraries = itineraries.filter(function (itinerary) {
                return to === itinerary[itinerary.length-1].to;
            });
        }

        changesToStop = {};

        itineraries.forEach(function(itinerary) {
            var routeIds = [],
                to = itinerary[itinerary.length-1].to;

            itinerary.forEach(function(leg) {
                if (routeIds.indexOf(leg.routeId) === -1) {
                    routeIds.push(leg.routeId)
                }
            });

            if (!changesToStop.hasOwnProperty(to) || changesToStop[to] > routeIds.length-1) {
                changesToStop[to] = routeIds.length-1;
            }
        });

        logInfo();
        redrawMap();
    }

    redrawMap();
});