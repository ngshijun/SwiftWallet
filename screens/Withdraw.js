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


const Withdraw = ({ navigation }) => {
    const [amount, setAmount] = useState(0)
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
                        <Text style={{color: "#FF7F11", ...FONTS.largeTitle, fontWeight: 'bold'}}>Withdrawal</Text>
                        
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ color: "#FF7F11", ...FONTS.h2 }}>
                                Amount to Withdraw
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
                                value={amount}
                                onChangeText={(ammount) => setAmount(ammount)}
                                placeholder="Amount to Withdraw"
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
                            onPress={() => 
                                navigation.navigate("WithdrawCheckout", {amount: amount})
                            }>
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

export default Withdraw
