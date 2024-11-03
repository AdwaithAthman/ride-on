import { View, Text, ScrollView, Image } from "react-native";
import { images, icons } from "@/constants";
import InputField from "@/components/inputField";
import { useState } from "react";
import CustomButton from "@/components/customButton";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import OAuth from "./oAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from 'expo-router';
import Modal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [verification, setVerification] = useState({
    state: 'pending',
    error: '',
    code: ''
  })
  const onSignUpPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setVerification({
        ...verification,
        state: 'pending'
      })
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({
          ...verification,
          state: 'success'
        })
        router.replace('/')
      } else {
        setVerification({
          ...verification,
          state: 'failed'
        })
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: 'failed'
      })
    }
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
        <Modal isVisible={verification.state === 'success'}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[308px]">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" resizeMode="contain" />
            <Text className="text-3xl font-JakartaBold text-center">Account Verified</Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified the account.
            </Text>
            <CustomButton title="Continue" onPress={() => router.replace('/(root)/(tabs)/home')} className="mt-8" />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
