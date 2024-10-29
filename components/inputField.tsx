import { InputFieldProps } from "@/types/type"
import { KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, Image, TextInput, Platform, Keyboard} from "react-native"

const InputField = ({
    label,
    labelStyle,
    placeholder,
    icon,
    secureTextEntry = false,
    containerStyle,
    iconStyle,
    inputStyle,
    className,
    ...props
} : InputFieldProps ) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
           <View className="my-2 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>{label}</Text>
            <View className={`flex flex-row justify-start items-center relative bg-neurtral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                { icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                <TextInput className={`rounded-full w-[90%] p-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`} placeholder={placeholder} secureTextEntry={secureTextEntry} {...props} />
            </View>
            </View> 
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField