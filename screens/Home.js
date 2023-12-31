import React from "react"
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import payIcon from "../assets/icons/pay.png"
import currencyIcon from "../assets/icons/currency.png"
import ukIcon from "../assets/icons/united-kingdom.png"
import myIcon from "../assets/icons/malaysia.png"
import usaIcon from "../assets/icons/united-states-of-america.png"
import euIcon from "../assets/icons/european.png"
import holidyIcon from "../assets/icons/vacation.png"
import savingIcon from "../assets/icons/saving.png"
import shoppingIcon from "../assets/icons/shopping.png"
import educationIcon from "../assets/icons/education.png"

import { useAuth } from "../contexts/AuthContext"

const Home = ({ navigation }) => {
    const [rate, setRate] = React.useState([])
    React.useEffect(() => {
        const timer = setInterval(() => {
            var requestURL =
                "https://api.exchangerate.host/latest?base=SGD&symbols=MYR,USD,GBP,EUR"
            var request = new XMLHttpRequest()
            request.open("GET", requestURL)
            request.responseType = "json"
            request.send()

            request.onload = function () {
                var response = request.response
                setRate(response.rates)
                console.log(response.rates)
            }
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const { userEmail, userBalance } = useAuth()

    const featuresData = [
        {
            id: 1,
            icon: payIcon,
            //color: COLORS.yellow,
            //backgroundColor: COLORS.lightpurple,
            description: "Pay",
        },
        {
            id: 2,
            icon: icons.send,
            //color: COLORS.yellow,
            // backgroundColor: COLORS.lightyellow,
            description: "Transfer",
        },

        {
            id: 3,
            icon: icons.scan,
            //color: COLORS.red,
            // backgroundColor: COLORS.lightRed,
            description: "Scan",
        },
        {
            id: 4,
            icon: currencyIcon,
            //color: COLORS.yellow,
            //backgroundColor: COLORS.lightpurple,
            description: "Exchange",
        },
    ]

    const currencyData = [
        {
            id: 1,
            img: ukIcon,
            title: "GBP",
        },
        {
            id: 2,
            img: usaIcon,
            title: "USD",
        },
        {
            id: 3,
            img: myIcon,
            title: "MYR" ,
        },
        {
            id: 4,
            img: euIcon,
            title: "EUR",
        },
    ]

    const vaultData = [
        {
            id: 1,
            img: shoppingIcon,
            title: "Shopping",
            amount: "230 SGD",
        },
        {
            id: 2,
            img: savingIcon,
            title: "Savings",
            amount: "500 SGD",
        },
        {
            id: 3,
            img: educationIcon,
            title: "Education",
            amount: "500 SGD",
        },
        {
            id: 4,
            img: holidyIcon,
            title: " Holiday",
            amount: "500 SGD",
        },
    ]

    const [features, setFeatures] = React.useState(featuresData)
    const [currency, setCurrency] = React.useState(currencyData)
    const [vault, setVault] = React.useState(vaultData)

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginVertical: SIZES.padding * 2,
                }}
            >
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Image
                        source={images.wallieLogo}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            alignItems: "center",
                            borderWidth: 1,
                        }}
                    />
                </View>
            </View>
        )
    }

    function renderBanner() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2,
                    paddingBottom: 10,
                    width: 80,
                    alignItems: "center",
                }}
                onPress={() => navigation.navigate(item.description)}
            >
                <View
                    style={{
                        height: 60,
                        width: 50,
                        borderRadius: 20,
                        backgroundColor: item.backgroundColor,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 30,
                            width: 30,
                            tintColor: item.color,
                        }}
                    />
                </View>
                <Text
                    style={{
                        textAlign: "center",
                        flexWrap: "wrap",
                        ...FONTS.body4,
                    }}
                >
                    {item.description}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                    style={{
                        height: 150,
                        width: 350,
                        marginBottom: 5,
                        borderRadius: 20,
                        marginTop: 50,
                        backgroundColor: "#D7DEDC",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative", // Use relative positioning for the parent view
                    }}
                >
                    {/* Content for the bottom view */}
                    <FlatList
                        data={features}
                        numColumns={4}
                        columnWrapperStyle={{ justifyContent: "space-evenly" }}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={renderItem}
                        style={{ marginTop: 75 }}
                    />
                </View>

                <View
                    style={{
                        height: 100,
                        width: 300,
                        marginBottom: -100, // Move the top view up by 50 units
                        borderRadius: 20,
                        backgroundColor: "#FF7F11",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute", // Use absolute positioning for the top view
                        top: 0, // Position it at the top of the parent view
                    }}
                >
                    <Text style={{ ...FONTS.h1, marginBottom: 5 }}>
                        SGD {Number(userBalance).toFixed(2)}
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
                                navigation.navigate("Withdraw")
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
            </View>
        )
    }

    function renderCurrency() {
        const HeaderComponent = () => (
            <View style={{ marginTop: 30 }}>{renderCurrencyHeader()}</View>
        )

        const renderCurrencyHeader = () => (
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: SIZES.padding,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Currencies</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("View All")}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5,
                }}
                onPress={() => console.log(item.title)}
            >
                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: "#FF7F11",
                        borderRadius: 20,
                        height: SIZES.width / 2.5,
                        width: SIZES.width / 2.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{
                            height: SIZES.width / 3.7,
                            width: SIZES.width / 3.7,
                            borderRadius: 50,
                            alignItems: "center",
                            marginVertical: 10,
                            tintColor: item.color,
                        }}
                    />

                    <Text
                        style={{
                            fontSize: SIZES.width / 20,
                            fontWeight: "bold",
                        }}
                    >
                        {item.title} {Number(rate[item.title] * userBalance).toFixed(2)}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={currency}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 30 }}></View>}
            />
        )
    }

    function renderVault() {
        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderCurrency()}
                {renderVaultHeader()}
            </View>
        )

        const renderVaultHeader = () => (
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: SIZES.padding,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Vaults</Text>
                </View>
                <TouchableOpacity onPress={() => console.log("View All")}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5,
                }}
                onPress={() => console.log(item.title)}
            >
                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: "#FF7F11",
                        borderRadius: 20,
                        height: SIZES.width / 2.5,
                        width: SIZES.width / 2.5,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={item.img}
                        resizeMode="contain"
                        style={{
                            height: SIZES.width / 4.5,
                            width: SIZES.width / 4.5,
                            alignItems: "center",
                            marginBottom: 10,
                            tintColor: item.color,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: SIZES.width / 20,
                            fontWeight: "bold",
                        }}
                    >
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: SIZES.width / 28 }}>
                        {item.amount}
                    </Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={vault}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderVault()}
        </SafeAreaView>
    )
}

export default Home
