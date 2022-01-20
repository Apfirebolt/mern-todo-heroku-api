import axiosInstance from "../plugins/interceptor";
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,
  LIST_TODO_REQUEST,
  LIST_TODO_SUCCESS,
  LIST_TODO_FAIL,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DETAIL_TODO_REQUEST,
  DETAIL_TODO_SUCCESS,
  DETAIL_TODO_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,
} from "../constants/toDoConstants";

import { logout } from "./authActions";

export const addToDoAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TODO_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.post(`/api/todos`, payload, config);

    dispatch({
      type: ADD_TODO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ADD_TODO_FAIL,
      payload: message,
    });
  }
};

export const listToDosAction = () => async (dispatch, getState) => {
  try {
    console.log('Inside list to do action');
    dispatch({ type: LIST_TODO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.get("/api/todos", config);

    dispatch({
      type: LIST_TODO_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: LIST_TODO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteToDosAction =
  (todoId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_TODO_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.delete(
        `/api/todos/${todoId}`,
        config
      );

      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_TODO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailToDoAction = (todoId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DETAIL_TODO_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.get(
        `/api/todos/${todoId}`,
        config
      );

      dispatch({
        type: DETAIL_TODO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_TODO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateToDoAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_TODO_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.put(
        `/api/todos/${payload.id}`,
        { name: payload.name },
        config
      );

      dispatch({
        type: UPDATE_TODO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TODO_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
