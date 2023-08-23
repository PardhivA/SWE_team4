import { View, Text } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { TouchableOpacity } from "react-native";
import DonationCard from "./donationCard";
import { FlatList } from "react-native";
import DonationDetails from "./donationDetails";

function take5ele(selectedCategoryName, List) {
  var info = [];
  List.map((item) => {
    if (
      selectedCategoryName == item.selectedCategory.name &&
      item.isAvailable == true
    ) {
      info = [...info, item];
    }
  });
  return info;
}

export default function SelectedCategoryList({
  categoryName,
  categoryImage,
  List,
}) {
  var info = [];
  info = take5ele(categoryName, List);
  return (
    <View style={{ marginTop: 15, backgroundColor: Colors.WHITE }}>
      <Text style={{ fontSize: 20 }}>Nearby {categoryName} Donations</Text>

      <FlatList
        data={info}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <DonationCard categoryItem={item} categoryImage={categoryImage} />
          </TouchableOpacity>
        )}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
      />
    </View>
  );
}
