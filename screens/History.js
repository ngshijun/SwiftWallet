import React from "react"
import { useAuth } from "../contexts/AuthContext"
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

const History = () => {
    const { history } = useAuth()
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
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{...FONTS.h1,marginTop:30, marginBottom:10, color: "#FF7F11"}}>History</Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    
                {history.map((item, index) => {
                    return (
                        <View key={index} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View
                                style={{
                                height: SIZES.width / 4,
                                width: SIZES.width / 1.1,
                                marginBottom: 10,
                                borderRadius: 30,
                                backgroundColor: '#D7DEDC',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative', // Use relative positioning for the parent view
                                }}
                            >
                                <Text style={{ fontSize: SIZES.width / 20, fontWeight: "bold", color: COLORS.red }}>
                                    {item.name}
                                </Text>
                                {/* Conditional rendering based on item.type */}
                                {item.type === 'credit' ? (
                                <Text style={{ fontSize: SIZES.width / 20, fontWeight: "bold", color: COLORS.green }}>
                                    {' + ' + "SGD " + item.amount}
                                </Text>
                                ) : (
                                <Text style={{ fontSize: SIZES.width / 20, fontWeight: "bold", color: COLORS.red }}>
                                    {' - ' + "SGD " + item.amount}
                                </Text>
                                )}
                                <Text style={{ fontSize: SIZES.width / 24}}>{item.time}</Text>
                            </View>
                        </View>
                    );
                })}


                </View>
            </ScrollView>
        </LinearGradient>
    </KeyboardAvoidingView>
    )
    
}

export default History
