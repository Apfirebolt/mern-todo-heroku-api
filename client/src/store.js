import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/authReducers'

import {
 addToDoReducer,
 updateToDoReducer,
 listToDoReducer,
 deleteToDoReducer,
 detailToDoReducer
} from './reducers/toDoReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addToDo: addToDoReducer,
  listToDo: listToDoReducer,
  updateToDo: updateToDoReducer,
  deleteToDo: deleteToDoReducer,
  detailToDo: detailToDoReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
