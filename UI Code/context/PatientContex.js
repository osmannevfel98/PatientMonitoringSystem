import React, { createContext } from "react";

export const FETCH_USERS = "FETCH_USERS";
export const SET_SELECTED_USER = "SET_SELECTED_USER";

export const initialState = {
  users: [],
  selectedUser: {},
};

export const fetchUsers = (users) => ({
  type: FETCH_USERS,
  users,
});

export const setSelectedUser = (user) => ({
  type: SET_SELECTED_USER,
  user,
});

export const usersReducer = (state = initialState, action) => {

  if (action.type === FETCH_USERS) {
    return {
      ...state,
      users: action.payload,
    };
  } else if (action.type === SET_SELECTED_USER) {
    return {
      ...state,
      selectedUser: action.payload,
    };
  }
};

export const PatientContext = createContext();
