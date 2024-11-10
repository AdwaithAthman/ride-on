import CustomButton from "@/components/customButton";
import GoogleTextInput from "@/components/googleTextInput";
import RideLayout from "@/components/rideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { View, Text } from "react-native";
import * as Haptics from "expo-haptics";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress as string}
          containerStyle="bg-neutral-100 shadow-md "
          textInputBackgroundColor="#f5f5f5"
          handlePress={setUserLocation}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress as string}
          containerStyle="bg-neutral-100 shadow-md"
          textInputBackgroundColor="transparent"
          handlePress={setDestinationLocation}
        />
      </View>
      <CustomButton title="Find Now" onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        router.push("/(root)/confirm-ride")
      }} className="mt-5" />
    </RideLayout>
  );
};

export default FindRide;
