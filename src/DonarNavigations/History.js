import { View, Text } from "react-native";
import React, { useState } from "react";
import DonarBox from "./DonarBox";
import { useEffect } from "react";
import { firebase as RequestFirebase } from "../../App/Components/Search/RequestItemsconfig";
import { firebase as DonatedDataFirebase } from "../components/Donor/Itemconfig";

import { firebase, db } from "../DonorSrc/config";
import { ScrollView } from "react-native-gesture-handler";

export default function History() {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [DonatedList, setDonatedList] = useState([]);
  const [idList, setIdList] = useState([]);
  const [idDonatedList, setIdDonatedList] = useState([]);
  const [sum, setSum] = useState(0);

  const findsum = () => {
    let res = 0;
    {
      List.map((item, index) => {
        res += item.RequestStatus;
      });
    }
    setSum(res);
  };

  const fetchUserInfo = async () => {
    const { uid } = firebase.auth().currentUser;
    // Discard fetch when user ID not defined
    if (!uid) return;
    const userRef = firebase.firestore().collection("Donors").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData);
  };

  const fetchDonatedData = async () => {
    try {
      const requesteddata = DonatedDataFirebase.firestore().collection("Data");
      const querySnapshot = await requesteddata.get();
      const dataList = [];
      const tempidList = [];

      querySnapshot.forEach((element) => {
        var data = element.data();
        var data2 = element.id;
        dataList.push(data);
        tempidList.push(data2);
      });
      setDonatedList(dataList);
      setIdDonatedList(tempidList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Get user on mount
  // useEffect(() => {
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await RequestFirebase.firestore()
          .collection("RequestData")
          .get();
        const dataList = [];
        const tempidList = [];
        querySnapshot.forEach((element) => {
          var data = element.data();
          var data2 = element.id;
          dataList.push(data);
          tempidList.push(data2);
        });

        setList(dataList);
        setIdList(tempidList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    fetchUserInfo();
    fetchDonatedData();
  }, [sum]);
  if (!user) return null;
  if (loading) {
    return (
      <View>
        <Text>....Isloading....</Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={{ marginBottom: 10 }}>
        {List.map((item, index) => {
          if (
            item.RequestStatus == 0 &&
            item.DonorPhoneNumber == user.phone_number
          )
            return (
              <DonarBox
                key={index}
                item={item}
                donatedList={DonatedList}
                _id={idList[index]}
                _idDonatedList={idDonatedList}
                findsum={findsum}
              />
            );
        })}
      </ScrollView>
    );
  }
}
