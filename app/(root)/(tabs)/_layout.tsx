import { icons } from "@/constants"
import { Tabs } from "expo-router"
import { View, Image, ImageSourcePropType } from "react-native"
import * as Haptics from "expo-haptics"

const TabIcon = ({ focused, source }: { focused: boolean, source: ImageSourcePropType }) => {
    return (
        <View className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
            <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}>
                <Image source={source} tintColor="white" resizeMode="contain" className="w-7 h-7" />
            </View>
        </View>
    )
}

const HapticButton = (props: any) => {
    const triggerHaptic = async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        } catch (error) {
            console.log('Haptics not supported');
        }
    };
    return(
        <View {...props} onTouchEnd={(e) => {
            triggerHaptic();
            props.onPress?.(e);
        }}>
                {props.children}
        </View>
    )
}

const Layout = () => {
    return (
        <Tabs initialRouteName="index" screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "white",
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#333333",
                borderRadius: 50,
                paddingBottom: 0,
                overflow: "hidden",
                marginHorizontal: 20,
                marginBottom: 20,
                height: 65,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "absolute",

            }
        }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
                    tabBarButton: (props) => <HapticButton {...props} />,
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
                    tabBarButton: (props) => <HapticButton {...props} />,
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
                    tabBarButton: (props) => <HapticButton {...props} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />,
                    tabBarButton: (props) => <HapticButton {...props} />,
                }}
            />
        </Tabs>
    )
}

export default Layout