import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import Colors from "../../Shared/Colors";

export default function Header() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        gap: 5,
        marginTop: 10,
      }}
    >
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <View
        style={{
          backgroundColor: Colors.BLACK,
          borderRadius: 20,
          paddingLeft: 6,
          paddingRight: 6,
          paddinTop: 4,
          paddingBottom: 4,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 300, color: Colors.WHITE }}>
          {" "}
          Donation Hub{" "}
        </Text>
      </View>
      <Image
        source={require("../../../assets/placeholder.jpg")}
        style={styles.userImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 4,
    borderRadius: 50,
    paddingLeft: 10,
    width: Dimensions.get("screen").width * 0.6,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
