import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../Components/Home/Header";
import GoogleMapView from "../Components/Home/GoogleMapView";
import CategoryList from "../Components/Home/CategoryList";
import Colors from "../Shared/Colors";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { firebase } from "../../src/components/Donor/Itemconfig";
export default function Home() {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection("Data")
          .get();
        const dataList = [];

        querySnapshot.forEach((element) => {
          var data = element.data();
          dataList.push(data);
        });

        setList(dataList);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20, backgroundColor: Colors.WHITE }}>
          <Header />
          <GoogleMapView List={List} />
          <CategoryList List={List} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
