import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { firebase } from "./config";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "#fff", // Background color
    },
    header: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333", // Title text color
    },
    header1: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#333", // Title text color
    },
    input: {
      height: 40,
      width: 300,
      borderColor: "#ccc", // Border color
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
      fontSize: 18,
    },
    button: {
      backgroundColor: "#007BFF", // Button background color
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff", // Button text color
      fontSize: 20,
      fontWeight: "bold",
    },
    link: {
      marginTop: 10,
      color: "#007BFF", // Link text color
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Hi Donor!</Text>
      <Text style={styles.header}>Login</Text>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.input}
          placeholder="Email Id"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Click to Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={styles.link}
      >
        <Text style={styles.link}>No account? Register here</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(StackActions.replace("ReceiverInterface"))
        }
        style={styles.link}
      >
        <Text style={styles.link}>Are you a receiver?</Text>
      </TouchableOpacity>
    </View>
  );
}
