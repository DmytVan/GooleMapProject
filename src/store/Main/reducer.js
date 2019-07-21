import {SING_IN, LOG_OUT} from "../Authorization/actions";
import {ADD_MARKER, DELETE_MARKERS, SET_USER_LOCATION, SAVE_ALL_USERS_MARKERS, ADD_MAP_SCRIPT, DELETE_TMP_MARKERS, CHANGE_PLACES, FOUND_PLACES, SET_PLACES_MARKERS, DELETE_PLACES_MARKERS} from "./actions";

const initialState = {
    user: 'guest',
    markers: [],
    userGeolocation: null,
    showMarkers: true,
    usersSavedMarkers: {},
    mapScriptWasAdd: false,
    markerUsersLocation: null,
    selectPlaces: 'school',
    foundPlaces: {},
    placesMarkers: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SING_IN:
            return {...state, user: action.payload, markers: [], foundPlaces: {}, markerUsersLocation: null, userGeolocation: null};
        case ADD_MAP_SCRIPT:
            return {...state, mapScriptWasAdd: true};
        case ADD_MARKER:
            return {...state, markers: [...state.markers, action.payload]};
        case DELETE_MARKERS:
            const emptyUsersSavedMarkers = {...state.userMarkers};
            emptyUsersSavedMarkers[action.payload] = [];
            return{...state, usersSavedMarkers: emptyUsersSavedMarkers};
        case SET_USER_LOCATION:
            return {...state, userGeolocation: action.payload, markerUsersLocation: action.markerUsersLocation, foundPlaces: {}};
        case SAVE_ALL_USERS_MARKERS:
            const newUsersSavedMarkers = {...state.usersSavedMarkers};
            newUsersSavedMarkers[action.payload.user] = [...action.payload.markers];
            return{...state, usersSavedMarkers: newUsersSavedMarkers};
        case DELETE_TMP_MARKERS:
            return{...state, markers: []};
        case CHANGE_PLACES:
            return{...state, selectPlaces: action.payload};
        case FOUND_PLACES:
            const newFoundPlaces = {...state.foundPlaces};
            newFoundPlaces[action.placesType] = action.payload;
            return{...state, foundPlaces: newFoundPlaces};
        case SET_PLACES_MARKERS:
            return{...state, placesMarkers: action.payload};
        case DELETE_PLACES_MARKERS:
            return{...state, placesMarkers: []};
        case LOG_OUT:
            return{...state, user: 'guest', markers: [], foundPlaces: {}, markerUsersLocation: null, userGeolocation: null};
        default:
            return state;
    }
};

export default reducer;