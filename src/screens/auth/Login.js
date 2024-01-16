import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  ActivityIndicator, 
  ScrollView, 
  Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, ROUTES } from "../../constants";
import { useDispatch } from "react-redux";
import { addVendorDetail } from "../../store/vendorSlice";
import LottieView from "lottie-react-native";

function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { 
        Accept: "application/json",
        "Content-Type": "application/json" },
      body: JSON.stringify({ 
        phoneNumber: phoneNumber, 
        accountType: "seller", 
        password: password 
      }),
    };

    fetch("http://13.200.100.28:5000/api/fetchAuthDetails", requestOptions)
    .then(response => response.json())
    .then(async result => {
      const loginResult = await result;
      if (loginResult.sellerid) {
        setSuccess(true);
        dispatch(addVendorDetail(loginResult));
        setTimeout(()=>{
          navigation.navigate(ROUTES.ORDER);
          setSuccess(false);
          setLoading(false);
        }, 1000)
      }
    })
    .catch(error => {
      setLoading(false);
      console.log('api error', error);
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
                <View style={[styles.pL20]}>
                  <Text style={styles.loginText}>Login to your Seller</Text>
                  <Text style={styles.loginText}>Account </Text>
                </View>
                <View style={[styles.pL20, styles.headerSubContainer, styles.pT20, styles.pB20]}>
                <Text style={styles.newText}>New here? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTES.REGISTER)}
                  >
                    <Text style={styles.signupText}>Create Account</Text>
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
                maxLength={10}
                onChangeText={setPassword}
                textContentType="password"
                value={password}
                secureTextEntry={true}
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
                    onPress={getUserDetails}
                    activeOpacity={0.7}
                    style={styles.loginBtn}
                  >
                    {loading ? success ? ( <LottieView source={require("../../screens/json/success.json")} style={styles.animation} autoPlay loop={false} /> 
                    ) : ( <ActivityIndicator size="small" color={COLORS.black} /> 
                    ) : ( <Text style={styles.loginBtnText}>Login</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.FORGOT_PASSWORD)}
                style={styles.forgotPassBtn}
              >
                <Text style={styles.forgotPassText}>Forgot Password?</Text>
              </TouchableOpacity>
          </View>
          
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login;

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
  animation:{
    width: 22,
    height: 22,
  },

  //main body
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    color: COLORS.black, 
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
  forgotPassText: {
    color: COLORS.goldA,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 18,
    // textDecorationLine: "underline",
  },
  
});
