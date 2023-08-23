import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import SearchBar from "../Components/Search/SearchBar";
import GoogleMapViewFull from "../Components/Search/GoogleMapViewFull";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { firebase } from "../../src/components/Donor/Itemconfig";

import { CategoryProvider } from "../Context/CategoryContext";

export default function Search() {
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
    <CategoryProvider>
      <View>
        <View style={{ position: "absolute", zIndex: 2 }}>
          <SearchBar />
        </View>
        <GoogleMapViewFull List={List} />
      </View>
    </CategoryProvider>
  );
}
