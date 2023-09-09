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


const TopUp = ({ navigation }) => {
    const [amount, setAmount] = useState(0)
    const handleAmountSelection = (selectedAmount) => {
        setAmount(selectedAmount.toString()); // Convert the selected amount to a string
      };
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
                        <Text style={{fcolor: "#333333", ...FONTS.h2}}>Select an amount</Text>
                        <TouchableOpacity title="10" 
                                onPress={() => handleAmountSelection(10)}
                                style={{
                                    height: 60,
                                    backgroundColor: "#FF7F11",
                                    borderRadius: SIZES.radius / 0.5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}>
                                <Text style={{ color: "#333333", ...FONTS.h3 }}>
                                    10
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity title="20" 
                                onPress={() => handleAmountSelection(20)}
                                style={{
                                    height: 60,
                                    backgroundColor: "#FF7F11",
                                    borderRadius: SIZES.radius / 0.5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}>
                                <Text style={{ color: "#333333", ...FONTS.h3 }}>
                                    20
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity title="50" 
                                onPress={() => handleAmountSelection(50)}
                                style={{
                                    height: 60,
                                    backgroundColor: "#FF7F11",
                                    borderRadius: SIZES.radius / 0.5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}>
                                <Text style={{ color: "#333333", ...FONTS.h3 }}>
                                    50
                                </Text>
                        </TouchableOpacity>

                        <TouchableOpacity title="100" 
                                onPress={() => handleAmountSelection(100)}
                                style={{
                                    height: 60,
                                    backgroundColor: "#FF7F11",
                                    borderRadius: SIZES.radius / 0.5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                }}>
                                <Text style={{ color: "#333333", ...FONTS.h3 }}>
                                    100
                                </Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ color: "#FF7F11", ...FONTS.h2 }}>
                                Amount
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
                                placeholder="Amount to Transfer"
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
                                navigation.navigate("Checkout", {amount: amount})
                            }>
                            <Text style={{ color: "#FFFFFF", ...FONTS.h3 }}>
                                Top Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default TopUp
