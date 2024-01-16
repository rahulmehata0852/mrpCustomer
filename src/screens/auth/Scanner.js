import { ActivityIndicator, Animated, Button, Easing, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner, } from 'react-native-vision-camera'
import { COLORS, ROUTES } from '../../constants'



const Scanner = ({ navigation }) => {


    const device = useCameraDevice("back")
    const { hasPermission, requestPermission } = useCameraPermission()
    const [Scanned, setScanned] = useState(null)

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
            setScanned(codes[0].value)
            console.log(codes[0].value);
            // console.log(`Scanned ${codes.length} codes!`)
        }
    })

    const CheckPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
    }


    useEffect(() => {
        CheckPermission()
    }, [])

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }
    }, [hasPermission])


    if (device === null) return <ActivityIndicator />


    return <View style={{ flex: 1 }}>
        <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner} />


        <View style={styles.boxParent}>
            <View style={styles.squareBox} >
            </View>
        </View>

        {/* Scanned detail */}
        {
            Scanned &&
            <View style={styles.scanned} >
                <Text style={{ paddingHorizontal: 20 }}>{Scanned}</Text>

            </View>
        }
        {/* Login page btn */}

        <View style={styles.loginBtn} >
            <Button onPress={() => navigation.navigate(ROUTES.LOGIN)} title='Login page' color={COLORS.goldA} />

        </View>


    </View >

}

export default Scanner

const styles = StyleSheet.create({

    squareBox: {
        height: 210,
        width: 210,
        borderColor: COLORS.borderCOlor,
        borderRadius: 10,
        borderWidth: 3,
        elevation: 7,
        shadowColor: COLORS.success,
        shadowRadius: 1,

        marginBottom: 20
    },

    boxParent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    scanned: {
        position: "absolute",
        bottom: 20,
    },
    loginBtn: {
        position: "absolute",
        bottom: 20,
        right: 0
    }

})