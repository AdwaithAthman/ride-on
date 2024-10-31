import CustomButton from "@/components/customButton"
import { View, Text, Image } from "react-native"
import { icons } from "@/constants"
import * as Haptics from "expo-haptics"

const OAuth = () => {
    const handleGoogleSignIn = async() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        console.log("Login with Google")
    }
    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
                <View className="flex-1 h-[1px] bg-neutral-100" />
                <Text className="text-lg">Or</Text>
                <View className="flex-1 h-[1px] bg-neutral-100" />
            </View>

            <CustomButton
                title="Login with Google"
                className="mt-5 w-full shadow-none"
                IconLeft={() => <Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />} 
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn} />
        </View>
    )
}

export default OAuth