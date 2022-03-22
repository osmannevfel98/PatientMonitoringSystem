import axios from "axios";
import React, { useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PatientContext, SET_SELECTED_USER } from "../context/PatientContex";
import PatientItem from "./PatientItem";

const PatientList = (props) => {
  const { state, dispatch } = useContext(PatientContext);

  const renderPatientItem = (itemData) => {
    return (
      <PatientItem
        key={itemData.item.email}
        name={itemData.item.name}
        BPM={itemData.item.BPM}
        Temp={itemData.item.Temp}
        SpO={itemData.item.SpO}
       // Hum={itemData.item.Hum}
        onSelectPatient={() => {
          dispatch({
            type: SET_SELECTED_USER,
            payload: itemData.item,
          });
          props.navigation.navigate({
            routeName: "PatientProfile",
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        keyExtractor={(item, index) => item?.index?.toString()}
        renderItem={renderPatientItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientList;
/*<View style={styles.screen}>
<FlatList 
data={displayedPatients} 
keyExtractor={(item,index) => item.id} 
renderItem={renderPatientItem}
style={{width:'100%'}}
/>
</View> */

/* 
   screen: {
        flex:1,
        justifyContent: "center",
        alignItems:"center"
    }   
*/
