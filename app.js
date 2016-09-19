function initMap() {

  busRoute = [
  {
    "bus": "Hermon",
    "stop": 0,
    "name": "School",
    "lat": 12.8543199,
    "lon": 77.5077566,
    "sta": "08:05:00",
    "std": "15:40:00"
  },
  {
    "bus": "Hermon",
    "stop": 1,
    "name": "Mandovi",
    "lat": 12.9064368,
    "lon": 77.5992675,
    "sta": "07:32:00",
    "std": "16:07:00"
  },
  {
    "bus": "Hermon",
    "stop": 2,
    "name": "IIMB",
    "lat": 12.8966951,
    "lon": 77.6007588,
    "sta": "07:29:00",
    "std": "16:10:00"
  },
  {
    "bus": "Hermon",
    "stop": 3,
    "name": "Reliance",
    "lat": 12.8909161,
    "lon": 77.5969559,
    "sta": "07:27:00",
    "std": "16:12:00"
  },
  {
    "bus": "Hermon",
    "stop": 4,
    "name": "Bata",
    "lat": 12.8843262,
    "lon": 77.5940423,
    "sta": "07:25:00",
    "std": "16:15:00"
  }
];

  var mapOptions = {
    center: {lat: 12.9716, lng: 77.5946},
    zoom: 13,
    styles: [
       {
         featureType: 'all',
         stylers: [
           { saturation: -80 }
         ]
       },{
         featureType: 'road.arterial',
         elementType: 'geometry',
         stylers: [
           { hue: '#00ffee' },
           { saturation: 50 }
         ]
       },{
         featureType: 'poi.business',
         elementType: 'labels',
         stylers: [
           { visibility: 'off' }
         ]
       }
     ]
   }

  console.log(busRoute.length);
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var origin = new google.maps.LatLng(busRoute[0].lat, busRoute[0].lon);
  var destination = new google.maps.LatLng(busRoute[4].lat, busRoute[4].lon);
  var waypoint1 = new google.maps.LatLng(busRoute[1].lat, busRoute[1].lon);
  var waypoint2 = new google.maps.LatLng(busRoute[2].lat, busRoute[2].lon);
  var waypoint3 = new google.maps.LatLng(busRoute[3].lat, busRoute[3].lon);

  var waypts = [];
  for (var i = 1; i < busRoute.length - 1; i++) {
    var waypoint = new google.maps.LatLng(busRoute[i].lat, busRoute[i].lon);
    waypts.push({
      location: waypoint,
      stopover: false
    });
  };
  console.log(waypts);

  var destinationIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = 'https://chart.googleapis.com/chart?' +
        'chst=d_map_pin_letter&chld=O|FFFF00|000000';

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);

  function calcRoute() {
   directionsService.route({
     origin: origin,
     destination: destination,
     travelMode: 'DRIVING',
     waypoints: waypts
   }, function(response, status) {
     if (status === 'OK') {
       directionsDisplay.setDirections(response);
     } else {
       window.alert('Directions request failed due to ' + status);
     }
   });
 }

 calcRoute();

  //
  // var service = new google.maps.DistanceMatrixService();
  // service.getDistanceMatrix(
  //   {
  //     origins: origin,
  //     destinations: [destinationA, destinationB],
  //     travelMode: 'DRIVING',
  //     transitOptions: TransitOptions,
  //     drivingOptions: DrivingOptions,
  //     unitSystem: UnitSystem,
  //     avoidHighways: Boolean,
  //     avoidTolls: Boolean,
  //   }, callback);
  //
  // function callback(response, status) {
  //   // See Parsing the Results for
  //   // the basics of a callback function.
  // }
}
