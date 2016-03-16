define(['stops', 'routes'], function (stops, routes) {

    function formatTime(date) {
        var hours = date.getHours(),
            minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return '' + hours + ':' + minutes;
    }


    var Schedule = function (routes) {
        this._schedule = this._generateSchedule(routes);
    };

    Schedule.prototype._generateSchedule = function (routes) {
        var schedule = {};

        routes.forEach(function (route, routeId) {

            var routeName = route[0].name + ' – ' + route[route.length - 1].name;

            for (var i = 0; i < route.length - 1; i++) {
                var from = route[i],
                    to = route[i+1];

                if (!schedule.hasOwnProperty(from.name)) {
                    schedule[from.name] = [];
                }

                schedule[from.name].push({
                    departure: from.time,
                    arrival: to.time,
                    from: from.name,
                    to: to.name,
                    routeId: routeId,
                    route: routeName
                });
            }
        });

        return schedule;
    };

    Schedule.prototype.printSchedule = function () {
        for (var fromName in this._schedule) {
            console.log(fromName);

            var itineraries = this._schedule[fromName];
            itineraries.sort(function (a, b) {
                return a.departure - b.departure;
            });

            itineraries.forEach(function (itinerary) {
                console.log(
                    '\t' + formatTime(itinerary.departure) + ' – ' + formatTime(itinerary.arrival) +
                    ' ' + itinerary.to + ' (' + itinerary.route + ')'
                );
            });
        }
    };

    Schedule.prototype.getItinerariesFrom = function (fromName, after) {
        var itineraries = [];

        if (!after) {
            after = new Date();
            after.setHours(0, 0, 0, 0);
        }

        if (this._schedule[fromName]) {
            var legs = this._schedule[fromName].filter(function (leg) {
                return leg.departure >= after;
            });

            legs.sort(function (a, b) {
                return a.departure - b.departure;
            });

            for (var i = 0; i < legs.length; i++) {
                var leg = legs[i],
                    nextItineraries = this.getItinerariesFrom(leg.to, leg.arrival);

                itineraries.push([leg]);

                if (nextItineraries.length > 0) {
                    for (var j = 0; j < nextItineraries.length; j++) {
                        itineraries.push(
                            [leg].concat(nextItineraries[j])
                        );
                    }
                }
            }
        }

        return itineraries;
    };

    Schedule.prototype.printItineraries = function (itineraries) {
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

            result += directLegs
                .map(function (leg) {
                    return formatTime(leg.departure) + ' – ' + formatTime(leg.arrival) + ' ' + leg.to;
                })
                .join(' => ');

            result += '\n';
        }

        return result;
    };

    return new Schedule(routes);
});