import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rides = () => {
  return (
    <SafeAreaView>
      <Text>Rides</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Rides;
