import React from 'react';
import geolocationImage from '../../../Image/GeolocationMini1.png';
import './index.css'

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.loadScript = this.loadScript.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
        this.showMarkers = this.showMarkers.bind(this);
        this.deleteMarkers = this.deleteMarkers.bind(this);
        this.getUserLocation = this.getUserLocation.bind(this);
        this.addMarkerOnGeolocation = this.addMarkerOnGeolocation.bind(this);
        this.onSaveMarkers = this.onSaveMarkers.bind(this);
        this.LoadPlacesLocation = this.LoadPlacesLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addMarker = this.addMarker.bind(this);
    }

    componentDidMount() {
        if (this.props.mapScriptWasAdd) {
            this.map = new window.google.maps.Map(this.refs.map, {center: {lat: 46.28, lng: 30.44}, zoom: 10});
            this.map.addListener('click', (event) => {
                this.addMarker(event.latLng);
            });
            if (this.props.markerUsersLocation) {
                this.props.markerUsersLocation.setMap(this.map);
            }
            return;
        }
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8gyTKs4FbmKGC97trjNmfcxXWoVss_Po&callback=initMap&libraries=places";
        this.loadScript(url, () => {
            this.map = new window.google.maps.Map(this.refs.map, {center: {lat: 46.28, lng: 30.44}, zoom: 10});
            this.props.addMapScript();
            this.map.addListener('click', (event) => {
                this.addMarker(event.latLng);
            });
            this.getUserLocation();
        })
    }

    loadScript(url, callback) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }

    addMarker(location) {
        var marker = new window.google.maps.Marker({
            position: location,
            map: this.map
        });
        this.props.addMarker(marker);
    }

    setMapOnAll(map) {
        if (this.props.usersSavedMarkers[this.props.user]) {
            for (let i = 0; i < this.props.usersSavedMarkers[this.props.user].length; i++) {
                this.props.usersSavedMarkers[this.props.user][i].setMap(map);
            }
        }
    }


    clearMarkers() {
        if (this.props.markers.length) {
            for (let i = 0; i < this.props.markers.length; i++) {
                this.props.markers[i].setMap(null);
            }
            this.props.deleteTmpMarkers();
        }
        this.setMapOnAll(null);
        this.clearPlacesMarkers();
    }

    deleteMarkers() {
        this.clearMarkers();
        this.props.deleteMarkers();
    }

    showMarkers() {
        this.setMapOnAll(this.map);
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            if (this.props.markerUsersLocation) {
                this.props.markerUsersLocation.setMap(null);
            }
            this.addMarkerOnGeolocation(position, this.map)
        })
    };

    addMarkerOnGeolocation(position, map) {
        const marker = new window.google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: this.map,
            icon: geolocationImage,
            label: 'You here'
        });
        this.props.setUserLocation({lat: position.coords.latitude, lng: position.coords.longitude}, marker);
        this.map.setCenter(this.props.userGeolocation);
        if (this.props.markerUsersLocation) {
            this.props.markerUsersLocation.setMap(map);
        }
        this.map.setZoom(15);
    }

    onSaveMarkers() {
        this.props.saveAllUsersMarkers(this.props.user, this.props.markers)
    }

    LoadPlacesLocation(type) {
        const userLat = this.props.userGeolocation.lat,
            userlng = this.props.userGeolocation.lng;
        var pyrmont = new window.google.maps.LatLng(userLat, userlng);

        var request = {
            location: pyrmont,
            radius: '1500',
            type: [type],
            fields: ['name', 'geometry']
        };

        const service = new window.google.maps.places.PlacesService(this.map);
        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                this.props.setFoundPlaces(results, type);
                this.addPlacesMarkers(type)
            }
        });
    }

    handleChange(event) {
        if (!this.props.userGeolocation) {
            return;
        }
        this.props.changePlaces(event.target.value);
        if (!this.props.foundPlaces[event.target.value]) {
            this.LoadPlacesLocation(event.target.value)
        } else {
            this.addPlacesMarkers(event.target.value);
        }
    }

    addPlacesMarkers(typePlaceMarkers) {
        this.clearPlacesMarkers();
        const markers = [];
        for (let i = 0; i < this.props.foundPlaces[typePlaceMarkers].length; i++) {
            const image = {
                url: this.props.foundPlaces[typePlaceMarkers][i].icon,
                // This marker is 20 pixels wide by 32 pixels high.
                size: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(17, 34),
                scaledSize: new window.google.maps.Size(25, 25)
            };
            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };

            const marker = new window.google.maps.Marker({
                position: this.props.foundPlaces[typePlaceMarkers][i].geometry.location,
                map: this.map,
                icon: image,
                shape: shape
            });
            markers.push(marker);
        }
        this.props.setPlacesMarkers(markers);
    }

    clearPlacesMarkers() {

        if (!this.props.placesMarkers.length) {
            return;
        }

        for (let i = 0; i < this.props.placesMarkers.length; i++) {
            this.props.placesMarkers[i].setMap(null);
        }
        this.props.deletePlacesMarkers();
    }

    render() {

        return (
            <div className='mapWrapper'>
                <input onClick={this.clearMarkers} type='button' value="Hide Markers"/>
                <input onClick={this.onSaveMarkers} type='button' value="Save Markers"/>
                <input onClick={this.showMarkers} type='button' value={'Show Saved Markers'}/>
                <input onClick={this.deleteMarkers} type='button' value="Delete Saved Markers"/>
                <input onClick={this.getUserLocation} type='button' value='Get my location'/>
                <span>Places nearby: <select value={this.props.selectPlaces} onChange={this.handleChange}
                              disabled={!this.props.userGeolocation}>
                    <option value="restaurant">Restaurants</option>
                    <option value="school">Schools</option>
                    <option value="pharmacy">Pharmacies</option>
                    <option value="gas_station">Gas stations</option>
                </select></span>
                <div className='map' ref="map">Loading map...</div>
            </div>
        );
    }
}

export default Map;
