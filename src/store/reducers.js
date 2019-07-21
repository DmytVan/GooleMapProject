import {combineReducers} from 'redux';
import authorizationReducer from './Authorization/reducer';
import mainReducer from './Main/reducer'

export default combineReducers({
    main: mainReducer,
    authorization: authorizationReducer
});