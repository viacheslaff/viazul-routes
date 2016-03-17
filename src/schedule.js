define(['stops', 'routes'], function (stops, routes) {

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

    Schedule.prototype.getItinerariesFrom = function (fromName, after, forbiddenStops) {
        var itineraries = [];

        if (!after) {
            after = new Date();
            after.setHours(0, 0, 0, 0);
        }

        if (!forbiddenStops) {
            forbiddenStops = [];
        }

        if (this._schedule[fromName]) {
            var legs = this._schedule[fromName].filter(function (leg) {
                return leg.departure >= after &&
                       (forbiddenStops.indexOf(leg.to) === -1);
            });

            legs.sort(function (a, b) {
                return a.departure - b.departure;
            });

            for (var i = 0; i < legs.length; i++) {
                var leg = legs[i],
                    nextItineraries = this.getItinerariesFrom(leg.to, leg.arrival, forbiddenStops.concat(leg.from));

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


    return new Schedule(routes);
});