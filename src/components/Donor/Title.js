import { View, Text } from "react-native";
import React from "react";

export default function Title() {
  return (
    <View
      style={{
        marginTop: 16,
        alignItems: "center",
        marginBottom: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 50,
        padding: 4,
        shadowColor: "grey",
        elevation: 1,
      }}
    >
      <Text style={{ fontWeight: 600, fontSize: 24 }}>Donate for a cause</Text>
    </View>
  );
}
