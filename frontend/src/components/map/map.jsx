import React from 'react';
import "./map.css"
import keys from '../../keys/api_keys'


class Map extends React.Component {

    componentDidMount() {
        this.renderMap();
    }

    renderMap() {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${keys.mapApi}&libraries=places&callback=initMap`)
        window.initMap = this.initMap;
    }

    initMap() {
   
        let pos;
        let map;
        let bounds;
        let infoWindow;
        let currentInfoWindow;
        let service;
        let infoPane;
        
        // Initialize variables
        bounds = new window.google.maps.LatLngBounds();
        infoWindow = new window.google.maps.InfoWindow;
        currentInfoWindow = infoWindow;
        
        //sidebar
        infoPane = document.getElementById('panel');
        

        //geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map = new window.google.maps.Map(document.getElementById('map'), {
                    center: pos,
                    zoom: 15
                });
                bounds.extend(pos);

                infoWindow.setPosition(pos);
                infoWindow.setContent('Current Location');
                infoWindow.open(map);
                map.setCenter(pos);

                //Places nearby seach on current location
                getNearbyPlaces(pos);
            }, () => {
                // Browser supports geolocation, but user has denied permission
                handleLocationError(true, infoWindow);
            });
        } else {
            // Browser doesn't support geolocation
            handleLocationError(false, infoWindow);
        }
    

        // Handle a geolocation error
        function handleLocationError(browserHasGeolocation, infoWindow) {
            // default location times square 
            pos = { lat: 40.7579747, lng: -73.9877313 };
            map = new window.google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 13
            });

            // Display an InfoWindow at the map center
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Geolocation permissions denied. Using default location.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
            currentInfoWindow = infoWindow;

            //get nearby searches on default location
            getNearbyPlaces(pos);
        }

        // Nearby search request
        function getNearbyPlaces(position) {
            let request = {
                location: position,
                radius: 2414, //in meters
                // rankBy: window.google.maps.places.RankBy.DISTANCE,
                keyword: 'subway',
                type: 'restaurant'
            };

            service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch(request, nearbyCallback);
        }

        // deal with results of nearby search function
        function nearbyCallback(results, status) {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                createMarkers(results);
            }
        }

        
        function createMarkers(places) {
            places.forEach( place => {
                let marker = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name
                })

                window.google.maps.event.addListener(marker, 'click', () => {
                    let request = {
                        placeId: place.place_id,
                        fields: ['name', 'formatted_address', 'geometry', 'rating','website', 'photos']
                    }

                    service.getDetails(request, (placeResult, status) => {
                        showDetails(placeResult, marker, status)
                    })
                })
                // adjust bounds to fit this marker
                bounds.extend(place.geometry.location);
            })

            //show all markers in visible area
            map.fitBounds(bounds);
        }

        // Builds an InfoWindow to display details above the marker
        function showDetails(placeResult, marker, status) {
            if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                let placeInfowindow = new window.google.maps.InfoWindow();
                placeInfowindow.setContent('<div><strong>' + placeResult.name +
                    '</strong><br>' + 'Rating: ' + placeResult.rating + '</div>');
                placeInfowindow.open(marker.map, marker);
                currentInfoWindow.close();
                currentInfoWindow = placeInfowindow;
                showPanel(placeResult);
            } else {
                console.log('showDetails failed: ' + status);
            }
        }

        // Displays place details in a sidebar
        function showPanel(placeResult) {
            // If infoPane is already open, close it
            if (infoPane.classList.contains("open")) {
                infoPane.classList.remove("open");
            }

            // Clear the previous details
            while (infoPane.lastChild) {
                infoPane.removeChild(infoPane.lastChild);
            }

            // Add photo if available
            if (placeResult.photos != null) {
                let firstPhoto = placeResult.photos[0];
                let photo = document.createElement('img');
                photo.classList.add('hero');
                photo.src = firstPhoto.getUrl();
                infoPane.appendChild(photo);
            }

            // Add place details with text formatting
            let name = document.createElement('h1');
            name.classList.add('place');
            name.textContent = placeResult.name;
            infoPane.appendChild(name);
            if (placeResult.rating != null) {
                let rating = document.createElement('p');
                rating.classList.add('details');
                rating.textContent = `Rating: ${placeResult.rating} \u272e`;
                infoPane.appendChild(rating);
            }
            let address = document.createElement('p');
            address.classList.add('details');
            address.textContent = placeResult.formatted_address;
            infoPane.appendChild(address);
            if (placeResult.website) {
                let websitePara = document.createElement('p');
                let websiteLink = document.createElement('a');
                let websiteUrl = document.createTextNode(placeResult.website);
                websiteLink.appendChild(websiteUrl);
                websiteLink.title = placeResult.website;
                websiteLink.href = placeResult.website;
                websitePara.appendChild(websiteLink);
                infoPane.appendChild(websitePara);
            }

            // Open the infoPane
            infoPane.classList.add("open");
        }
    
    }


    render() {
        return (
            <>
                <div id="panel"></div>
                <div id="map"></div>
            </>
        )
    }
}

function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    script.asyn = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default Map;