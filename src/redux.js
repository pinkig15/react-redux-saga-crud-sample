import { API_FETCH_USERS, API_SEARCH_USER } from "./constants";

const initialState = {
  fetching: false,
  data: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_FETCH_USERS:
      return { ...state, fetching: true, error: null };
    case `${API_FETCH_USERS}_SUCCESS`: {
      console.log(action);
      return { ...state, fetching: false, data: action.responseData };
    }
    case `${API_FETCH_USERS}_FAILURE`:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };

    case API_SEARCH_USER:
      return { ...state, fetching: true, error: null };
    case `${API_SEARCH_USER}_SUCCESS`:
      return { ...state, fetching: false, data: action.responseData };
    case `${API_SEARCH_USER}_FAILURE`:
      return {
        ...state,
        fetching: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}
