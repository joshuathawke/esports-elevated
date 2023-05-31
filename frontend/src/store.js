import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userSignupReducer } from './reducers/userReducers';
import { matchListReducer, matchCreateReducer, matchUpdateReducer, matchDeleteReducer } from './reducers/matchReducers';
import { teamListReducer, teamCreateReducer, teamDeleteReducer, teamUpdateReducer } from './reducers/teamReducers';
import { tournamentListReducer, tournamentCreateReducer, tournamentDeleteReducer, tournamentUpdateReducer } from './reducers/tournamentReducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    matchList: matchListReducer,
    matchCreate: matchCreateReducer,
    matchUpdate: matchUpdateReducer,
    matchDelete: matchDeleteReducer,
    teamList: teamListReducer,
    teamCreate: teamCreateReducer,
    teamUpdate: teamUpdateReducer,
    teamDelete: teamDeleteReducer,
    tournamentList: tournamentListReducer,
    tournamentCreate: tournamentCreateReducer,
    tournamentUpdate: tournamentUpdateReducer,
    tournamentDelete: tournamentDeleteReducer

});

const userInfoFromStorage = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];
const store = createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;