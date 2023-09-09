import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useAuth } from "../contexts/AuthContext";

const Pay = () => {
    const { userId } = useAuth();
    const [qrCodeContent, setQRCodeContent] = useState("");
    const [pressed, setPressed] = useState(false);

    // Function to generate the QR code
    const generateQRCode = () => {
        setQRCodeContent(userId);
        setPressed(true);
    };


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {!pressed && <Button title="Generate QR Code" onPress={generateQRCode} />}

            {qrCodeContent ? (
                <View style={{ marginTop: 20 }}>
                    <QRCode value={qrCodeContent} size={200} />
                </View>
            ) : null}
        </View>
    );
};

export default Pay;
