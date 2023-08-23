import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useEffect } from "react";
import PlaceMarker from "../Home/PlaceMarker";
import { useCategory } from "../../Context/CategoryContext";

export default function GoogleMapView({ List }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { selectedCategory, setCategory } = useCategory();

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
    <View>
      <View style={styles.mp}>
        <MapView
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
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
            if (!item.location) return null;

            // Check if the selected category matches the category of the item
            if (
              selectedCategory &&
              selectedCategory.id === item.selectedCategory.id
            ) {
              return <PlaceMarker key={index} item={item} />;
            } else {
              return null; // Don't render anything for items that don't match the selected category
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
