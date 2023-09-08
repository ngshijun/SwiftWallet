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
import { useAuth } from "../contexts/AuthContext"

const Home = () => {
    const { email, balance } = useAuth()

    const featuresData = [
        {
            id: 1,
            icon: icons.reload,
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
            icon: icons.more,
            //color: COLORS.yellow,
            //backgroundColor: COLORS.lightpurple,
            description: "Exchange",
        },
    ]

    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!",
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!",
        },
        {
            id: 3,
            img: images.promoBanner,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!",
        },
        {
            id: 4,
            img: images.promoBanner,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!",
        },
    ]

    const [features, setFeatures] = React.useState(featuresData)
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginVertical: SIZES.padding * 2,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Swift</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
                        {email}
                    </Text>
                </View>

                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.lightGray,
                        }}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary,
                            }}
                        />
                        <View
                            style={{
                                position: "absolute",
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5,
                            }}
                        ></View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode=""
                    style={{
                        width: "60%",
                    }}
                />
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
                onPress={() => console.log(item.description)}
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
                        SGD {Number(balance).toFixed(2)}
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
            </View>
        )
    }

    function renderFeatures() {
        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginBottom: SIZES.padding * 2,
                    width: 60,
                    alignItems: "center",
                }}
                onPress={() => console.log(item.description)}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
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
                            height: 20,
                            width: 20,
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
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 2 }}
            />
        )
    }

    function renderPromos() {
        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        )

        const renderPromoHeader = () => (
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: SIZES.padding,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
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
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary,
                    }}
                >
                    <Image
                        source={images.promoBanner}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    />
                </View>

                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                >
                    <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
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
                data={specialPromos}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}

export default Home
