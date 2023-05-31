import axios from 'axios';
import {
  TEAM_LIST_REQUEST,
  TEAM_LIST_SUCCESS,
  TEAM_LIST_FAIL,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_SUCCESS,
  TEAM_CREATE_FAIL,
  TEAM_UPDATE_REQUEST,
  TEAM_UPDATE_SUCCESS,
  TEAM_UPDATE_FAIL,
  TEAM_DELETE_REQUEST,
  TEAM_DELETE_SUCCESS,
  TEAM_DELETE_FAIL,
} from '../constants/teamConstants';

export const teamList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/team', config);

    dispatch({
      type: TEAM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTeam = (name, description) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/api/team/create', { name, description }, config);

    dispatch({
      type: TEAM_CREATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({
      type: TEAM_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateTeam = (id, name, description) => async (dispatch, getState) => { 
  try {
    dispatch({ type: TEAM_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/team/${id}`, { name, description }, config);

    dispatch({
      type: TEAM_UPDATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    const message = error.response && error.response.data.message? error.response.data.message : error.message;
    dispatch({
      type: TEAM_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteTeam = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TEAM_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/team/${id}`, config);

    dispatch({
      type: TEAM_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.message? error.response.data.message : error.message;
    dispatch({
      type: TEAM_DELETE_FAIL,
      payload: message,
    });
  }
};
