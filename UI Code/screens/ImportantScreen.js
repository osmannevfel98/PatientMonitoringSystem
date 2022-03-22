import React from "react";
import { View, Text, StyleSheet} from 'react-native';
import PatientList from "../components/PatientList";
import { PATIENTS } from "../data/pseudo-data";

const ImportantScreen = props => {
    const impPatients = PATIENTS.filter(patient => patient.id === 'm2' || patient.id == 'm3');
    return <PatientList listData={impPatients} navigation={props.navigation} />;

};


export default ImportantScreen;