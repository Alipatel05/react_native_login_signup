import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Spinner: false,
      usernameValidate: true,
      username: "",
      passwordValidate: true,
      password: "",
    };
  }

  validate_field = () => {
    const { username, password } = this.state;
    if (username == "") {
      // alert("Please Enter Email")
      this.setState({ usernameValidate: false });
      return false;
    }
    if (password.length < 8) {
      // alert("Enter Valid Password")
      this.setState({ passwordValidate: false });
      return false;
    }
    return true;
  };

  making_login_call = () => {
    if (this.validate_field()) {
      this.setState({ Spinner: true });
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.username, this.state.password)
          .then((res) => {
            console.log(res.user.email);
            this.setState({ Spinner: false });
            this.props.navigation.navigate("SideNav");
          });
      } catch (error) {
        this.setState({ Spinner: false });
        console.warn(error.toString(error));
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.Spinner} color="#696969"></Spinner>

        <View style={styles.loginTitle}>
          <Text style={styles.loginText}>{/* Login */}</Text>
        </View>

        <View style={styles.inputStyles}>
          <TextInput
            style={[
              styles.username,
              !this.state.usernameValidate ? styles.error : null,
            ]}
            placeholder="Enter Username"
            onChangeText={(Value) => this.setState({ username: Value })}
          />

          <TextInput
            style={[
              styles.password,
              !this.state.passwordValidate ? styles.error : null,
            ]}
            placeholder="Enter Password"
            secureTextEntry
            onChangeText={(Value) => this.setState({ password: Value })}
          />

          <TouchableOpacity onPress={() => this.making_login_call()}>
            <Text style={styles.buttonStyle}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Registration")}
          >
            <Text style={styles.Registration}>Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
  },
  loginTitle: {
    width: "100%",
    height: "20%",
    marginTop: 100,
  },
  loginText: {
    fontSize: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputStyles: {
    width: "100%",
    justifyContent: "center",
  },
  username: {
    padding: 5,
    margin: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  password: {
    padding: 5,
    margin: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  buttonStyle: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#000000",
    color: "#ffff",
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
  },
  error: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  Registration: {
    fontSize: 18,
    textAlign: "right",
    marginEnd: 20,
  },
});
