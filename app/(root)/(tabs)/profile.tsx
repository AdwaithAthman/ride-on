import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Profile;
