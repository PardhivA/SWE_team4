import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { Dimensions } from "react-native";
import DonationDetails from "./donationDetails";

import { useNavigation } from "@react-navigation/native";

export default function DonationCard({ categoryItem, categoryImage }) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Iteminfo2", categoryItem);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View
          style={{
            margin: 5,
            width: Dimensions.get("screen").width * 0.89,
            height: 70,
            backgroundColor: Colors.GRAY,
            elevation: 0.2,
            borderRadius: 20,
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            source={categoryImage}
            style={{ width: 50, height: 50, margin: 10 }}
          ></Image>
          <View style={{ margin: 15, marginLeft: 0 }}>
            <Text>{categoryItem.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
