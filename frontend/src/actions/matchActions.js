import axios from 'axios';
import {
  MATCH_LIST_REQUEST,
  MATCH_LIST_SUCCESS,
  MATCH_LIST_FAIL,
  MATCH_CREATE_REQUEST,
  MATCH_CREATE_SUCCESS,
  MATCH_CREATE_FAIL,
  MATCH_UPDATE_FAIL,
  MATCH_UPDATE_SUCCESS,
  MATCH_UPDATE_REQUEST,
  MATCH_DELETE_REQUEST,
  MATCH_DELETE_SUCCESS,
  MATCH_DELETE_FAIL,
} from '../constants/matchConstants';

export const matchList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MATCH_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/match', config);

    dispatch({
      type: MATCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MATCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createMatch = (team1, team2, start_time, end_time) => async (dispatch, getState) => {
  try {
    dispatch({ type: MATCH_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post('/api/match/create', { team1, team2, start_time, end_time }, config);
    dispatch({
      type: MATCH_CREATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: MATCH_CREATE_FAIL,
      payload: message,
    });
  }
};
export const updateMatch = (id, team1, team2, start_time, end_time) => async (dispatch, getState) => { 
  try {
      dispatch({ type: MATCH_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/match/${id}`, { team1, team2, start_time, end_time }, config);
      dispatch({
        type: MATCH_UPDATE_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      const message = error.response && error.response.data.message? error.response.data.message : error.message;
      dispatch({
        type: MATCH_UPDATE_FAIL,
        payload: message,
      });
    }
}
export const deleteMatch = (id) => async (dispatch, getState) => {
  try {
      dispatch({ type: MATCH_DELETE_REQUEST });
    
      const {
        userLogin: { userInfo },
      } = getState();
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`/api/match/${id}`, config);
      dispatch({
        type: MATCH_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message = error.response && error.response.data.message? error.response.data.message : error.message;
      dispatch({
        type: MATCH_DELETE_FAIL,
        payload: message,
      });
    }
  };