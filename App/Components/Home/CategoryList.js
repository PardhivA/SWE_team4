import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import CategoryItem from "./CategoryItem";
import { TouchableOpacity } from "react-native";
import SelectedCategoryList from "../Home/SelectedCategoryList";
import Colors from "../../Shared/Colors";

export default function CategoryList({ List }) {
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

  const [activeCategory, setActiveCategory] = React.useState("Food");
  const [activeCategoryImage, setActiveCategoryImage] = React.useState(
    categoryList[0].icon
  );

  return (
    <View style={{ marginTop: 20, backgroundColor: Colors.WHITE }}>
      <Text style={{ fontSize: 20 }}>Select Top Categories</Text>
      <FlatList
        data={categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setActiveCategory(item.name);
              setActiveCategoryImage(item.icon);
              // console.log(item.name);
              // console.log(activeCategory);
            }}
          >
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5 }}
      />
      <SelectedCategoryList
        categoryName={activeCategory}
        categoryImage={activeCategoryImage}
        List={List}
      />
    </View>
  );
}
