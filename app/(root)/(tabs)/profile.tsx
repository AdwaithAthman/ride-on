import { StatusBar } from "expo-status-bar";
import { View, Text , TextInput , ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={{marginTop:100}}>
      <Text>Profile</Text>
      <StatusBar style="dark" />
      <TextInput onChangeText={(text) => console.log(text)} placeholder="Enter your name"   />
      <TouchableOpacity onPress={() => console.log('hello')} style={{backgroundColor:'red',width:200,marginVertical:300}}>
        <Text>Tap here</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default Profile;
