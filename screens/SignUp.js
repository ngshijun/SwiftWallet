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

import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { collection, addDoc } from "@firebase/firestore"

import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const SignUp = ({ navigation }) => {
    const signUp = async (email, countryCode, phoneNumber, password) => {
        await addDoc(collection(db, "Users"), {
            email,
            countryCode,
            phoneNumber,
            password,
        })
        await createUserWithEmailAndPassword(auth, email, password)
    }

    const [showPassword, setShowPassword] = React.useState(false)

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    const [email, setEmail] = React.useState(null)
    const [countryCode, setCountryCode] = React.useState(null)
    const [phoneNumber, setPhoneNumber] = React.useState(null)
    const [password, setPassword] = React.useState(null)

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
                <View style={{ marginTop: SIZES.padding * 3 }}>
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

                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
                        Phone Number
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                        {/* Country Code */}
                        <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: "row",
                                ...FONTS.body2,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <View style={{ justifyContent: "center" }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    justifyContent: "center",
                                    marginLeft: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        ...FONTS.body3,
                                    }}
                                >
                                    {selectedArea?.callingCode}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* Phone Number */}
                        <TextInput
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.white,
                                ...FONTS.body3,
                            }}
                            onChangeText={(text) => setPhoneNumber(text)}
                            inputMode="tel"
                            placeholder="Enter Phone Number"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                    </View>
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
                        signUp(email, countryCode, phoneNumber, password).then(
                            navigation.navigate("SignIn")
                        )
                    }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderAreaCodesModal() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: "row" }}
                    onPress={() => {
                        setSelectedArea(item)
                        setCountryCode(item.callingCode)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10,
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius,
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2,
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function renderSignIn() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding * 2,
                    justifyContent: "center",
                }}
                onPress={() => navigation.navigate("SignIn")}
            >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                    Already have an account?{" "}
                </Text>
                <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    Sign In
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
                    {renderSignIn()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default SignUp
