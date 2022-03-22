import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Touchable,
  Image,
} from "react-native";

import { MAIN } from "../data/pseudo-data";
import IllnessGrid from "../components/IllnessGrid";
import { ScrollView } from "react-native-gesture-handler";

const MainScreen = (props) => {
  const renderGridItem = (itemData) => {
    return (
      <IllnessGrid
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "Patients",
            params: {
              categoryID: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return (
    <View>
      <Text style={styles.name}>Remote Patient Monitoring System</Text>

      <FlatList
        keyExtractor={(item, index) => item.id}
        data={MAIN}
        renderItem={renderGridItem}
        numColumns={2}
      />
      <Image
        source={require("../assets/iyte_logo-tur.png")}
        style={{ marginLeft: 90, marginTop: 35, height: 175, width: 175 }}
      />
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: "Main Page",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 80,
    fontWeight: "bold" ,
  }
});

export default MainScreen;
