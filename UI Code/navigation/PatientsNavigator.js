import React from 'react';
import { createStackNavigator} from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MainScreen from '../screens/MainScreen'; 
import PatientProfileScreen from '../screens/PatientProfileScreen';
import PatientsScreen from '../screens/PatientsScreen';
import Colors from '../constants/Colors';
import ImportantScreen from '../screens/ImportantScreen';

const PatientsNavigator = createStackNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor
            }
        }
    },
    Patients: {
        screen: PatientsScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor
            }
        }
    },
    PatientProfile: {
        screen: PatientProfileScreen,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor
            }
        }
    },
},

); 


const ImpNavigator = createStackNavigator({
    Importants: ImportantScreen,
    PatientProfile: PatientProfileScreen
});


const tabScreenConfig = 
    {
        Patients: {screen: PatientsNavigator, navigationOptions: { tabBarLabel:'Main',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='albums-outline' size={35} color={tabInfo.tintColor} />;
            },
        
        }},
        Importants: {screen: ImpNavigator, navigationOptions: { tabBarLabel: 'Importants',
            tabBarIcon: (tabInfo) => {
              //  return <Ionicons name='alert-outline' size={35} color={tabInfo.tintColor} />;
              return <Ionicons name='alert-outline' size={35} color={tabInfo.tintColor} />;
        },
        
    }}
    }


const PatientsImpTabNavigator = createMaterialBottomTabNavigator(
    tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor
    }
});


export default createAppContainer(PatientsImpTabNavigator);       