import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Chat = () => {
  return (
    <SafeAreaView>
      <Text>Chat</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Chat;
