import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, StatusBar, ScrollView, ActivityIndicator, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, ROUTES } from "../../constants";
import LottieView from "lottie-react-native";


function ForgotPassword({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [verifyPassword, setVerifyPassword] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updatePassword = () => {
    setLoading(true);
    let requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
        "newPassword": password,
      }),
      redirect: 'follow'
    };

    fetch("http://13.200.100.28:5000/api/forgotSellerPassword", requestOptions)
    .then(response => response.json())
    .then(async result => {
      const res = await result;
       if(res){
        setSuccess(true);
        setTimeout(()=>{
          navigation.navigate(ROUTES.LOGIN);
          setSuccess(false);
          setLoading(false);
        }, 1000)
       }
    })
    .catch(error => {
      setLoading(false);
      console.log('error', error);
    });
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        backgroundColor={COLORS.goldA}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
        keyboardShouldPersistTaps='handled'
      >
        <ScrollView style={styles.container} 
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps='handled'
        >
          <View style={styles.wFull}>
            <View style={styles.loginHeader}>
              <LinearGradient
                colors={[COLORS.goldA, COLORS.goldB ]}
                style={styles.linearGradient}
              >
                <View style={[styles.logo, styles.pL20]}>
                  <Image
                    style={styles.logoImage}
                    source={require("../../assets/logo.png")}
                  />
                </View>
                <View style={styles.pL20}>
                   <Text style={styles.loginText}>Update</Text>
                   <Text style={styles.loginText}>password</Text>
                </View>
                <View style={[styles.pL20, styles.headerSubContainer, styles.pT20, styles.pB20]}>
                <Text style={styles.newText}>Remember Password? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.LOGIN)}
                  >
                    <Text style={styles.signupText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={[styles.pL20, styles.pR20, styles.pT40]}>
            <TextInput
                style={[styles.input]}
                clearButtonMode="always"
                placeholder="Phone Number"
                inputMode="numeric"
                maxLength={10}
                onChangeText={setPhoneNumber}
                textContentType="username"
                value={phoneNumber}
                placeholderTextColor={COLORS.gray}
            />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Password"
            inputMode="text"
            maxLength={14}
            onChangeText={e => setPassword(e)}
            textContentType="password"
            value={password}
            placeholderTextColor={COLORS.gray}
          />
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Verify New Password"
            inputMode="text"
            maxLength={40}
            onChangeText={e => setVerifyPassword(e)}
            textContentType="organizationName"
            value={verifyPassword}
            placeholderTextColor={COLORS.gray}
          />
              <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.goldA, COLORS.goldC, COLORS.goldA]}
                  style={styles.linearGradientButton}
                  start={{ y: 0.0, x: 0.0 }}
                  end={{ y: 0.0, x: 1.0 }}
                >
                  <TouchableOpacity
                    onPress={updatePassword}
                    activeOpacity={0.7}
                    style={styles.loginBtn}
                  >
                    {loading ? success ? ( <LottieView source={require("../../screens/json/success.json")} style={styles.animation} autoPlay loop={false} /> ) : ( <ActivityIndicator size="small" color={COLORS.black} /> ) : (
                      <Text style={styles.loginBtnText}>Update password</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              </View>
          </View>
        </ScrollView>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  // utils
  wFull: {
    width: "100%",
  },
  pL20: {
    paddingLeft: 20,
  },
  pT20: {
    paddingTop: 20,
  },
  pB20: {
    paddingBottom: 20,
  },
  pR20: {
    paddingRight: 20,
  },
  pT40: {
    paddingTop: 40,
  },

  //main body
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    color: COLORS.black
  },

  container: {
    width: "100%",
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loginHeader: {
    width: "100%",
    height: 259,
  },
  linearGradient: {
    width: "100%",
    height: 259,
    flex: 1,
  },
  logo:{
    paddingTop: 74,
    flex: 1,
  },
  logoImage:{
    width: 232,
    height: 30,
  },
  loginText:{
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "500",
    color: COLORS.black,
  },
  headerSubContainer:{
    flexDirection: "row",
  },
  newText: {
    fontSize: 18,
    fontStyle: "normal",
    color: COLORS.brown,
  },
  signupText: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "bold",
    color: COLORS.brown,
    textDecorationLine: "underline",
  },
    input: {
    borderWidth: 1,
    borderColor: COLORS.greyC,
    marginVertical: 14,
    borderRadius: 12,
    padding:12,
    height: 55,
    paddingVertical: 0,
    color: COLORS.black,
    fontSize: 18,
  },
  dropdown:{
    borderWidth: 1,
    borderColor: COLORS.black,
    marginVertical: 14,
    borderRadius: 12,
    padding:12,
    height: 55,
    paddingVertical: 0,
    color: COLORS.black,
    fontSize: 18,
  },
  placeholderStyle: {
    color: COLORS.gray,
  },
  selectedTextStyle: {
    color: COLORS.black,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 16,
    marginBottom: 20,
    elevation: 5,
  },
  linearGradientButton: {
    width: "100%",
    height: 18,
    flex: 1,
    borderRadius: 8,
  },
  loginBtn: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
  },
  loginBtnText: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight: "500",
    color: COLORS.brown,
  },
});
