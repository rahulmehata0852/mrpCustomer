import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import { useSelector, useDispatch } from "react-redux";
import { addCustomerDetail, deleteCustomerDetail } from "../../store/customerSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";

function Order({ navigation }) {
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.vendor);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [success, setSuccess] = useState(false);

  let getCustDetails = () => {
    setLoading(true);
    let requestOptions = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "phoneNumber": phoneNumber,
        "sellerId": vendor.sellerid,
      }),
    };
    console.log("order page", requestOptions);
    fetch("http://13.200.100.28:5000/api/getCustomerbyPhoneNumber", requestOptions)
    .then(response => response.json())
    .then(async results => {
      const cust = await results;
      if(cust.customerid){
        setSuccess(true);
        dispatch(deleteCustomerDetail());
        dispatch(addCustomerDetail(cust));
        setTimeout(()=>{
          navigation.navigate(ROUTES.ORDER_PUNCH);
          setPhoneNumber('');
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
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
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
      <View style={[styles.wFull, styles.pB40]}>
      <View style={[styles.wFull, styles.pL20, styles.pT20, styles.row, styles.pB20]}>
        <View style={styles.storeImage}></View>
        <View style={[styles.pL20]}>
          <Text style={styles.storePhone}>{ vendor.phoneNumber || 'Store Number' } </Text>
          <Text style={styles.storeName}>{ vendor.businessname || 'Store Name'}</Text>
        </View>
      </View>
      <View style={[styles.wFull]}>
        <LottieView source={require("../../screens/json/nicegive.json")} style={styles.homePageImage} autoPlay loop />
      </View>
      <View style={[styles.wFull]}>
          <Text style={styles.orderDescText}>Give Loyalty to </Text>
      </View>
      <View style={[styles.wFull, styles.pL20, styles.pR20]}>
        <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Phone Number"
            inputMode="numeric"
            maxLength={10}
            onChangeText={setPhoneNumber}
            textContentType="username"
            value={phoneNumber}
            placeholderTextColor={COLORS.gray}
        />
        <View style={[styles.loginBtnWrapper]}>
          <LinearGradient
            colors={[COLORS.goldA, COLORS.goldC, COLORS.goldA]}
            style={styles.linearGradientButton}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 0.0, x: 1.0 }}
          >
            <TouchableOpacity
              onPress={getCustDetails}
              activeOpacity={0.7}
              style={styles.loginBtn}
            >
            
            {loading ? success ? ( <LottieView source={require("../../screens/json/success.json")} style={styles.animation} autoPlay loop={false} /> ) : ( <ActivityIndicator size="small" color={COLORS.black} /> ) : (
                  <Text style={styles.loginBtnText}>Punch Order</Text>
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
  pB40: {
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
  },
  animation:{
    width: 22,
    height: 22,
    },
  //main
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
  // body styles
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor : COLORS.goldA,
  },
  storeName:{
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.goldA,
  },
  storePhone:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    paddingTop: 3,
  },
  orderDescText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  homePageImage:{
    width:300,
    height:300,
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default Order;
