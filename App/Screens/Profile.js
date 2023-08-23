import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from "../../src/ReceiverSrc/receiverconfig.js";
export default function Profile() {
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    const { uid } = firebase.auth().currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return;
    const userRef = firebase.firestore().collection("Receivers").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData);
  };

  // Get user on mount
  useEffect(() => {
    fetchUserInfo();
  }, []);
  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            marginTop: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            style={{ marginBottom: 8 }}
            size={100}
          />
          <Title style={styles.title}>
            {user.firstName} {user.lastName}
          </Title>
          <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
            <Ionicons name="location-sharp" size={24} color="#D2042D" />
            <Caption>IIT Tirupati, India</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection2}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={28} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +91 {user.phone_number}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={28} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
        </View>

        <View style={styles.row}>
          <AntDesign
            name="logout"
            size={24}
            color="#777777"
            onPress={() => firebase.auth().signOut()}
          />
          <Text
            style={{ color: "#777777", marginLeft: 20 }}
            onPress={() => firebase.auth().signOut()}
          >
            Logout
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
  userInfoSection: {
    paddingHorizontal: 16,
    marginBottom: 45,
  },
  userInfoSection2: {
    paddingHorizontal: 16,
    marginBottom: 45,
    display: "flex",
    gap: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
