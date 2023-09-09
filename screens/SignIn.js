import React, { useEffect } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useAuth } from "../contexts/AuthContext"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignIn = ({ navigation }) => {
    const { login, user } = useAuth()

    const handleSignIn = async (email, password) => {
        try {
            await login(email, password)
            navigation.navigate("HomeTabs")
        } catch (e) {
            console.log(e)
        }
    }

    const [showPassword, setShowPassword] = React.useState(false)

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: SIZES.padding * 2,
                    paddingHorizontal: SIZES.padding * 2,
                }}
            ></TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode=""
                    style={{
                        height: 150,
                        width: 150,
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: "#333333"
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: 70,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Email */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: "#FF7F11", ...FONTS.body3 }}>
                        Email
                    </Text>

                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: "#FF7F11",
                            borderBottomWidth: 1,
                            height: 40,
                            color: "#FF7F11",
                            ...FONTS.body3,
                        }}
                        inputMode="email"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter Email"
                        placeholderTextColor={"#333333"}
                        selectionColor={"#FF7F11"}
                    />
                </View>

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: "#FF7F11", ...FONTS.body3 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: "#FF7F11",
                            borderBottomWidth: 1,
                            height: 40,
                            color: "#FF7F11",
                            ...FONTS.body3,
                        }}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter Password"
                        placeholderTextColor={"#333333"}
                        selectionColor={"#FF7F11"}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30,
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={
                                showPassword ? icons.disable_eye : icons.eye
                            }
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: "#FF7F11"
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: "#FF7F11",
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => handleSignIn(email, password)}
                >
                    <Text style={{ color: "#333333", ...FONTS.h3 }}>
                        Sign In
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderNewUser() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    marginBottom: 100,
                    justifyContent: "center",
                }}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={{ color: "#333333", ...FONTS.body3 }}>
                    New User?{" "}
                </Text>
                <Text style={{ color: "#FF7F11", ...FONTS.h3, textDecorationLine: 'underline' }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={["#FFFFFF", "#FFFFFF"]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                    {renderNewUser()}
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default SignIn
