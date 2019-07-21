import React from 'react';
import {connect} from 'react-redux';
import Map from './Map'
import {addMarker, deleteMarkers, setUserLocation, saveAllUsersMarkers, addMapScript, deleteTmpMarkers, changePlaces, setFoundPlaces, setPlacesMarkers, deletePlacesMarkers} from "../../store/Main/actions";

class Main extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <div>
                Hello, {user}
                <Map selectValue='school' {...this.props}/>
            </div>
        )
    }
}

const putStateToProps = (state) => {
    return {
        user: state.main.user,
        markers: state.main.markers,
        userGeolocation: state.main.userGeolocation,
        showMarkers: state.main.showMarkers,
        usersSavedMarkers: state.main.usersSavedMarkers,
        mapScriptWasAdd: state.main.mapScriptWasAdd,
        selectPlaces: state.main.selectPlaces,
        foundPlaces: state.main.foundPlaces,
        markerUsersLocation: state.main.markerUsersLocation,
        placesMarkers: state.main.placesMarkers
    }
};

const putActionToProps = {
    addMarker,
    deleteMarkers,
    setUserLocation,
    saveAllUsersMarkers,
    addMapScript,
    deleteTmpMarkers,
    changePlaces,
    setFoundPlaces,
    setPlacesMarkers,
    deletePlacesMarkers
};

export default connect(putStateToProps, putActionToProps)(Main);