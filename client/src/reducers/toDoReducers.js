import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_RESET,
  ADD_TODO_FAIL,
  LIST_TODO_REQUEST,
  LIST_TODO_SUCCESS,
  LIST_TODO_FAIL,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_RESET,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
  DELETE_TODO_RESET,
  DETAIL_TODO_REQUEST,
  DETAIL_TODO_SUCCESS,
  DETAIL_TODO_RESET,
  DETAIL_TODO_FAIL,
} from "../constants/toDoConstants";

export const addToDoReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TODO_REQUEST:
      return { loading: true };
    case ADD_TODO_SUCCESS:
      return { loading: false, success: true, toDo: action.payload };
    case ADD_TODO_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TODO_RESET:
      return {};
    default:
      return state;
  }
};

export const listToDoReducer = (state = { toDos: [] }, action) => {
  switch (action.type) {
    case LIST_TODO_REQUEST:
      return { loading: true };
    case LIST_TODO_SUCCESS:
      return { loading: false, toDos: action.payload };
    case LIST_TODO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateToDoReducer = (state = { toDo: {} }, action) => {
  switch (action.type) {
    case UPDATE_TODO_REQUEST:
      return { loading: true };
    case UPDATE_TODO_SUCCESS:
      return { loading: false, success: true, toDo: action.payload };
    case UPDATE_TODO_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_TODO_RESET:
      return { toDo: {} };
    default:
      return state;
  }
};

export const deleteToDoReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TODO_REQUEST:
      return { loading: true };
    case DELETE_TODO_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TODO_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TODO_RESET:
      return {};
    default:
      return state;
  }
};

export const detailToDoReducer = (state = { toDo: {} }, action) => {
  switch (action.type) {
    case DETAIL_TODO_REQUEST:
      return { loading: true };
    case DETAIL_TODO_SUCCESS:
      return { loading: false, toDo: action.payload };
    case DETAIL_TODO_FAIL:
      return { loading: false, error: action.payload };
    case DETAIL_TODO_RESET:
      return { toDo: {} };
    default:
      return state;
  }
};



