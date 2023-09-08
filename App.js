/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react"

import { StripeProvider } from "@stripe/stripe-react-native"
import { SignUp, SignIn, Transfer, TopUp } from "./screens"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { AuthProvider } from "./contexts/AuthContext"
import Tabs from "./navigation/tabs"

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
}

const Stack = createStackNavigator()

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    })

    if (!loaded) {
        return null
    }
    return (
        <StripeProvider
            publishableKey="pk_test_51NJF7YEn2jRr5EOoKwsEMyJhY5tydUvwZV6RhV1QUFzlHxCgs75ZQX4xLM4nPTI3tQVpJr6B2dYQqLpljaxJiDqr00gsfcpfiP"
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            merchantIdentifier="merchant.com.SwiftWallet" // required for Apple Pay
        >
            <NavigationContainer theme={theme}>
                <AuthProvider>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: true,
                        }}
                        initialRouteName={"SignIn"}
                    >
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="SignIn" component={SignIn} />

                        {/* Tabs */}
                        <Stack.Screen
                            name="Home"
                            component={Tabs}
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen name="Transfer" component={Transfer} />
                        <Stack.Screen name="TopUp" component={TopUp} />                        
                        {/* <Stack.Screen name="Scan" component={Scan} /> */}
                    </Stack.Navigator>
                </AuthProvider>
            </NavigationContainer>
        </StripeProvider>
    )
}

export default App
