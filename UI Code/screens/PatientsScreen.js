import React, { useState, useEffect, useContext, useReducer } from "react";
//import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from "axios";
import PatientList from "../components/PatientList";
import { FETCH_USERS, PatientContext } from "../context/PatientContex";

const PatientsScreen = (props) => {
  const { state, dispatch } = useContext(PatientContext);

  const getAllPatients = async () => {
    let usersArr = [];
    const response = await axios.get("http://192.168.1.27:3000");
    console.log(response.data)
    Object.keys(response.data.data).map((key) => {
      usersArr.push(response.data.data[key]);
    });

    // setUsers(usersArr);
    dispatch({
      type: FETCH_USERS,
      payload: usersArr,
    });
  };

  useEffect(() => {
    getAllPatients();
    const interval = setInterval(() => {
      getAllPatients();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <PatientList listData={state.users} navigation={props.navigation} />;
};

// PatientsScreen.navigationOptions = navigationData => {
//     const catId = navigationData.navigation.getParam('categoryID');

//     const selectedCateogory = MAIN.find(cat => cat.id === catId);

//     return {
//         headerTitle: selectedCateogory.name
//     }
// };

export default PatientsScreen;
