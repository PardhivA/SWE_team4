import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../Shared/Colors";

const categoryList = [
  {
    id: 1,
    name: "Food",
    value: "Food",
    icon: require("./../../../assets/food.png"),
  },
  {
    id: 2,
    name: "Books",
    value: "Books",
    icon: require("./../../../assets/books.png"),
  },
  {
    id: 3,
    name: "Cloths",
    value: "Cloths",
    icon: require("./../../../assets/cloths.png"),
  },
  {
    id: 4,
    name: "Tools",
    value: "Tools",
    icon: require("./../../../assets/tools.png"),
  },
  {
    id: 5,
    name: "Sports",
    value: "Sports",
    icon: require("./../../../assets/sports.png"),
  },
  {
    id: 6,
    name: "Instruments",
    value: "Instruments",
    icon: require("./../../../assets/musical.png"),
  },
];

export default function RequestBox({ item }) {
  const category = categoryList[item.selectedCategory.id - 1];

  const statusStyle =
    item.RequestStatus === 1
      ? styles.accept
      : item.RequestStatus === 2
      ? styles.reject
      : styles.waiting;

  const statusText =
    item.RequestStatus === 1
      ? "#Accepted"
      : item.RequestStatus === 2
      ? "#Rejected"
      : "#Waiting";

  const phoneNumberContainerStyle =
    item.RequestStatus === 1
      ? styles.acceptPhoneNumberContainer
      : item.RequestStatus === 2
      ? styles.rejectPhoneNumberContainer
      : styles.waitingPhoneNumberContainer;

  const statusTextStyle =
    item.RequestStatus === 1
      ? styles.acceptText
      : item.RequestStatus === 2
      ? styles.rejectText
      : styles.waitingText;

  return (
    <View style={[styles.container, statusStyle]}>
      <View style={styles.content}>
        <Image source={category.icon} style={styles.icon} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={[styles.phoneNumberContainer, phoneNumberContainerStyle]}>
        <Text style={[styles.hashtag, statusTextStyle]}>{statusText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.GRAY, // Default background color for all items
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.BLACK,
  },
  phoneNumberContainer: {
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
  },
  accept: {
    borderColor: "green",
  },
  reject: {
    borderColor: "red",
  },
  waiting: {
    borderColor: "yellow",
  },
  acceptPhoneNumberContainer: {
    backgroundColor: "green",
  },
  rejectPhoneNumberContainer: {
    backgroundColor: "red",
  },
  waitingPhoneNumberContainer: {
    backgroundColor: "yellow",
  },
  hashtag: {
    fontSize: 18,
    fontWeight: 500,
    padding: 4,
  },
  phoneNumberText: {
    color: "white",
  },
  acceptText: {
    color: "white",
  },
  rejectText: {
    color: "white",
  },
  waitingText: {
    color: "black",
  },
});
