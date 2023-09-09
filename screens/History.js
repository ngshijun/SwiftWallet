import React from "react"
import { View, Text } from "react-native"
import { useAuth } from "../contexts/AuthContext"

const History = () => {
    const { history } = useAuth()
    return <View>
        <Text>History</Text>
        {history.map((item, index) => {
            return <View key={index}>
                <Text>{item.type}</Text>
                <Text>{item.amount}</Text>
                <Text>{item.description}</Text>
                <Text>{item.time}</Text>
            </View>
        })}
    </View>
}

export default History
