import { View, Text, ScrollView, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import OAuth from "./oAuth";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const onSignUpPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    // if (!isLoaded) {
    //   return
    // }

    // try {
    //   await signUp.create({
    //     emailAddress,
    //     password,
    //   })

    //   await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

    //   setPendingVerification(true)
    // } catch (err: any) {
    //   // See https://clerk.com/docs/custom-flows/error-handling
    //   // for more info on error handling
    //   console.error(JSON.stringify(err, null, 2))
    // }
  }
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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

          <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-8" />
          <OAuth />
          <Link href="/sign-in" className="text-lg text-center text-general-100 mt-10" >
          <Text>Already have an account?</Text>
          <Text className="text-primary-500"> Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
