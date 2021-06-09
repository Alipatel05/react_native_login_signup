import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { render } from "react-dom";
import firebase from "firebase";
import SplashScreen from "./screens/splash";
import Login from "./screens/login";
import Registration from "./screens/registration";
import Home from "./screens/home";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SideNav from "./screens/SideNav";

const firebaseConfig = {
  apiKey: "AIzaSyAGbXvNLl9wFOwcGWWsSZEXWNAcGTV27Ys",
  authDomain: "rndemo-491e8.firebaseapp.com",
  projectId: "rndemo-491e8",
  storageBucket: "rndemo-491e8.appspot.com",
  messagingSenderId: "634857888701",
  appId: "1:634857888701:web:315f22db428a0ffe1610d4",
  measurementId: "G-HDFDEHS50Q",
};

//Init Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const NavStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      options={{ headerShown: false }}
      component={SplashScreen}
    />
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={Login}
    />
    <Stack.Screen
      name="Registration"
      options={{ headerShown: false }}
      component={Registration}
    />
     <Stack.Screen
      name="SideNav"
      options={({ navigation }) => ({
        title: "Side Navigation",
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerLeft: () => (
          <Icon
            style={{ marginLeft: 15, color: "#000000" }}
            name={"menu"}
            size={25}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      })}
      component={SideNav}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
