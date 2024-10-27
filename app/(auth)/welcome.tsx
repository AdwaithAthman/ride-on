import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  return (
    <SafeAreaView>
      <Text>Onboarding</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Onboarding;
