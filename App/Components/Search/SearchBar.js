import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../Shared/Colors";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

import { useCategory } from "../../Context/CategoryContext";

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

export default function SearchBar() {
  const { selectedCategory, setCategory } = useCategory();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    toggleDropdown();
    // now we can change content according to selected category
  };

  return (
    <View style={{ marginTop: 1 }}>
      <LinearGradient
        colors={[Colors.WHITE, "transparent"]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          {/* Styled "Discover" text */}
          <Text style={styles.discoverText}>Discover</Text>
          <Image
            source={require("../../../assets/placeholder.jpg")}
            style={styles.userImage}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={toggleDropdown}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedCategory ? (
                  <>
                    <Image
                      source={selectedCategory.icon}
                      style={styles.categoryIcon}
                    />
                    <Text style={styles.categoryText}>
                      {selectedCategory.name}
                    </Text>
                  </>
                ) : (
                  "Select Category"
                )}
              </Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <ScrollView style={styles.dropdownList}>
                {categoryList.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={styles.dropdownItem}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <Image source={category.icon} style={styles.categoryIcon} />
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: Colors.black,
    padding: 4,
    borderRadius: 50,
    paddingLeft: 10,
    width: Dimensions.get("screen").width * 0.6,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "relative",
    width: Dimensions.get("screen").width * 0.9,
  },
  dropdownButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 15,
    maxHeight: 660,
    elevation: 3,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  categoryIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  discoverText: {
    fontSize: 35,
    color: Colors.BLACK,
  },
});
