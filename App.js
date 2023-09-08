/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react"

import { SignUp, SignIn } from "./screens"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { AuthProvider } from "./contexts/AuthContext"
import Tabs from "./navigation/tabs"
import { DatabaseProvider } from "./contexts/DatabaseContext"

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
                <DatabaseProvider>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName={"SignIn"}
                    >
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="SignIn" component={SignIn} />

                        {/* Tabs */}
                        <Stack.Screen name="HomeTabs" component={Tabs} />

                        {/* <Stack.Screen name="Scan" component={Scan} /> */}
                    </Stack.Navigator>
                </DatabaseProvider>
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App
