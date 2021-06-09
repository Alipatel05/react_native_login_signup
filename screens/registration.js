import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firebase from "firebase";
import Spinner from "react-native-loading-spinner-overlay";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Spinner: false,
      firstNameValidator: true,
      firstName: "",
      lastNameValidator: true,
      lastName: "",
      emailValidator: true,
      email: "",
      passwordValidator: true,
      password: "",
    };
  }

  validate_field = () => {
    const { firstName, lastName, email, password } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (firstName == "") {
      // alert("Please Enter Email")
      this.setState({ firstNameValidator: false });
      return false;
    }
    if (lastName == "") {
      // alert("Please Enter Email")
      this.setState({ lastNameValidator: false });
      return false;
    }
    if (reg.test(email) === false) {
      // alert("Please Enter Email")
      this.setState({ emailValidator: false });
      return false;
    }
    if (password.length < 8) {
      // alert("Enter Valid Password")
      this.setState({ passwordValidator: false });
      return false;
    }
    return true;
  };

  parse_data = () => {
    if (this.validate_field()) {
      this.setState({ Spinner: true });
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
            console.log(user);
            this.setState({ Spinner: false });

            AsyncStorage.setItem(
              "user_name",
              this.state.firstName + " " + this.state.lastName
            );
            AsyncStorage.setItem("email_id", this.state.email);

            if (user != null) {
              this.props.navigation.navigate("Login", {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                emailId: this.state.email,
              });
            }
          });
      } catch (error) {
        this.setState({ Spinner: false });
        console.log(error.toString(error));
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.Spinner} color="#696969"></Spinner>
        <View style={styles.inputStyles}>
          <TextInput
            style={[
              styles.username,
              !this.state.firstNameValidator ? styles.error : null,
            ]}
            placeholder="Enter First Name"
            onChangeText={(Value) => this.setState({ firstName: Value })}
          />

          <TextInput
            style={[
              styles.username,
              !this.state.lastNameValidator ? styles.error : null,
            ]}
            placeholder="Enter Last Name"
            onChangeText={(Value) => this.setState({ lastName: Value })}
          />

          <TextInput
            style={[
              styles.username,
              !this.state.emailValidator ? styles.error : null,
            ]}
            placeholder="Enter Email ID"
            onChangeText={(Value) => this.setState({ email: Value })}
          />

          <TextInput
            style={[
              styles.username,
              !this.state.passwordValidator ? styles.error : null,
            ]}
            placeholder="Enter Password"
            onChangeText={(Value) => this.setState({ password: Value })}
          />

          <TouchableOpacity onPress={() => this.parse_data()}>
            <Text style={styles.buttonStyle}>Submit</Text>
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
    alignItems: "center",
    justifyContent: "center",
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
  buttonStyle: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#000000",
    color: "#ffff",
    borderRadius: 10,
    width: "90%",
    height: "30%",
    fontSize: 18,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  error: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
});
