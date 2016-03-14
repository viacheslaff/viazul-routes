define(function () {
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

    return routes;
});