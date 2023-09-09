import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { db } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { Camera } from "expo-camera";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import QRIcon from "../assets/icons/qr-code.png";

const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: "row", marginTop: SIZES.padding * 4, paddingHorizontal: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        width: 45,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image
                        source={icons.close}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Scan for Payment</Text>
                </View>

                <TouchableOpacity
                    style={{
                        height: 45,
                        width: 45,

                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={() => console.log("Info")}
                >
                    <Image
                        source={icons.info}
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderScanFocus() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    source={images.focus}
                    resizeMode="contain"
                    style={{
                        marginTop: "-55%",
                        width: 200,
                        height: 200,
                    }}
                />
            </View>
        );
    }

    function renderPaymentMethods() {
        return (
            <View
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 220,
                    padding: SIZES.padding * 3,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius,
                    backgroundColor: COLORS.white,
                }}
            >
                <Text style={{ ...FONTS.h4 }}>Another payment methods</Text>

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: SIZES.padding * 2,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        onPress={() => navigation.navigate("Transfer")}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#FF7F11",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            }}
                        >
                            <Image
                                source={icons.phone}
                                resizeMode="cover"
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: "#FFFFFF",
                                }}
                            />
                        </View>
                        <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4 }}>Phone Number</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: SIZES.padding * 2,
                        }}
                        onPress={() => navigation.navigate("Pay")}
                    >
                        <View
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#FF7F11",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                            }}
                        >
                            <Image
                                source={QRIcon}
                                resizeMode="cover"
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: "#FFFFFF",
                                }}
                            />
                        </View>
                        <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4 }}>QR code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function onBarCodeRead(result) {
        const docRef = doc(db, "users", result.data);
        getDoc(docRef).then((doc) => {
            navigation.navigate("TransferByScan", {
                recipientId: result.data,
                name: doc.data().username,
            });
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
            <Camera
                ref={(ref) => {
                    this.camera = ref;
                }}
                style={{ flex: 1 }}
                captureAudio={false}
                type={Camera.Constants.Type.back}
                flashMode={Camera.Constants.FlashMode.off}
                onBarCodeScanned={onBarCodeRead}
                androidCameraPermissionOptions={{
                    title: "Permission to use camera",
                    message: "Camera is required for QR code scanning",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel",
                }}
            >
                {renderHeader()}
                {renderScanFocus()}
                {renderPaymentMethods()}
            </Camera>
        </View>
    );
};

export default Scan;
