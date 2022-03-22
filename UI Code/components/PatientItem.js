import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const PatientItem = props => {
    return (
        <View style={styles.PatientItem}>
            <TouchableOpacity onPress={props.onSelectPatient}>
                <View>
                    <View style={{...styles.PatientRow}}>
                        <Text>{props.name}</Text>
                    </View>
                </View>
                <View style={{...styles.PatientRow, ...styles.PatientDetail}}> 
                    <Text>BPM: {props.BPM}</Text>
                    <Text>SpO2: {props.SpO}%</Text>
                    <Text>Temperature: {props.Temp}°C</Text>
                   
                </View>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    PatientItem: {
        height: 150,
        width: '100%',
        backgroundColor: '#fffacd',
        borderWidth:1
    },
    PatientRow: {
        flexDirection: 'column' ,
        height:50
    },
    //PatientHeader: {
      // height:'20%'
    //},
    PatientDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
});

export default PatientItem;