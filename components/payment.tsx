import { View, Text } from "react-native";
import CustomButton from "./customButton";
import * as Haptics from "expo-haptics";

const Payment = () => {
  const openPaymentSheet = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };
  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
