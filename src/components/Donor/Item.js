// import { View, Text } from 'react-native'
import React from "react";
import { useState } from "react";
import Colors from "../../../App/Shared/Colors";
import { Dimensions } from "react-native";
import { StyleSheet, Platform, Alert } from "react-native";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { TextInput, Button as Button2 } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";
import * as FileSystem from "expo-file-system";
import { firebase } from "./Itemconfig";
import { firebase as donarFirebase } from "../../DonorSrc/config.js";
import { Entypo } from "@expo/vector-icons";
import { DebugInstructions } from "react-native/Libraries/NewAppScreen";
import * as Location from "expo-location";
import { useEffect } from "react";
const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.WHITE,
  },
  section: {
    marginBottom: 16,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryDropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.BLACK,
    padding: 8,
    borderRadius: 10,
  },
  categoryDropdownText: {
    marginLeft: 8,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: Colors.BLUE,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
};

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

export default function Item() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [t, setT] = useState(1);

  const [List, setList] = useState([]);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    donarFirebase
      .firestore()
      .collection("Donors")
      .doc(donarFirebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        } else {
          console.log("user does not exist");
        }
      });
  }, []);

  // const [location, setLocation] = useState(null);
  const uploadImage = async () => {
    if (selectedCategory == null) {
      Alert.alert("Select Category!");
      return;
    }
    if (title == "") {
      Alert.alert("Title required");
      return;
    }

    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);

      setUploading(false);
      Alert.alert("Thank you for donating !!");

      firebase
        .storage()
        .ref("/" + filename) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })

        .catch((e) => console.log("Errors while downloading => ", e));

      // setT(t + 1);
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert("Failed to upload image. Please try again.");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    toggleDropdown();
  };

  const SaveDetails = () => {
    firebase
      .firestore()
      .collection("Data")
      .add({
        selectedCategory: selectedCategory,
        title: title,
        description: des,
        imageUrl: imageUrl, //convert this to string
        location: userData.location,
        name: userData.firstName,
        phone_number: userData.phone_number,
        timeStamp: Date().toLocaleString(),
        isAvailable: true,
      })
      .then(() => {
        Alert.alert("Details Saved!! Please Upload now !!");
      });
  };
  const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Select Category:</Text>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.categoryDropdown}
        >
          {selectedCategory ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={selectedCategory.icon}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={styles.categoryDropdownText}>
                {selectedCategory.name}
              </Text>
            </View>
          ) : (
            <Text>Select a category</Text>
          )}
        </TouchableOpacity>
        {isDropdownVisible && (
          <ScrollView
            style={{
              backgroundColor: Colors.BLACK,
              position: "absolute",
              zIndex: 1,
              width: "100%",
              marginTop: 24,
              padding: 8,
              borderRadius: 10,
              marginTop: 80,
            }}
          >
            <View>
              {categoryList.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleCategorySelect(category)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Image
                    source={category.icon}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <Text style={{ color: Colors.WHITE }}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Title:</Text>
        <TextInput
          placeholder="Title"
          style={{
            borderWidth: 1,
            borderColor: Colors.black,
            padding: 8,
            borderRadius: 10,
            paddingLeft: 10,
            width: Dimensions.get("screen").width * 0.7,
            shadowRadius: 5,
          }}
          onChangeText={(res) => setTitle(res)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Description:</Text>
        <TextInput
          placeholder="Write about the item"
          style={{
            borderWidth: 1,
            borderColor: Colors.black,
            padding: 8,
            borderRadius: 10,
            paddingLeft: 10,
            height: 100,
            width: Dimensions.get("screen").width * 0.7,
          }}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.sectionText}>Upload Photo:</Text>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginBottom: 10,
              }}
            >
              {/* <Text style={{ fontSize: 16, fontWeight: 800, marginLeft: 8 }}>
                Image
              </Text> */}
              <Entypo name="save" size={24} color="grey" marginLeft={10} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: Dimensions.get("screen").width * 0.7,
                height: 300,
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
          )}
          <View style={{ marginBottom: 22, marginTop: 16 }}>
            <Button2
              onPress={SaveDetails}
              title="Save Details"
              color="#841584"
            />
          </View>
          <Button2
            onPress={uploadImage}
            title="Upload Details"
            color="#841584"
          />
        </View>
      </View>
    </ScrollView>
  );
}
