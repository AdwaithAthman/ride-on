import { View, Text, ScrollView, Image, Alert } from "react-native";
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
import { fetchAPI } from "@/lib/fetch";
import React from "react";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: ''
  })
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const onSignUpPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
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
      Alert.alert("Error",err.errors[0].longMessage)
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      })

      if (completeSignUp.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId
          })
        })
        await setActive({ session: completeSignUp.createdSessionId })
        setVerification({
          ...verification,
          state: 'success'
        })
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
        <Modal isVisible={verification.state === 'pending'} onModalHide={() => {
          if(verification.state === 'success') setShowSuccessModal(true)
        }}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">Verification</Text>
            <Text className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}
            </Text>
            <InputField
             label="Code"
             icon={icons.lock}
             placeholder="12345"
             keyboardType="number-pad"
             onChangeText={(code) => setVerification({ ...verification, code })}
             />
             {verification.error && <Text className="text-red-500 text-sm mt-1">{verification.error}</Text>}
            <CustomButton title="Verify Email" onPress={onPressVerify} className="mt-8 bg-success-500" />
          </View>
        </Modal>
        <Modal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" resizeMode="contain" />
            <Text className="text-3xl font-JakartaBold text-center">Account Verified</Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified the account.
            </Text>
            <CustomButton title="Continue" onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
              setShowSuccessModal(false);
              router.replace('/(root)/(tabs)/home')
            }} className="mt-8" />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
