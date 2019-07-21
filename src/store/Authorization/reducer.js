import {CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_REGISTRATION_FLAG, REGISTRATION_USER, SING_IN, LOG_OUT} from "./actions";

const initialState = {
    email: '',
    password: '',
    isRegistration: false,
    isSingIn: false,
    users: {
        'admin@gmail.com': '123456'
    },
    userMarkers: {
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_EMAIL:
            return {...state, email: action.payload};
        case CHANGE_PASSWORD:
            return {...state, password: action.payload};
        case CHANGE_REGISTRATION_FLAG:
            return{...state, isRegistration: action.payload};
        case REGISTRATION_USER:
            const newState = {...state};
            const {email, password} = action.payload;
            newState.users[email] = password;
            return newState;
        case SING_IN:
            return{...state, isSingIn: true, email: '', password: '',};
        case LOG_OUT:
            return{...state, isSingIn: false};
        default:
            return state;
    }
};

export default reducer;