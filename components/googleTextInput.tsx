import "react-native-get-random-values";
import { View, Text, Image, Keyboard, ScrollView } from "react-native";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";
import { useRef } from "react";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function GoogleTextInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        keyboardShouldPersistTaps="handled"
        onPress={(data, details = null) => {
          Keyboard.dismiss();
          handlePress({
            latitude: details?.geometry.location?.lat!,
            longitude: details?.geometry.location?.lng!,
            address: data.description,
          })
        }}
        keepResultsAfterBlur={true}
        query={{
          key: googlePlacesApiKey,
          language: "en",
          components: "country:in"
        }}
        listUnderlayColor="transparent"
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image source={icon ? icon : icons.search } className="w-6 h-6" resizeMode="contain" />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        styles={{
          container: {
            position: "relative",
            shadowColor: "#d4d4d4",
            borderRadius: 20,
          },
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          }
        }}
      />
    </View>
  );
}
