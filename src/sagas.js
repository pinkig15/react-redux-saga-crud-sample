import { takeLatest, call, put, all } from "redux-saga/effects";
import { callFetchUsers, callSearchUser } from "./apis";
import { API_FETCH_USERS, API_SEARCH_USER } from "./constants";

export function* fetchUsers() {
  try {
    const response = yield call(callFetchUsers);
    const responseData = response.data;
    yield put({ type: `${API_FETCH_USERS}_SUCCESS`, responseData });
  } catch (error) {
    yield put({ type: `${API_FETCH_USERS}_FAILURE`, error });
  }
}

export function* searchUser() {
  try {
    const response = yield call(callSearchUser);
    const responseData = response.data;
    yield put({ type: `${API_SEARCH_USER}_SUCCESS`, responseData });
  } catch (error) {
    yield put({ type: `${API_SEARCH_USER}_FAILURE`, error });
  }
}

export function* allSagas() {
  yield all([
    takeLatest(API_FETCH_USERS, fetchUsers),
    takeLatest(API_SEARCH_USER, searchUser)
  ]);
}

export default [allSagas];
