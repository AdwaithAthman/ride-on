import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  return (
    <SafeAreaView>
      <Text>SignIn</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default SignIn;
