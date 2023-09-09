import React, {useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Button
} from "react-native"
import { db } from "../firebase"
import { useAuth } from "../contexts/AuthContext"
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    increment,
    doc,
} from "firebase/firestore"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { LinearGradient } from "expo-linear-gradient"


const WithdrawCheckout = ({route, navigation}) => {
    const [buttonPressed, setButtonPressed] = useState(false)
    const {amount} = route.params
    const {userId} = useAuth()
    const topUp = async () => {
        await updateDoc(doc(db, "users", userId), {
            balance: increment(-amount),
        }).then(() => {
            alert("Withdraw successful")
            navigation.navigate("Home")
        })
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
                    <View style={{
                        marginTop: 30,
                        marginHorizontal: SIZES.padding * 3,
                    }}>
                        <Text style={{color: "#FF7F11", ...FONTS.largeTitle, fontWeight: 'bold'}}>Top Up</Text>
 
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ color: "#FF7F11", ...FONTS.h2 }}>
                                Bank Name
                            </Text>

                            <TextInput
                                style={{
                                    marginVertical: SIZES.padding,
                                    borderBottomColor: "#FF7F11",
                                    borderBottomWidth: 1,
                                    height: 40,
                                    color: "#FF7F11",
                                    ...FONTS.body2,
                                }}
                                placeholder="Enter Bank Name"
                                placeholderTextColor={"#333333"}
                                selectionColor={"#FF7F11"}
                            />
                            <Text style={{ color: "#FF7F11", ...FONTS.h2 }}>
                                Bank Account Number
                            </Text>

                            <TextInput
                                style={{
                                    marginVertical: SIZES.padding,
                                    borderBottomColor: "#FF7F11",
                                    borderBottomWidth: 1,
                                    height: 40,
                                    color: "#FF7F11",
                                    ...FONTS.body2,
                                }}
                                placeholder="Enter your Bank Account Number"
                                keyboardType="numeric"
                                placeholderTextColor={"#333333"}
                                selectionColor={"#FF7F11"}
                            />

                        </View>
                        <TouchableOpacity title="Checkout" 
                            style={{
                                height: 60,
                                backgroundColor: "#333333",
                                borderRadius: SIZES.radius / 0.5,
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 20,
                                marginBottom:70,
                            }}
                            disabled={buttonPressed}
                            onPress={() => {
                                setButtonPressed(true)
                                topUp()}}>
                            <Text style={{ color: "#FFFFFF", ...FONTS.h3 }}>
                                Withdraw
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default WithdrawCheckout
