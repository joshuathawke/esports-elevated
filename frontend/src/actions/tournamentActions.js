import axios from "axios";
import {
  TOURNAMENT_LIST_REQUEST,
  TOURNAMENT_LIST_SUCCESS,
  TOURNAMENT_LIST_FAIL,
  TOURNAMENT_CREATE_REQUEST,
  TOURNAMENT_CREATE_SUCCESS,
  TOURNAMENT_CREATE_FAIL,
  TOURNAMENT_UPDATE_REQUEST,
  TOURNAMENT_UPDATE_SUCCESS,
  TOURNAMENT_UPDATE_FAIL,
  TOURNAMENT_DELETE_REQUEST,
  TOURNAMENT_DELETE_SUCCESS,
  TOURNAMENT_DELETE_FAIL,
} from "../constants/tournamentConstants";

export const tournamentList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TOURNAMENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/tournament", config);

    dispatch({
      type: TOURNAMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOURNAMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTournament =
  (name, startDate, endDate) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOURNAMENT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/tournaments/create",
        { name, startDate, endDate },
        config
      );

      dispatch({
        type: TOURNAMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TOURNAMENT_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateTournament =
  (id, name, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: TOURNAMENT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/tournament/${id}`,
        { name, description },
        config
      );

      dispatch({
        type: TOURNAMENT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: TOURNAMENT_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteTournament = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TOURNAMENT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/tournament/${id}`, config);

    dispatch({
      type: TOURNAMENT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TOURNAMENT_DELETE_FAIL,
      payload: message,
    });
  }
};
