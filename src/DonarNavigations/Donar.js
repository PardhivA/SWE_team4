import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DTabNavigation from "./DTabNavigation";
import Colors from "../../App/Shared/Colors";
import Title from "../components/Donor/Title";
import Item from "../components/Donor/Item";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function Donar() {
  return (
    <ScrollView style={{ padding: 21, backgroundColor: Colors.WHITE }}>
      <Title />
      <Item />
    </ScrollView>
  );
}
