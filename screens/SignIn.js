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
    useEffect(() => {
        if (user) {
            navigation.navigate("HomeTabs")
        }
    }, [user])

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
                    marginTop: SIZES.padding * 6,
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
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode=""
                    style={{
                        width: "60%",
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Email */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Email
                    </Text>

                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        inputMode="email"
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter Email"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Password
                    </Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3,
                        }}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
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
                                tintColor: COLORS.white,
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
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => handleSignIn(email, password)}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
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
                    marginTop: SIZES.padding * 2,
                    justifyContent: "center",
                }}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                    New User?{" "}
                </Text>
                <Text style={{ color: COLORS.lightGreen, ...FONTS.h3 }}>
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
                colors={[COLORS.lime, COLORS.emerald]}
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
