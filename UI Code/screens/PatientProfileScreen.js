import React, { Component, useContext, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { PATIENTS } from "../data/pseudo-data";
import HeaderButton from "../components/HeaderButton";
import { PatientContext, SET_SELECTED_USER } from "../context/PatientContex";
import axios from "axios";

const PatientProfileScreen = (props) => {
  
  // const patient = props.navigation.getParam("patient");
  const { state, dispatch } = useContext(PatientContext);
  const getAllPatients = async () => {
    let usersArr = [];
    const response = await axios.get("http://192.168.1.27:3000");
    Object.keys(response.data.data).map((key) => {
      usersArr.push(response.data.data[key]);
    });

    // setUsers(usersArr);
    dispatch({
      type: SET_SELECTED_USER,
      payload: usersArr[0],
    });


  };

  useEffect(() => {
    getAllPatients();
    const interval = setInterval(() => {
      getAllPatients();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
 
  return (

    <ScrollView>
      <View style={styles.header}></View>
    
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />

      <View style={styles.screen}>
        <Text style={styles.text}>Name: {state.selectedUser.name}</Text>
        <Text style={styles.text}>Age: {state.selectedUser.age}</Text>
        <Text style={styles.text}>
          BPM: {state.selectedUser.BPM}                   SpO2: {state.selectedUser.SpO}%
        </Text>
        <Text style={styles.text}>
          °C: {state.selectedUser.Temp}                       
        </Text>
        <Button
          style={styles.button}
          title="Go Back"
          onPress={() => {
            props.navigation.goBack(); //orijinali poptotop
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    //flex:1,

    marginTop: 80,
  },
  text: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    fontSize: 20,
  },

  header: {
    backgroundColor: "#00BFFF",
    height: 150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },

  button: {
    fontSize: 1,
  },
});

export default PatientProfileScreen;
