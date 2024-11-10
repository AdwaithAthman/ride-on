import GoogleTextInput from "@/components/googleTextInput";
import RideLayout from "@/components/rideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { View, Text } from "react-native";

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
    </RideLayout>
  );
};

export default FindRide;
