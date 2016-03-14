var stops = {
    'Habana': {},
    'Terminal de Omnibus Habana': {},
    'Varadero': {},
    'Viñales': {},
    'Las Terrazas': {},
    'Pinar del Rio': {},
    'Matanzas': {},
    'Aeropuerto de Varadero': {},
    'Playa Girón': {},
    'Cienfuegos': {},
    'Trinidad': {}
};

var routes = [];

// Viñales – Habana
routes.push([
    ['Viñales', '9:10'],
    ['Pinar del Rio', '10:00'],
    ['Habana', '12:35']
]);
routes.push([
    ['Viñales', '14:00'],
    ['Pinar del Rio', '14:50'],
    ['Las Terrazas', '16:40'],
    ['Habana', '18:05']
]);

// Habana - Varadero
routes.push([
    ['Habana', '06:00'],
    ['Terminal de Omnibus Habana', '06:20'],
    ['Matanzas', '08:20'],
    ['Aeropuerto de Varadero', '08:55'],
    ['Varadero', '09:25']
]);
routes.push([
    ['Habana', '08:00'],
    ['Matanzas', '10:10'],
    ['Aeropuerto de Varadero', '10:45'],
    ['Varadero', '11:15']
]);
routes.push([
    ['Habana', '13:00'],
    ['Matanzas', '14:55'],
    ['Aeropuerto de Varadero', '15:30'],
    ['Varadero', '16:00']
]);
routes.push([
    ['Habana', '17:30'],
    ['Matanzas', '19:40'],
    ['Varadero', '20:25']
]);

// Habana - Trinidad
routes.push([
    ['Habana', '07:00'],
    ['Playa Girón', '10:30'],
    ['Cienfuegos', '12:10'],
    ['Trinidad', '13:50']
]);
routes.push([
    ['Habana', '10:45'],
    ['Cienfuegos', '15:10'],
    ['Trinidad', '16:50']
]);
routes.push([
    ['Habana', '14:15'],
    ['Cienfuegos', '17:55'],
    ['Trinidad', '19:35']
]);


var schedule = generateSchedule(routes);
printSchedule(schedule);

var veryFromName = 'Viñales';
console.log('Routes from ' + veryFromName);
printItinerariesFrom(schedule, veryFromName);


function stringTimeToDate(string) {
    var date = new Date(),
        hhmm = string.split(':');

    date.setHours(hhmm[0], hhmm[1], 0, 0);

    return date;
}

function formatTime(date) {
    var hours = date.getHours(),
        minutes = date.getMinutes();

    if (minutes < 10) { minutes = '0'+minutes; }
    return '' + hours + ':' + minutes;
}

function generateSchedule(routes) {
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

        var routeName = route[0].name + ' – ' + route[route.length-1].name;

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
                    to: to.name,
                    route: routeName
                });
            }
        }
    });

    return schedule;
}

function printSchedule(schedule) {
    for (var fromName in schedule) {
        console.log(fromName);

        var itineraries = schedule[fromName];
        itineraries.sort(function (a, b) {
            return a.departure - b.departure;
        });

        itineraries.forEach(function (itinerary) {
            console.log(
                '\t' + formatTime(itinerary.departure) + ' – ' + formatTime(itinerary.arrival) +
                ' ' + itinerary.to +  ' (' + itinerary.route + ')'
            );
        });
    }
}

function printItinerariesFrom(schedule, fromName) {
    var itineraries = getItinerariesFrom(schedule, fromName);

    for (var i = 0; i < itineraries.length; i++) {
        console.log(
            itineraries[i]
                .map(function (leg) {
                    return formatTime(leg.departure) + ' – ' + formatTime(leg.arrival) + ' ' + leg.to;
                })
                .join(' => ')
        );
    }
}

function getItinerariesFrom(schedule, fromName, after) {
    var itineraries = [];

    if (!after) {
        after = new Date();
        after.setHours(0, 0, 0, 0);
    }

    if (schedule[fromName]) {
        var legs = schedule[fromName].filter(function (leg) {
            return leg.departure > after;
        });

        legs.sort(function (a, b) {
            return a.departure - b.departure;
        });

        for (var i = 0; i < legs.length; i++) {
            var leg = legs[i],
                nextItineraries = getItinerariesFrom(schedule, leg.to, leg.arrival);

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
}