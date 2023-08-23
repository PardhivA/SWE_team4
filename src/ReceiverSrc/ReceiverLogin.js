import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { StackActions, useNavigation } from "@react-navigation/native";
import { firebase } from "./receiverconfig";

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
    },
    header: {
      fontSize: 38,
      fontWeight: "bold",
      marginBottom: 40,
      textAlign: "center",
    },
    header1: {
      fontSize: 38,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      height: 40,
      width: "100%",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#007BFF",
      borderRadius: 5,
      paddingVertical: 15,
      paddingHorizontal: 30,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    link: {
      marginTop: 10,
      color: "#007BFF",
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Hi Receiver!</Text>
      <Text style={styles.header}>Login</Text>
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
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={styles.link}
      >
        <Text style={styles.link}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(StackActions.replace("DonorInterface"))
        }
        style={styles.link}
      >
        <Text style={styles.link}>Are you a Donor?</Text>
      </TouchableOpacity>
    </View>
  );
}
