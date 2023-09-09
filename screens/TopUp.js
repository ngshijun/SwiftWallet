import React, {useEffect, useState} from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    Button,
    Alert
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
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native"


const TopUp = () => {
    const [amount, setAmount] = useState(0);
    const handleAmountSelection = (selectedAmount) => {
        setAmount(selectedAmount); // Convert the selected amount to a string
    };
    const [ready, setReady] = useState(false);
    const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet

    useEffect(() => {
        initialisePaymentSheet();
    }, []);

    const initialisePaymentSheet = async () => {
        const {paymentIntent, ephemeralKey, customer} =
            await fetchPaymentSheetParams();

        const {error} = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: 'Swift Wallet',
            allowsDelayedPaymentMethods: true,
            // returnURL: 'stripe-example://stripe-redirect',
        });
        if (error) {
            Alert.alert('Error code: ${error.code}', error.message);
        } else {
            setReady(true);
        }
    };

    const fetchPaymentSheetParams = async () => {
        const response = await fetch('https://172.20.10.2:8081/payment-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {paymentIntent, ephemeralKey, customer} = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    async function topUp() {
        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert('Error code: ${error.code}', error.message);
        } else {
            Alert.alert('Success', 'Top up successfuly!');
            setReady(false);
        }
    }
    return (
        <StripeProvider
        publishableKey="pk_test_51NJF7YEn2jRr5EOoKwsEMyJhY5tydUvwZV6RhV1QUFzlHxCgs75ZQX4xLM4nPTI3tQVpJr6B2dYQqLpljaxJiDqr00gsfcpfiP"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.SwiftWallet" // required for Apple Pay
        >

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
                                onPress={() => {
                                    app.post("/payment-sheet", async (req, res) => {
                                        // Use an existing Customer ID if this is a returning customer.
                                        const customer = await stripe.customers.create()
                                        const ephemeralKey = await stripe.ephemeralKeys.create(
                                            { customer: customer.id },
                                            { apiVersion: "2023-08-16" }
                                        )
                                        const paymentIntent = await stripe.paymentIntents.create({
                                            amount: amount * 100,
                                            currency: "sgd",
                                            customer: customer.id,
                                            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                                            automatic_payment_methods: {
                                                enabled: true,
                                            },
                                        })

                                        res.json({
                                            paymentIntent: paymentIntent.client_secret,
                                            ephemeralKey: ephemeralKey.secret,
                                            customer: customer.id,
                                            publishableKey:
                                                "pk_test_51NJF7YEn2jRr5EOoKwsEMyJhY5tydUvwZV6RhV1QUFzlHxCgs75ZQX4xLM4nPTI3tQVpJr6B2dYQqLpljaxJiDqr00gsfcpfiP",
                                        })
                                    })
                                }}>
            <TouchableOpacity onPress={topUp} disabled={loading || !ready}>
                <Text style={{ color: "#FFFFFF", ...FONTS.h3 }}>
                    Top Up
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </LinearGradient>
        </KeyboardAvoidingView>
        </StripeProvider>
        );
}

export default TopUp
