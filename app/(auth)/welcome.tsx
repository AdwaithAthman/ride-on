import { router } from "expo-router";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Swiper from "react-native-swiper";
import { useRef, useState } from "react";
import { onboarding } from "@/constants";
import CustomButton from "@/components/customButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleIndexChange = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    setActiveIndex(index);
  };
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full items-center justify-center bg-white">
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
          router.replace("/(auth)/sign-in");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-2 mx-1 bg-[#E2E8F0] rounded-full" />}
        activeDot={
          <View className="w-[32px] h-2 mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={handleIndexChange}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            <Text className=" text-lg font-JakartaSemiBold mx-10 mt-3 text-center text-[#858585">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-[80%] mt-10 mb-5"
        onPress={() =>
          isLastSlide
            ? (Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
              router.replace("/(auth)/sign-up"))
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default Onboarding;
