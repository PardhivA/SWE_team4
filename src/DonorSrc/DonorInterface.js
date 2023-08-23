import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./DonorLogin";
import Registration from "./DonorRegister";
import DashBoard from "../DashBoard";
import Header from "../components/Header";
import ReceiverInterface from "../ReceiverSrc/ReceiverInterface";
import Donar from "../DonarNavigations/Donar";
import DTabNavigation from "../DonarNavigations/DTabNavigation";

const Stack = createStackNavigator();
export default function DonorInterface() {
  const [initialising, setInitialising] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes

  function onAuthStateChanged(user) {
    setUser(user);
    if (initialising) setInitialising(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initialising) return null;
  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="DONATION HUB"
          component={Login}
          options={{
            headerLeft: () => null,
          }}
        />

        <Stack.Screen name="Registration" component={Registration} />

        <Stack.Screen name="ReceiverInterafce" component={ReceiverInterface} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DTabNavigation"
        component={DTabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
