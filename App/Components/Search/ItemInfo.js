import { View, Text, Image, ScrollView, Alert } from "react-native";
// import React from "react";
import { Button as Button2 } from "react-native";
import React, { useState, useEffect } from "react";

import { Dimensions } from "react-native";
// import { firebase } from "./Itemconfig";
import { firebase as ReceiverFirebase } from "../../../src/ReceiverSrc/receiverconfig.js";
import { firebase as RequestItemsFirebase } from "./RequestItemsconfig.js";
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

export default function ItemInfo({ route }) {
  const item = route.params?.item;
  const [userData, setUserData] = useState();
  const fetchUserInfo = async () => {
    ReceiverFirebase.firestore()
      .collection("Receivers")
      .doc(ReceiverFirebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const RequestFun = () => {
    RequestItemsFirebase.firestore().collection("RequestData").add({
      DonorName: item.name,
      DonorPhoneNumber: item.phone_number,
      selectedCategory: item.selectedCategory,
      title: item.title,
      ReceiverName: userData.firstName,
      ReceiverPhoneNumber: userData.phone_number,
      RequestStatus: 0,
      Timestamp: item.timeStamp,
    });

    Alert.alert("Request Sent !!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryContainer}>
        <Image
          source={categoryList[item.selectedCategory.id - 1].icon}
          style={styles.categoryIcon}
        />
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Donar:</Text>
          <Text style={styles.detailText}>{item.name}</Text>
        </View>
        <View style={styles.detailSection}>
          <Text style={styles.detailLabel}>Phone No:</Text>
          <Text style={styles.detailText}>{item.phone_number}</Text>
        </View>
        {item.description && (
          <View style={styles.detailSection}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailText}>{item.description}</Text>
          </View>
        )}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width * 0.7,
            alignSelf: "center",
            borderRadius: 50,
          }}
        >
          <Button2
            title="Request"
            color="#841584"
            style={styles.requestButton}
            onPress={RequestFun}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.GREY,
  },
  categoryContainer: {
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailSection: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 18,
    width: 100,
  },
  detailText: {
    flex: 1,
    fontSize: 18,
  },
  itemImage: {
    marginTop: 16,
    width: Dimensions.get("screen").width * 0.8,
    height: 300,
    borderRadius: 30,
    marginBottom: 28,
  },
  requestButton: {
    width: 10,
  },
};
