define(['async!http://maps.google.com/maps/api/js?sensor=false'], function() {
    return {
        'Habana': { position: new google.maps.LatLng(23.1135920,-82.3665960)},
        'Terminal de Omnibus Habana': { position: new google.maps.LatLng(23.124418, -82.385906) },
        'Varadero': { position: new google.maps.LatLng(23.1798580,-81.1885290) },
        'Viñales': { position: new google.maps.LatLng(22.6188130,-83.7066290) },
        'Las Terrazas': { position: new google.maps.LatLng(22.8442060,-82.9441060) },
        'Pinar del Rio': { position: new google.maps.LatLng(22.4133650,-83.6880260) },
        'Matanzas': { position: new google.maps.LatLng(23.0303400,-81.5322150) },
        'Aeropuerto de Varadero': { position: new google.maps.LatLng(23.0398960,-81.4369400) },
        'Playa Girón': { position: new google.maps.LatLng(22.0690840,-81.0257760) },
        'Cienfuegos': { position: new google.maps.LatLng(22.1575191,-80.4453278) },
        'Trinidad': { position: new google.maps.LatLng(21.7960340,-79.9808140) },
        'Santa Clara': { position: new google.maps.LatLng(22.4243980,-79.9416550) },
        'Sancti Spiritus': { position: new google.maps.LatLng(21.9327550,-79.4366320) },
        'Baracoa': { position: new google.maps.LatLng(20.3474810,-74.5023820) },
        'Santiago de Cuba': { position: new google.maps.LatLng(20.0169300,-75.8301540) },
        'Guantanamo': { position: new google.maps.LatLng(20.1400090,-75.2129000) },
        'Entronque de Jagüey': { position: new google.maps.LatLng(0, 0) /*TODO*/ },
    }
});