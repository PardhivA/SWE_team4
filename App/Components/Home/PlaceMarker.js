import React from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import { useRouter } from "expo-router";

export default function PlaceMarker({ item }) {
  const navigation = useNavigation();

  if (!item) {
    return null; // Return null or some placeholder component if item is falsy
  }
  // console.log(item);
  const handlePress = () => {
    navigation.navigate("Iteminfo", { item });
  };
  return (
    <View>
      <Marker
        title={item.title}
        coordinate={{
          latitude: item.location.coords.latitude,
          longitude: item.location.coords.longitude,
          latitudeDelta: 0.051,
          longitudeDelta: 0.041,
        }}
        onPress={handlePress}
        // When the Marker is pressed, navigate to "ItemInfo"
      />
    </View>
  );
}
