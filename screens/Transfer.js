import { React, useState } from "react"
import { View, TextInput, Button } from "react-native"
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
        <View>
            <TextInput
                value={countryCode}
                onChangeText={(mobile) => setCountryCode(mobile)}
                placeholder="Country Code,for eg: +91"
                keyboardType="numeric" // Show a numeric keyboard
            />
            <TextInput
                value={mobile}
                onChangeText={(mobile) => setMobile(mobile)}
                placeholder="Mobile number"
                keyboardType="numeric" // Show a numeric keyboard
            />
            <TextInput
                value={amount}
                onChangeText={(ammount) => setAmount(ammount)}
                placeholder="Amount to Transfer"
                keyboardType="numeric" // Show a numeric keyboard
            />
            <Button title="Transfer" onPress={handleTransfer} />
        </View>
    )
}

export default Transfer
