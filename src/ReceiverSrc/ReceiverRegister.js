import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { firebase } from "./receiverconfig";
import * as Location from "expo-location";

export default function Registration() {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone_number, setPhone_number] = useState("");

  registerUser = async (
    email,
    password,
    firstName,
    lastName,
    phone_number,
    location
  ) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://finaltry-680f1.firebaseapp.com",
          })
          .then(() => {
            alert("Verification Email Sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("Receivers")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                phone_number,
                location,
              })
              .catch((error) => {
                alert(error.message);
              });
          });
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "#fff", // Background color
    },
    input: {
      height: 40,
      width: 250,
      borderColor: "#333", // Border color
      borderBottomWidth: 1,
      fontSize: 18,
      marginBottom: 20,
      paddingLeft: 10,
    },
    buttonText: {
      marginTop: 30,
      height: 50,
      width: 200,
      backgroundColor: "#FFD700", // Button background color
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    buttonTextText: {
      color: "#00f", // Button text color
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#333",
        }}
      >
        Register
      </Text>
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => setEmailid(email)}
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
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(phone_number) => setPhone_number(phone_number)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          registerUser(
            emailid,
            password,
            firstName,
            lastName,
            phone_number,
            location
          )
        }
        style={styles.buttonText}
      >
        <Text style={styles.buttonTextText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
