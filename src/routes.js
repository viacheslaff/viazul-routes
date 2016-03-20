define(['stops'], function (stops) {
    var routes = [];

    // Varadero - Trinidad
    routes.push([
        ['Varadero', '07:30'],
        ['Santa Clara', '11:15'],
        ['Sancti Spíritus', '12:45'],
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
        ['Guantánamo', '17:35'],
        ['Santiago de Cuba', '19:00']
    ]);

    // Santiago de Cuba - Baracoa
    routes.push([
        ['Santiago de Cuba', '08:00'],
        ['Guantánamo', '09:25'],
        ['Baracoa', '13:00']
    ]);

    // Viñales - Trinidad
    routes.push([
        ['Viñales', '06:45'],
        ['Pinar del Río', '07:35'],
        ['Cienfuegos', '14:35'],
        ['Trinidad', '16:15']
    ]);

    // Santiago de Cuba - Varadero
    routes.push([
        ['Santiago de Cuba', '20:00'],
        ['Bayamo', '22:15'],
        ['Holguín', '23:40'],
        ['Las Tunas', '01:00'],
        ['Camagüey', '03:05'],
        ['Ciego de Avila', '05:05'],
        ['Sancti Spíritus', '06:30'],
        ['Santa Clara', '08:10'],
        ['Varadero', '11:35']
    ]);

    // Varadero - Santiago de Cuba
    routes.push([
        ['Varadero', '21:45'],
        ['Cárdenas', '22:10'],
        ['Santa Clara', '01:20'],
        ['Sancti Spíritus', '02:55'],
        ['Ciego de Avila', '04:20'],
        ['Camagüey', '06:20'],
        ['Las Tunas', '08:20'],
        ['Holguín', '09:45'],
        ['Bayamo', '11:10'],
        ['Santiago de Cuba', '13:25']
    ]);

    // Santiago de Cuba - Trinidad
    routes.push([
        ['Santiago de Cuba', '19:30'],
        ['Bayamo', '21:45'],
        ['Holguín', '23:10'],
        ['Las Tunas', '00:35'],
        ['Camagüey', '02:40'],
        ['Ciego de Avila', '04:40'],
        ['Sancti Spíritus', '06:05'],
        ['Trinidad', '07:30']
    ]);

    // Trinidad - Santiago de Cuba
    routes.push([
        ['Trinidad', '08:00'],
        ['Sancti Spíritus', '09:25'],
        ['Ciego de Avila', '10:50'],
        ['Camagüey', '13:15'],
        ['Las Tunas', '15:20'],
        ['Holguín', '16:40'],
        ['Bayamo', '18:15'],
        ['Santiago de Cuba', '20:30']
    ]);

    // Santiago de Cuba - Habana
    routes.push([
        ['Santiago de Cuba', '06:30'],
        ['Bayamo', '08:45'],
        ['Holguín', '10:05'],
        ['Las Tunas', '12:15'],
        ['Camagüey', '14:20'],
        ['Ciego de Avila', '16:20'],
        ['Sancti Spíritus', '17:45'],
        ['Santa Clara', '19:45'],
        ['Habana', '23:35']
    ]);
    routes.push([
        ['Santiago de Cuba', '16:00'],
        ['Bayamo', '18:15'],
        ['Las Tunas', '21:35'],
        ['Camagüey', '23:40'],
        ['Ciego de Avila', '01:40'],
        ['Sancti Spíritus', '03:05'],
        ['Santa Clara', '04:35'],
        ['Habana', '08:25']
    ]);
    routes.push([
        ['Santiago de Cuba', '00:30'],
        ['Bayamo', '02:45'],
        ['Holguín', '20:15'],
        ['Las Tunas', '04:20'],
        ['Camagüey', '06:25'],
        ['Ciego de Avila', '08:30'],
        ['Sancti Spíritus', '09:55'],
        ['Santa Clara', '11:25'],
        ['Habana', '16:05']
    ]);

    // Habana - Santiago de Cuba
    routes.push([
        ['Habana', '06:30'],
        ['Santa Clara', '10:20'],
        ['Sancti Spíritus', '11:50'],
        ['Ciego de Avila', '13:55'],
        ['Camagüey', '15:55'],
        ['Las Tunas', '18:00'],
        ['Bayamo', '20:10'],
        ['Santiago de Cuba', '22:25']
    ]);
    routes.push([
        ['Habana', '15:00'],
        ['Santa Clara', '19:30'],
        ['Sancti Spíritus', '21:00'],
        ['Ciego de Avila', '22:25'],
        ['Camagüey', '00:25'],
        ['Las Tunas', '02:30'],
        ['Holguín', '03:50'],
        ['Bayamo', '05:15'],
        ['Santiago de Cuba', '07:30']
    ]);
    routes.push([
        ['Habana', '00:30'],
        ['Santa Clara', '04:25'],
        ['Sancti Spíritus', '05:55'],
        ['Ciego de Avila', '07:25'],
        ['Camagüey', '09:25'],
        ['Las Tunas', '11:30'],
        ['Bayamo', '13:40'],
        ['Santiago de Cuba', '15:55']
    ]);

    // Varadero - Habana
    routes.push([
        ['Varadero', '12:00'],
        ['Aeropuerto de Varadero', '12:30'],
        ['Matanzas', '13:05'],
        ['Habana', '15:15']
    ]);
    routes.push([
        ['Varadero', '16:00'],
        ['Aeropuerto de Varadero', '16:30'],
        ['Matanzas', '17:05'],
        ['Habana', '19:15']
    ]);
    routes.push([
        ['Varadero', '19:35'],
        ['Aeropuerto de Varadero', '20:05'],
        ['Matanzas', '20:40'],
        ['Habana', '22:50']
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

    // Trinidad - Habana
    routes.push([
        ['Trinidad', '07:30'],
        ['Cienfuegos', '09:10'],
        ['Varadero', '13:55'],
        ['Aeropuerto de Varadero', '14:30'],
        ['Matanzas', '15:05'],
        ['Habana', '17:15']
    ]);
    routes.push([
        ['Trinidad', '08:15'],
        ['Cienfuegos', '09:55'],
        ['Habana', '13:50']
    ]);
    routes.push([
        ['Trinidad', '16:00'],
        ['Cienfuegos', '17:40'],
        ['Playa Girón', '19:20'],
        ['Boca (Giron)', '21:00'],
        ['Habana', '23:20']
    ]);

    // Holguín - Habana
    routes.push([
        ['Holguín', '07:45'],
        ['Las Tunas', '09:00'],
        ['Camagüey', '11:00'],
        ['Ciego de Avila', '13:35'],
        ['Santa Clara', '16:20'],
        ['Habana', '20:15']
    ]);
    routes.push([
        ['Holguín', '21:15'],
        ['Las Tunas', '22:30'],
        ['Camagüey', '00:30'],
        ['Ciego de Avila', '02:30'],
        ['Sancti Spíritus', '03:55'],
        ['Entronque de Jagüey', '06:45'],
        ['Terminal de Omnibus Habana', '09:00'],
        ['Habana', '09:20']
    ]);

    // Habana - Holguín
    routes.push([
        ['Habana', '09:30'],
        ['Santa Clara', '13:55'],
        ['Camagüey', '18:35'],
        ['Las Tunas', '20:40'],
        ['Holguín', '21:55']
    ]);
    routes.push([
        ['Habana', '19:45'],
        ['Santa Clara', '23:40'],
        ['Ciego de Avila', '02:25'],
        ['Camagüey', '04:25'],
        ['Las Tunas', '06:25'],
        ['Holguín', '07:40']
    ]);

    // Viñales – Habana
    routes.push([
        ['Viñales', '9:10'],
        ['Pinar del Río', '10:00'],
        ['Habana', '12:35']
    ]);
    routes.push([
        ['Viñales', '14:00'],
        ['Pinar del Río', '14:50'],
        ['Las Terrazas', '16:40'],
        ['Habana', '18:05']
    ]);

    // Habana - Viñales
    routes.push([
        ['Habana', '08:40'],
        ['Las Terrazas', '10:10'],
        ['Pinar del Río', '11:55'],
        ['Viñales', '12:45']
    ]);
    routes.push([
        ['Habana', '14:00'],
        ['Pinar del Río', '16:20'],
        ['Viñales', '17:10']
    ]);

    // Trinidad - Cayo Santa María
    routes.push([
        ['Trinidad', '07:30'],
        ['Cienfuegos', '08:45'],
        ['Santa Clara', '10:15'],
        ['Remedios', '11:35'],
        ['Caibarien', '11:45'],
        ['Cayo Las Brujas', '12:25'],
        ['Cayo Ensenachos', '12:35'],
        ['Cayo Santa María', '13:10']
    ]);

    // Cayo Santa María - Trinidad
    routes.push([
        ['Cayo Santa María', '14:10'],
        ['Cayo Ensenachos', '14:40'],
        ['Cayo Las Brujas', '14:50'],
        ['Caibarien', '15:15'],
        ['Remedios', '15:30'],
        ['Santa Clara', '16:50'],
        ['Cienfuegos', '18:30'],
        ['Trinidad', '19:50']
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