import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./src/DonorSrc/config";
import DonorInterface from "./src/DonorSrc/DonorInterface";
import ReceiverInterface from "./src/ReceiverSrc/ReceiverInterface";
import ItemInfo from "./App/Components/Search/ItemInfo";
import ItemInfo2 from "./App/Components/Search/ItemInfo2";
import Entry from "./src/Entry";
import Header from "./src/components/Header";
import { Dimensions, View, Image } from "react-native";

const Stack = createStackNavigator();
const gifurl =
  "https://i.pinimg.com/originals/06/2b/aa/062baabe40ac8aa395bcfbc6f0351534.gif";
function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DonorInterface"
        component={DonorInterface}
        options={{
          headerLeft: () => null,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReceiverInterface"
        component={ReceiverInterface}
        options={{
          headerLeft: () => null,
          headerShown: false,
        }}
      />
      <Stack.Screen name="Iteminfo" component={ItemInfo} />
      <Stack.Screen name="Iteminfo2" component={ItemInfo2} />
    </Stack.Navigator>
  );
}

export default () => {
  //const width = useWindowDimensions();
  const [shouldStop, setShouldStop] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldStop(true);
    }, 2500); // Stop the GIF after 5 seconds
    return () => clearTimeout(timer); // Clear the timeout if the component unmounts
  }, []);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  if (shouldStop) {
    return (
      <NavigationContainer>
        <App />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1, width: screenWidth, height: screenHeight }}
          source={{ uri: gifurl }}
          resizeMode="cover" // Use resizeMode "cover" to fill the entire container
        />
      </View>
    </NavigationContainer>
  );
};
