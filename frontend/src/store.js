import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {
  userLoginReducer,
  userSignupReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  matchListReducer,
  matchCreateReducer,
  matchUpdateReducer,
  matchDeleteReducer,
} from './reducers/matchReducers';
import {
  teamListReducer,
  teamCreateReducer,
  teamDeleteReducer,
  teamUpdateReducer,
} from './reducers/teamReducers';
import {
  tournamentListReducer,
  tournamentCreateReducer,
  tournamentDeleteReducer,
  tournamentUpdateReducer,
} from './reducers/tournamentReducers';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userUpdate: userUpdateReducer,
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
  tournamentDelete: tournamentDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true, 
});

export default store;
