import React, {useState} from "react"
import { View, Text, Button } from "react-native"

const TopUp = () => {
    const [amount, setAmount] = useState(0)
    return (
        <View>
            <Text>TopUp</Text>
            <Text>Select an amount</Text>
            <Button title="10" onPress={() => setAmount(10)}/>
            <Button title="20" onPress={() => setAmount(20)}/>
            <Button title="50" onPress={() => setAmount(50)}/>
            <Button title="100" onPress={() => setAmount(100)}/>
            <Button title="Checkout" onPress={() => {
                app.post("/payment-sheet", async (req, res) => {
                    // Use an existing Customer ID if this is a returning customer.
                    const customer = await stripe.customers.create()
                    const ephemeralKey = await stripe.ephemeralKeys.create(
                        { customer: customer.id },
                        { apiVersion: "2023-08-16" }
                    )
                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: 1099,
                        currency: "eur",
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
            }}/>
        </View>
    )
}

export default TopUp
