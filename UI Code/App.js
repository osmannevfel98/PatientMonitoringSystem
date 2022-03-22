import React, { useReducer, useState } from "react";
//import * as Font from 'expo-font';
//import { AppLoading } from 'expo';
import { Text, View } from "react-native";
import {
  initialState,
  PatientContext,
  usersReducer,
} from "./context/PatientContex";
import PatientsNavigator from "./navigation/PatientsNavigator";
export default function App() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <PatientContext.Provider value={{ state, dispatch }}>
      <PatientsNavigator />
    </PatientContext.Provider>
  );
}
