import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const IllnessGrid = props => {
    return (<TouchableOpacity  style={styles.gridItem} 
        onPress={props.onSelect}
        >
        <View style={{...styles.container, ...{backgroundColor: props.color}}}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    </TouchableOpacity>);
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        marginLeft: 20,
        marginTop: 75,
        height: 150,
        margin: 15
    },
    container: {
        flex:1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        textShadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        elevation:3,
        justifyContent: 'center',
        alignItems:'center'

    },
    title: {
        fontSize: 22
    }
});

export default IllnessGrid;