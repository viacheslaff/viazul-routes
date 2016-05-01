/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (ui) {
	    document.addEventListener('DOMContentLoaded', ui.init);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	    __webpack_require__(2),
	    __webpack_require__(3)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(stops, schedule) {

	    var map,
	        currentFrom,
	        currentTo,
	        markers = {},
	        polylines = {},
	        itineraries = [],
	        changesToStop = {},
	        infoElement;

	    function init() {
	        infoElement = document.getElementById('info');

	        map = new google.maps.Map(document.getElementById('main-map'), {
	            center: stops['Santa Clara'].position,
	            zoom: 7
	        });

	        redrawMap();
	    }

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
	        for (var routeKey in polylines) {
	            polylines[routeKey].setMap(null);
	            delete polylines[routeKey];
	        }

	        for (var i = 0; i < itineraries.length; i++) {
	            var legs = itineraries[i],
	                path = [],
	                routeKey = [];

	            path.push(stops[legs[0].from].position);
	            routeKey.push(legs[0].from);

	            for (var j = 0; j < legs.length; j++) {
	                path.push(stops[legs[j].to].position);
	                routeKey.push(legs[j].to);
	            }

	            routeKey = routeKey.join('-');

	            if (!polylines.hasOwnProperty(routeKey)) {
	                var polyline = new google.maps.Polyline({
	                    path: path,
	                    geodesic: false,
	                    strokeColor: '#FF0000',
	                    strokeOpacity: 1.0,
	                    strokeWeight: 2
	                });

	                polyline.setMap(map);

	                polylines[routeKey] = polyline;
	            }
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

	    return {
	        init: init
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    return {
	        'Habana': { position: new google.maps.LatLng(23.1135920,-82.3665960)},
	        'Terminal de Omnibus Habana': { position: new google.maps.LatLng(23.124418, -82.385906) },
	        'Varadero': { position: new google.maps.LatLng(23.1798580,-81.1885290) },
	        'Viñales': { position: new google.maps.LatLng(22.6188130,-83.7066290) },
	        'Las Terrazas': { position: new google.maps.LatLng(22.8442060,-82.9441060) },
	        'Pinar del Río': { position: new google.maps.LatLng(22.4133650,-83.6880260) },
	        'Matanzas': { position: new google.maps.LatLng(23.0303400,-81.5322150) },
	        'Aeropuerto de Varadero': { position: new google.maps.LatLng(23.0398960,-81.4369400) },
	        'Playa Girón': { position: new google.maps.LatLng(22.0690840,-81.0257760) },
	        'Cienfuegos': { position: new google.maps.LatLng(22.1575191,-80.4453278) },
	        'Trinidad': { position: new google.maps.LatLng(21.7960340,-79.9808140) },
	        'Santa Clara': { position: new google.maps.LatLng(22.4243980,-79.9416550) },
	        'Sancti Spíritus': { position: new google.maps.LatLng(21.9327550,-79.4366320) },
	        'Baracoa': { position: new google.maps.LatLng(20.3474810,-74.5023820) },
	        'Santiago de Cuba': { position: new google.maps.LatLng(20.0169300,-75.8301540) },
	        'Guantánamo': { position: new google.maps.LatLng(20.1400090,-75.2129000) },
	        'Entronque de Jagüey': { position: new google.maps.LatLng(22.5267190,-81.1278810) },
	        'Bayamo': { position: new google.maps.LatLng(20.3719160,-76.6297190) },
	        'Holguín': { position: new google.maps.LatLng(20.8795130,-76.2594980) },
	        'Las Tunas': { position: new google.maps.LatLng(20.9579380,-76.9527840) },
	        'Camagüey': { position: new google.maps.LatLng(21.3926030,-77.9053180) },
	        'Ciego de Avila': { position: new google.maps.LatLng(21.8405360,-78.7589560) },
	        'Cárdenas': { position: new google.maps.LatLng(23.0365510,-81.2133260) },
	        'Boca (Giron)': { position: new google.maps.LatLng(22.3669833,-81.1650932) },
	        'Cayo Santa María': { position: new google.maps.LatLng(22.6495040,-78.9797270) },
	        'Cayo Ensenachos': { position: new google.maps.LatLng(22.6437630,-79.0885120) },
	        'Cayo Las Brujas': { position: new google.maps.LatLng(22.6236110,-79.1538890) },
	        'Caibarien': { position: new google.maps.LatLng(22.5064670,-79.4760130) },
	        'Remedios': { position: new google.maps.LatLng(22.4963480,-79.5462940) }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function (stops, routes) {

	    var Schedule = function (routes) {
	        this._schedule = this._generateSchedule(routes);
	    };

	    Schedule.ROUTES_LIMIT = 2;

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

	    Schedule.prototype.getItinerariesFrom = function (fromName, after, previousStops, previousRoutes) {
	        var itineraries = [];

	        if (!after) {
	            after = new Date();
	            after.setHours(0, 0, 0, 0);
	        }

	        if (!previousStops) {
	            previousStops = [];
	        }

	        if (!previousRoutes) {
	            previousRoutes = [];
	        }

	        if (this._schedule[fromName]) {
	            var legs = this._schedule[fromName].filter(function (leg) {
	                return leg.departure >= after &&
	                       (previousStops.indexOf(leg.to) === -1);
	            });

	            legs.sort(function (a, b) {
	                return a.departure - b.departure;
	            });

	            for (var i = 0; i < legs.length; i++) {
	                var leg = legs[i],
	                    nextItineraries;

	                itineraries.push([leg]);

	                var newPreviousRoutes = (previousRoutes.indexOf(leg.routeId) === -1) ? previousRoutes.concat(leg.routeId) : previousRoutes;

	                nextItineraries = this.getItinerariesFrom(
	                    leg.to,
	                    leg.arrival,
	                    previousStops.concat(leg.from),
	                    newPreviousRoutes
	                );

	                if (nextItineraries.length > 0) {
	                    for (var j = 0; j < nextItineraries.length; j++) {
	                        var newItinerary = [leg].concat(nextItineraries[j]),
	                            routeIds;

	                        routeIds = newItinerary
	                            .map(function(leg) {
	                                return leg.routeId;
	                            })
	                            .filter(function(value, index, self) {
	                                return self.indexOf(value) === index;
	                            });

	                        if (routeIds.length <= Schedule.ROUTES_LIMIT) {
	                            itineraries.push(
	                                [leg].concat(nextItineraries[j])
	                            );
	                        }
	                    }
	                }
	            }
	        }

	        return itineraries;
	    };


	    return new Schedule(routes);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (stops) {
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }
/******/ ]);