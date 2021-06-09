import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import tabA from "./tabA";
import tabB from "./tabB";

export default class Home extends React.Component {
  render() {
    const Tab = createMaterialBottomTabNavigator();
    return (
      <Tab.Navigator
        activeColor="#000000"
        //if neccessary then uncomment inactive color
        // inactiveColor="#3E2465"
        barStyle={{ paddingBottom: 0, backgroundColor: "#FFFFFF" }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          name="Tab-A"
          component={tabA}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="tools" color={color} size={26} />
            ),
          }}
          name="Tab-B"
          component={tabB}
        />
      </Tab.Navigator>
    );
  }
}
