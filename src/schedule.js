define(['stops', 'routes', 'ui'], function (stops, routes, ui) {

    function stringTimeToDate(string) {
        var date = new Date(),
            hhmm = string.split(':');

        date.setHours(hhmm[0], hhmm[1], 0, 0);

        return date;
    }

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

        routes.forEach(function (route) {

            route = route.map(function (stop) {
                if (!stops.hasOwnProperty(stop[0])) {
                    throw new Error('Unknown stop: ' + stop[0]);
                }

                return {
                    name: stop[0],
                    time: stringTimeToDate(stop[1])
                };
            });

            var routeName = route[0].name + ' – ' + route[route.length - 1].name;

            for (var i = 0; i < route.length - 1; i++) {
                var from = route[i];

                if (!schedule.hasOwnProperty(from.name)) {
                    schedule[from.name] = [];
                }

                for (var j = i + 1; j < route.length; j++) {
                    var to = route[j];

                    schedule[from.name].push({
                        departure: from.time,
                        arrival: to.time,
                        from: from.name,
                        to: to.name,
                        route: routeName
                    });
                }
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
                return leg.departure > after;
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

    Schedule.prototype.printItinerariesFrom = function (fromName) {
        var itineraries = this.getItinerariesFrom(fromName),
            result = '';

        for (var i = 0; i < itineraries.length; i++) {
            result += itineraries[i]
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