define(['stops'], function (stops) {
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

    // Varadero - Trinidad
    routes.push([
        ['Varadero', '07:30'],
        ['Santa Clara', '11:10'],
        ['Sancti Spiritus', '12:40'],
        ['Trinidad', '14:05']
    ]);

    // Trinidad - Varadero
    routes.push([
        ['Trinidad', '15:00'],
        ['Cienfuegos', '16:40'],
        ['Santa Clara', '18:00'],
        ['Entronque de Jagüey', '19:50'],
        ['Varadero', '21:25']
    ]);

    // Baracoa - Santiago de Cuba
    routes.push([
        ['Baracoa', '14:00'],
        ['Guantanamo', '17:35'],
        ['Santiago de Cuba', '19:00']
    ]);

    // Santiago de Cuba - Baracoa
    routes.push([
        ['Santiago de Cuba', '08:00'],
        ['Guantanamo', '09:25'],
        ['Baracoa', '13:00']
    ]);

    // Viñales - Trinidad
    routes.push([
        ['Viñales', '14:00'],
        ['Pinar del Rio', '14:50'],
        ['Cienfuegos', '16:40'],
        ['Trinidad', '18:05']
    ]);

    function stringTimeToDate(string) {
        var date = new Date(),
            hhmm = string.split(':');

        date.setHours(hhmm[0], hhmm[1], 0, 0);

        return date;
    }

    routes = routes.map(function (route) {
        return route.map(function (stop) {
            if (!stops.hasOwnProperty(stop[0])) {
                throw new Error('Unknown stop: ' + stop[0]);
            }

            return {
                name: stop[0],
                time: stringTimeToDate(stop[1])
            };
        });
    });

    return routes;
});