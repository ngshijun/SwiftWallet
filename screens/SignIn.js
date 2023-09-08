import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignIn = ({ navigation }) => {
    const handleSignIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigation.navigate("HomeTabs")
        } catch (e) {
            console.log(e)
        }
    }

    const [showPassword, setShowPassword] = React.useState(false)

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    React.useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
            .then((response) => response.json())
            .then((data) => {
                let areaData = data.map((item) => {
                    return {
                        code: item.cca3,
                        name: item.name?.common,
                        flag: item.flags.png,
                        callingCode: item.idd?.root + item.idd?.suffixes[0],
                    }
                })
                setAreas(areaData)

                if (areaData.length > 0) {
                    let defaultData = areaData.filter((a) => a.code == "US")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

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
                    resizeMode="contain"
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
                    onPress={() =>
                        handleSignIn(email, password)
                    }
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
