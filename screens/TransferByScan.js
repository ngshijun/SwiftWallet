import { React, useEffect, useState } from "react";

import { db } from "../firebase";
import { updateDoc, increment, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { COLORS, SIZES, FONTS, icons, images } from "../constants";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";

const TransferByScan = ({ route, navigation }) => {
    const [buttonPressed, setButtonPressed] = useState(false);
    const { recipientId, name } = route.params;
    const { userId, userBalance, transaction } = useAuth();
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const handleTransfer = async () => {
        if (amount <= 0) {
            alert("Invalid amount. Please enter a valid amount");
            return;
        }

        if (userBalance < amount) {
            alert("Insufficient amount in wallet to transfer. Please Top Up your wallet.");
            return;
        }

        const sender = await getDoc(doc(db, "users", userId));
        const receiver = await getDoc(doc(db, "users", recipientId));

        await updateDoc(doc(db, "users", userId), {
            balance: increment(-amount),
        });
        await updateDoc(doc(db, "users", recipientId), {
            balance: increment(amount),
        }).then(() => {
            transaction(sender, receiver, amount, "Transfer by QR");
            alert(`You have successfully transferred ${amount} to ${name}`);
            navigation.navigate("Home");
        });
    };
    return (
        <View
            style={{
                marginTop: 70,
                marginHorizontal: SIZES.padding * 3,
                justifyContent: "center",
                alighContent: "center",
            }}
        >
            <Text style={{ ...FONTS.h1 }}>You're transferring to {name}.</Text>
            <TextInput
                style={{
                    width: "100%",
                    height: 50,
                    marginRight: 20,
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
                keyboardType="numeric" // Show a numeric keyboard
                placeholderTextColor={"#333333"}
                selectionColor={"#FF7F11"}
            />
            <TouchableOpacity
                title="Transfer"
                onPress={() => {
                    setButtonPressed(true);
                    handleTransfer();
                }}
                disabled={buttonPressed}
                style={{
                    height: 60,
                    backgroundColor: "#FF7F11",
                    borderRadius: SIZES.radius / 1.5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ color: "#333333", ...FONTS.h3 }}>Transfer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TransferByScan;
