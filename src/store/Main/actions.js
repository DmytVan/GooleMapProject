export const ADD_MARKER = 'ADD_MARKER';
export const DELETE_MARKERS = 'DELETE_MARKERS';
export const SET_USER_LOCATION = 'SET_USER_LOCATION';
export const SAVE_ALL_USERS_MARKERS = 'SAVE_ALL_USERS_MARKERS';
export const ADD_MAP_SCRIPT = 'ADD_MAP_SCRIPT';
export const DELETE_TMP_MARKERS = 'DELETE_TMP_MARKERS';
export const CHANGE_PLACES = 'CHANGE_PLACES';
export const FOUND_PLACES = 'FOUND_PLACES';
export const SET_PLACES_MARKERS = 'SET_PLACES_MARKERS';
export const DELETE_PLACES_MARKERS = 'CLEAR_PLACES_MARKERS';

export function addMarker(marker) {
    return {
        type: ADD_MARKER,
        payload: marker
    }
}

export function deleteMarkers(user) {
    return {
        type: DELETE_MARKERS,
        payload: user
    }
}

export function setUserLocation(location, markerUsersLocation) {
    return {
        type: SET_USER_LOCATION,
        payload: location,
        markerUsersLocation,
    }
}

export function saveAllUsersMarkers(user, markers) {
    return {
        type: SAVE_ALL_USERS_MARKERS,
        payload: {
            user,
            markers
        }
    }
};

export function deleteTmpMarkers() {
    return {
        type: DELETE_TMP_MARKERS
    }
}

export function addMapScript() {
    return {
        type: ADD_MAP_SCRIPT
    }
}

export function changePlaces(value) {
    return {
        type: CHANGE_PLACES,
        payload: value
    }
}

export function setFoundPlaces(places, placesType) {
    return {
        type: FOUND_PLACES,
        payload: places,
        placesType
    }
}

export function setPlacesMarkers(markers) {
    return {
        type: SET_PLACES_MARKERS,
        payload: markers
    }
}

export function deletePlacesMarkers() {
    return {
        type: DELETE_PLACES_MARKERS,
    }
}