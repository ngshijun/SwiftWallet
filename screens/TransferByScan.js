import { React, useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { db } from "../firebase";
import { collection, query, where, getDocs, updateDoc, increment, doc, onSnapshot } from "firebase/firestore";

const TransferByScan = ({ scannedData }) => {
    const [name, setName] = useState("");
    const [userId, setUserId] = useState(scannedData);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const q = query(collection(db, "users"), where("id", "==", userId));

        onSnapshot(q, (doc) => {
            setName(doc.data().Name);
            setPhoneNumber(doc.data().phoneNumber);
            setCountryCode(doc.data().countryCode);
        });
    });

    const handleTransfer = async () => {
        if (amount <= 0) {
            alert("Invalid amount. Please enter a valid amount");
            return;
        }

        const q = query(collection(db, "users"), where("id", "==", userId));
        const q1 = query(
            collection(db, "users"),
            where("phoneNumber", "==", phoneNumber),
            where("countryCode", "==", countryCode)
        );
        const id = (await getDocs(q)).docs[0].id;
        const userId = (await getDocs(q1)).docs[0].id;
        await updateDoc(doc(db, "users", id), {
            balance: increment(amount),
        });
        await updateDoc(doc(db, "users", userId), {
            balance: increment(-amount),
        });
    };
    return (
        <View>
            <Text>You are transferring to {name}.</Text>
            <TextInput
                value={amount}
                onChangeText={(ammount) => setAmount(ammount)}
                placeholder="Amount to Transfer"
                keyboardType="numeric" // Show a numeric keyboard
            />
            <Button title="Transfer" onPress={handleTransfer} />
        </View>
    );
};

export default TransferByScan;
