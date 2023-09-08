/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react"

import { SignUp, SignIn, Transfer } from "./screens"
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

                    {/* <Stack.Screen name="Scan" component={Scan} /> */}
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App
