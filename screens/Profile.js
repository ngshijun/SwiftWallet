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
import { useNavigation } from '@react-navigation/native';

const Profile = ({navigation}) => {
    const { username, userEmail, userCountryCode, userPhoneNumber, userBalance, logout } = useAuth()
    //const navigation = useNavigation();
    const handleLogOut = async () => {
        try {
          await logout(); // Call your logout function here
      
          // Navigate to the sign-in page
          navigation.navigate('SignIn'); // Replace 'SignIn' with the actual name of your sign-in screen
        } catch (error) {
          console.error('Logout error:', error);
        }
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
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{...FONTS.h1,marginTop:30, marginBottom:10, color: "#FF7F11"}}>
                        Profile
                    </Text>


                    <View
                        style={{
                            height: 350,
                            width: 350,
                            
                            marginBottom: 5,
                            borderRadius: 20,
                            marginTop: 70,
                            backgroundColor: "#D7DEDC",
                            alignItems: "left",
                            justifyContent: "left",
                            position: "relative", // Use relative positioning for the parent view
                        }}
                    >
                        <Text style={{...FONTS.body2, marginTop: 60, marginLeft: 20,}}>
                            Email:
                        </Text>
                        <Text style={{...FONTS.body1, marginLeft: 20,}}>
                            {userEmail}
                        </Text>

                        <View style={{ marginTop: SIZES.padding * 2 }}>
                            <Text style={{...FONTS.body2, marginTop: 20, marginLeft: 20,}}>
                                Phone Number:
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                                {/* Country Code */}
                                <Text style={{...FONTS.body1, marginLeft: 20,}}>
                                    {userCountryCode}
                                </Text>

                                {/* Phone Number */}
                                <Text style={{...FONTS.body1,}}>
                                    {userPhoneNumber}
                                </Text>

                            </View>
                        </View>
              

                        <Text style={{...FONTS.body2, marginTop: 20, marginLeft: 20,}}>
                            Balance:
                        </Text>
                        <Text style={{...FONTS.body1, marginLeft: 20,}}>
                            SGD {userBalance}
                        </Text>
                        
                    </View>

                    <View
                        style={{
                            height: 100,
                            width: 300,

                            borderRadius: 20,
                            marginTop:100,
                            backgroundColor: "#FF7F11",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "absolute", // Use absolute positioning for the top view
                            top: 0, // Position it at the top of the parent view
                        }}
                    >
                        <Text style={{ ...FONTS.h1, marginBottom: 5 }}>
                            {username}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    // Handle button press here
                                    navigation.navigate("TopUp")
                                }}
                                style={{
                                    backgroundColor: "#333333",
                                    width: 100,
                                    marginRight: 20,
                                    padding: 10,
                                    borderRadius: 20,
                                    alignItems: "center", // Center the content horizontally
                                }}
                            >
                                <Text style={{ color: "#FFF", fontSize: 16 }}>
                                    Top Up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    // Handle button press here
                                }}
                                style={{
                                    backgroundColor: "#333333",
                                    width: 100,
                                    marginLeft: 20,
                                    padding: 10,
                                    borderRadius: 20,
                                    alignItems: "center", // Center the content horizontally
                                }}
                            >
                                <Text style={{ color: "#FFF", fontSize: 16 }}>
                                    Withdraw
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: "#333333",
                        width: SIZES.width/2,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={handleLogOut}
                >
                    <Text style={{ color: "#FFFFFF", ...FONTS.h3 }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
                </View>
                    
            </ScrollView>
            
        </LinearGradient>
    </KeyboardAvoidingView>
    )
    
}

export default Profile