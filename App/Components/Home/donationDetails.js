import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { Dimensions } from "react-native";

export default function DonationDetails({
  profilePhoto,
  profileName,
  profileLocation,
  profileDonation,
}) {
  return (
    <View
      style={{
        backgroundColor: Colors.DARK_GRAY,
        width: Dimensions.get("screen").width * 0.8,
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "center",
        padding: 40,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.WHITE,
          width: 60,
          height: 60,
          marginTop: 25,
          padding: 5,
          borderRadius: 30,
        }}
      >
        <Image source={profilePhoto} style={{ width: 50, height: 50 }}></Image>
      </View>
      <Text style={{ margin: 10 }}>NAME: {profileName}</Text>
      <Text style={{ margin: 10 }}>DONATION: {profileDonation}</Text>
      <Text style={{ margin: 10 }}>LOCATION: {profileLocation}</Text>
    </View>
  );
}
