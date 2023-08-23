import { View, Text, Image, Button } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { firebase as RequestedItemFirebase } from "../../App/Components/Search/RequestItemsconfig";
import { firebase as DonatedItemFirebase } from "../components/Donor/Itemconfig";
import Colors from "../../App/Shared/Colors";

const categoryList = [
  {
    id: 1,
    name: "Food",
    value: "Food",
    icon: require("../../assets/food.png"),
  },
  {
    id: 2,
    name: "Books",
    value: "Books",
    icon: require("../../assets/books.png"),
  },
  {
    id: 3,
    name: "Cloths",
    value: "Cloths",
    icon: require("../../assets/cloths.png"),
  },
  {
    id: 4,
    name: "Tools",
    value: "Tools",
    icon: require("../../assets/tools.png"),
  },
  {
    id: 5,
    name: "Sports",
    value: "Sports",
    icon: require("../../assets/sports.png"),
  },
  {
    id: 6,
    name: "Instruments",
    value: "Instruments",
    icon: require("../../assets/musical.png"),
  },
];

export default function DonarBox({
  item,
  donatedList,
  _id,
  _idDonatedList,
  findsum,
}) {
  const [tempitem, setTempitem] = useState(item);
  const handleAccept = () => {
    item.RequestStatus = 1;
    setTempitem(item);
    donatedList.map((donation, index) => {
      if (donation.timeStamp === item.Timestamp) {
        RequestedItemFirebase.firestore()
          .collection("RequestData")
          .doc(_id)
          .update({
            RequestStatus: 1,
          })
          .then(() => {
            console.log("User updated!");
          });

        DonatedItemFirebase.firestore()
          .collection("Data")
          .doc(_idDonatedList[index])
          .update({
            isAvailable: false,
          })
          .then(() => {});
        return;
      }
    });
    findsum();
  };

  const handleReject = () => {
    item.RequestStatus = 2;
    setTempitem(item);
    donatedList.map((donation, index) => {
      if (donation.timeStamp === item.Timestamp) {
        RequestedItemFirebase.firestore()
          .collection("RequestData")
          .doc(_id)
          .update({
            RequestStatus: 2,
          })
          .then(() => {
            console.log("User updated!");
          });

        DonatedItemFirebase.firestore()
          .collection("Data")
          .doc(_idDonatedList[index])
          .update({
            isAvailable: true,
          })
          .then(() => {});
        return;
      }
    });
    findsum();
  };

  return (
    <View
      style={[
        styles.waiting,
        tempitem.RequestStatus == 1
          ? styles.accept
          : tempitem.RequestStatus == 2
          ? styles.reject
          : styles.waiting,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={categoryList[tempitem.selectedCategory.id - 1].icon}
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 500 }}>{tempitem.title}</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <Text>{tempitem.ReceiverPhoneNumber}</Text>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: "row",
          gap: 40,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Button
          onPress={handleAccept}
          title="      Accept      "
          color="green"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={handleReject}
          title="      Reject      "
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waiting: {
    backgroundColor: Colors.DARK_GRAY,
    padding: 8,
    marginLeft: 16,
    marginTop: 20,
    marginRight: 16,
    borderRadius: 10,
  },
  accept: {
    backgroundColor: "green",
    padding: 8,
    marginLeft: 16,
    marginTop: 20,
  },
  reject: {
    backgroundColor: "red",
    padding: 8,
    marginLeft: 16,
    marginTop: 20,
  },
});
