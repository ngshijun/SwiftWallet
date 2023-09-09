import { React, useState } from "react"
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
import { useAuth } from "../contexts/AuthContext"
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

const Transfer = () => {
    const { userCountryCode, userPhoneNumber } = useAuth()
    const [mobile, setMobile] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError] = useState("")

    const handleTransfer = async () => {
        if (amount <= 0) {
            alert("Invalid amount. Please enter a valid amount")
            return
        }

        console.log(mobile, amount)
        const q = query(
            collection(db, "users"),
            where("phoneNumber", "==", mobile),
            where("countryCode", "==", countryCode)
        )
        console.log(userPhoneNumber, userCountryCode)
        const q1 = query(
            collection(db, "users"),
            where("phoneNumber", "==", userPhoneNumber),
            where("countryCode", "==", userCountryCode)
        )
        const id = (await getDocs(q)).docs[0].id
        const userId = (await getDocs(q1)).docs[0].id
        await updateDoc(doc(db, "users", id), {
            balance: increment(amount),
        })
        await updateDoc(doc(db, "users", userId), {
            balance: increment(-amount),
        })
    }
    return (
        
        <View style={{
            marginTop: 70,
            marginHorizontal: SIZES.padding * 3,
        }}>
            
            <View style={{ marginTop: 10, }}>
                <Text style={{ color: "#FF7F11", ...FONTS.body3 }}>
                    Phone Number
                </Text>

                <View style={{ flexDirection: "row" }}>

                    <TextInput
                        style={{
                            width: "20%",
                            height: 50,
                            marginRight: 20,
                            marginVertical: SIZES.padding,
                            borderBottomColor: "#FF7F11",
                            borderBottomWidth: 1,
                            height: 40,
                            color: "#FF7F11",
                            ...FONTS.body3,
                        }}
                        inputMode="email"
                        autoCapitalize="none"
                        value={countryCode}
                        onChangeText={(mobile) => setCountryCode(mobile)}
                        placeholder="+65"
                        keyboardType="numeric"
                        placeholderTextColor={"#333333"}
                        selectionColor={"#FF7F11"}
                    />
                
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: "#FF7F11",
                            borderBottomWidth: 1,
                            height: 40,
                            width: "70%",
                            color: "#FF7F11",
                            ...FONTS.body3,
                        }}
                        value={mobile}
                        keyboardType="numeric" // Show a numeric keyboard
                        autoCapitalize="none"
                        onChangeText={(mobile) => setMobile(mobile)}
                        placeholder="Mobile number"
                        placeholderTextColor={"#333333"}
                        selectionColor={"#FF7F11"}
                    />
                </View>
            </View>
   

            <View style={{ marginTop: 10, }}>
                <Text style={{ color: "#FF7F11", ...FONTS.body3 }}>
                    Amount
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
                    value={amount}
                    onChangeText={(ammount) => setAmount(ammount)}
                    placeholder="Amount to Transfer"
                    keyboardType="numeric"
                    placeholderTextColor={"#333333"}
                    selectionColor={"#FF7F11"}
                />
            </View>


            <TouchableOpacity
                    title="Transfer"
                    onPress={handleTransfer}
                    style={{
                        height: 60,
                        backgroundColor: "#FF7F11",
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: "#333333", ...FONTS.h3 }}>
                        Transfer
                    </Text>
                </TouchableOpacity>
                
        </View>
    )
}

export default Transfer
