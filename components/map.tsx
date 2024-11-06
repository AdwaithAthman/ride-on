import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Map() {
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={styles.map}
      className="rounded-2xl w-full h-full"
      tintColor="black"
      mapType="standard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  }
});
