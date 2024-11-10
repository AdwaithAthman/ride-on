import { icons } from "@/constants";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./map";
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import * as Haptics from "expo-haptics";

const RideLayout = ({
  children,
  title,
  snapPoints
}: {
  children: React.ReactNode;
  title?: string;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleSheetChange = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  };
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-full bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 rounded-full bg-white items-center justify-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-xl font-JakartaBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          enableDynamicSizing={false}
          snapPoints={snapPoints ||["45%", "85%"]}
          index={0}
          onChange={handleSheetChange}
          keyboardBehavior="extend"
          maxDynamicContentSize={85}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
