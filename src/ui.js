define([
    'stops',
    'async!http://maps.google.com/maps/api/js?sensor=false'
], function() {

    var map;

    function initMap() {
        map = new google.maps.Map(document.getElementById('main-map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    initMap();
});