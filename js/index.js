
console.log(`=============== : ${you}`);

// MapBox initiate map
mapboxgl.accessToken = mapBoxToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 6,
    // center: [-122.420679, 37.772537] // San Francisco
    // center: [-98.4916, 29.4252] // San Antonio
    // center: [-77.0369, 38.9072] // Washington D.C
    center: [-97.7718784, 31.0810943] // Killeen, TX
});

// Add Geocoder with fly animation
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    flyTo: {
        bearing: 0,
// These options control the flight curve, making it move
// slowly and zoom out almost completely before starting
// to pan.
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out
// This can be any easing function: it takes a number between
// 0 and 1 and returns another number between 0 and 1.
        easing: function(t) {
            return t;
        }
    },
    mapboxgl: mapboxgl
});
map.addControl(geocoder);

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Load points layer once map loads
map.on('load', () => {

    // Adding points source data
    map.addSource('pointsSource', {
        type: 'geojson',
        data: // Points source code in JSON
            {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {
                            "text": "Hello point 1"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -96.83349609375,
                                32.80574473290688
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "text": "Hello point 2"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -98.514404296875,
                                29.410890376109
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "text": "Hello point 3",
                            "icon": "rocket"

                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -97.13012695312499,
                                31.5504526754715
                            ]
                        }
                    },
                    {
                        "type": "Feature",
                        "properties": {
                            "marker-color": "#7e7e7e",
                            "marker-size": "medium",
                            "marker-symbol": "",
                            "text": "Hello point 4",
                            // title: 'Mapbox',
                            // description: 'Washington, D.C.'
                            "icon": "music"
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                -97.72338867187499,
                                30.278044377800153
                            ]
                        }
                    }
                ]
            } // end of json data
    });
    // // Add Custom marker image
    // map.loadImage(
    //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
    //     function(error, image) {
    //                 if (error) throw error;
    //                 map.addImage('cat', image);
    //
    //         // Add a Layer
    //         map.addLayer({
    //             id: 'points',
    //             source: 'pointsSource',
    //             type: 'symbol',
    //             layout: {
    //                 'icon-image': 'cat',
    //                 'icon-size': 0.25
    //             }
    //         });
    //     }
    // )

    // ================================================

    // Add a Layer
    map.addLayer({
        id: 'points',
        source: 'pointsSource',
        type: 'symbol',
        layout: {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
        }
    });


}); // End map load

// Event listener Map click
map.on('click', e => {
    // Returns the point object
    const result = map.queryRenderedFeatures(e.point, { layers: ['points'] });
    // If point is click do this
    if(result.length){
        console.log(result);
        console.log(e.point);

        // Add Popup
        const popup = new mapboxgl.Popup();
        const content = result[0].properties.text;
        popup.setLngLat(e.lngLat)
            .setHTML(`<h1>${content}</h1>test`)
            .addTo(map)
    }

    // Console log lat and long where cursor click on map.
    console.log('click', e.lngLat );
});



// ====================
var favRestaurants = [
    {
        restaurantName: "La Panaderia Bakery Cafe",
        address: "301 E Houston St, San Antonio, TX 78205",
        location:[-98.4965739, 29.432991],
        phone: "(210) 227-2683"
    },
    {
        restaurantName: "Odd Duck",
        address: "1201 S Lamar Blvd, Austin, TX 78704",
        location:[-98.4476835, 29.9035974],
        phone: "(512) 433-6521"
    },
    {
        restaurantName: "Knife Dallas",
        address: "5300 E Mockingbird Ln, Dallas, TX 75206",
        location:[-96.801746, 32.8093984],
        phone: "(214) 443-9339"
    }];

// console.log(favRestaurants[0].address);
//
// function geoPen(array){
//     // Marker
//     var marker = new mapboxgl.Marker()
//     // marker.setLngLat([-98.4916, 29.4260]); //Alamo location
//         .setLngLat(array.location)
//         .setPopup(favRestaurants)
//         .addTo(map);
//
//
//     // PopUp
//     var favRestaurants = new mapboxgl.Popup()
//         .setHTML(array.restaurantName + "<br>" + array.address + "<br>" + array.phone);
//
//     marker.setPopup(favRestaurants);
//
// }

function geoPen(object){
    // Marker
    var marker = new mapboxgl.Marker()
        // marker.setLngLat([-98.4916, 29.4260]); //Alamo location
        .setLngLat(object.location)
        // .setPopup(popUp)
        .addTo(map);


    // PopUp
    var popUp = new mapboxgl.Popup()
        .setHTML(object.restaurantName + "<br>" + object.address + "<br>" + object.phone);

    marker.setPopup(popUp);

}



favRestaurants.forEach(geoPen);
// Looping through array of restaurants and passing each restaurant object into geoPen function.
// This creates the markers popups with restaurant info.
favRestaurants.forEach(function (restaurant) {
    geoPen(restaurant)

})



