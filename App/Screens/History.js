import { Text, View } from "react-native";
import { firebase as RequestItemsFirebase } from "../Components/Search/RequestItemsconfig";
import React, { useState, useEffect } from "react";
import RequestBox from "../Components/History/RequestBox";
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../../src/ReceiverSrc/receiverconfig";
import { firebase as DonatedDataFirebase } from "../../src/components/Donor/Itemconfig";
export default function History() {
  const [userData, setUserData] = useState([]);
  const [DonatedData, setDonatedData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [DonDataloading, setDonDataloading] = useState(true);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const querySnapshot = await RequestItemsFirebase.firestore()
          .collection("RequestData")
          .get();
        const dataList = [];

        querySnapshot.forEach((element) => {
          var data = element.data();
          dataList.push(data);
        });

        setUserData(dataList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const querySnapshot = await DonatedDataFirebase.firestore()
          .collection("Data")
          .get();
        const dataList = [];

        querySnapshot.forEach((element) => {
          var data = element.data();
          dataList.push(data);
        });

        setDonatedData(dataList);
        setDonDataloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDonDataloading(false);
      }
    };

    fetchRequestData();
    fetchData();
  }, []);

  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    const { uid } = firebase.auth().currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return;
    const userRef = firebase.firestore().collection("Receivers").doc(uid);
    const doc = await userRef.get();
    const asdf = doc.data();
    setUser(asdf);
  };

  const filterUserData = () => {
    let newdata = [];
    userData.map((item) => {
      if (item.ReceiverPhoneNumber === user.phone_number) {
        newdata = [...newdata, item];
      }
    });
    setUserData(newdata);
  };

  const filterToAvailability = () => {
    let newdata = [];
    userData.map((item) => {
      DonatedData.map((donated) => {
        if (item.Timestamp === donated.timeStamp) {
          if (donated.isAvailable) {
            newdata = [...newdata, item];
          }
        }
      });
      setUserData(newdata);
    });
  };

  // Get user on mount
  useEffect(() => {
    fetchUserInfo();
    filterUserData();
    filterToAvailability();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Is loading....</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ marginTop: 20, backgroundColor: "white" }}>
      {userData.map((item, index) => (
        <RequestBox key={index} item={item} />
      ))}
    </ScrollView>
  );
}
