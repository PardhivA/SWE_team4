import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useEffect } from "react";
import PlaceMarker from "./PlaceMarker";
import { useNavigation } from "@react-navigation/native";

export default function GoogleMapView({ List }) {
  const navigation = useNavigation();
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(() => {
    if (location) {
      setMapRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    }
  }, [location]);

  // console.log(List.length);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "600" }}>
        Near By Donors
      </Text>
      <View style={styles.mp}>
        <MapView
          style={{
            width: Dimensions.get("screen").width * 0.89,
            height: Dimensions.get("screen").height * 0.23,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
          onUserLocationChange={(event) => {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setMapRegion((prevRegion) => ({
              ...prevRegion,
              latitude,
              longitude,
            }));
          }}
        >
          <Marker title="You" coordinate={mapRegion} pinColor="blue">
            <Callout>
              <Text>You are here!</Text>
            </Callout>
          </Marker>

          {List.map((item, index) => {
            // Check if the item has the 'location' property
            if (item.location) {
              return <PlaceMarker item={item} />;
            } else {
              return null; // Don't render anything for items without 'location'
            }
          })}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mp: {
    borderRadius: 20,
    overflow: "hidden",
  },
});
