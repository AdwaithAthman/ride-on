import { View, Text, ScrollView, Image } from "react-native";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import OAuth from "./oAuth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const onSignInPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    console.log(form)
  }
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton title="Sign Up" onPress={onSignInPress} className="mt-8" />
          <OAuth />
          <Link href="/sign-up" className="text-lg text-center text-general-100 mt-10" >
          <Text>Don't have an account?</Text>
          <Text className="text-primary-500"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;

