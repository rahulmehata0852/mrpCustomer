import React , {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, ROUTES} from '../../constants';
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";


function OrderPunch({ navigation }) {
  const [saleAmount, setSaleAmount] = React.useState();
  const [rewardMRP , setRewardMRP] = React.useState();
  const [redeemMRP , setRedeemMRP] = React.useState();
  const [amountToCollect , setAmountToCollect] = React.useState();
  const [showComp, setShowComp] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const vendor = useSelector((state) => state.vendor.vendor);
  const customer = useSelector((state) => state.customer.customer);

  const calculateLoyalty = (e) => {
    setSaleAmount(e);
    if(e >= vendor.loyalty_program.min_sale_for_redeem){
      let requestLoyalty = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId" : parseFloat(vendor.sellerid),
          "customerId": parseFloat(customer.customerid),
          "orderValue": parseFloat(e),
        }),
      };
      fetch("http://13.200.100.28:5000/api/showTransactionDetails", requestLoyalty)
      .then(response => response.json())
      .then(async result => {
        const res = await result;
        setLoading(false);
        if(res.cash_to_collect){
          setAmountToCollect(res.cash_to_collect);
          setRewardMRP(res.reward_amount);
          setRedeemMRP(res.redeem_amount);
          setShowComp(true);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
    } else {
      setShowComp(true);
      setAmountToCollect(e);
      setRewardMRP(0);
      setRedeemMRP(0);
    }
  };

  const processTransaction = () => {
    setLoading(true);
      let requestProcess = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId" : parseFloat(vendor.sellerid),
          "customerId": parseFloat(customer.customerid),
          "orderValue": parseFloat(saleAmount),
        }),
      };
      fetch("http://13.200.100.28:5000/api/processTransaction", requestProcess)
      .then(response => response.json())
      .then(async results => {
        const resu = await results;
        if(resu.saleTransactionID){
         setSuccess(true);
         setTimeout(()=>{
          navigation.navigate(ROUTES.ORDER);
          setSuccess(false);
          setLoading(false);
         }, 1000)
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

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
      
      <View style={[styles.wFull, styles.pB40]}>
      <View style={[styles.wFull, styles.pL20, styles.row, styles.pB20, styles.pT20]}>
        <View style={styles.custImage}></View>
        <View style={[styles.pL20]}>
          <Text style={styles.custPhone}>{ customer.phonenumber || 'Customer Number' }</Text>
          <Text style={styles.custName}>{ customer.name || 'Customer Name' } </Text>
        </View>
      </View>
      <View style={[styles.wFull, styles.row, styles.pB20, styles.spaceEven]}>
        <View style={[styles.infoContainer]}>
          <Text style={styles.infoDetail}>{ customer.reward_balance || '0' }</Text>
          <Text style={styles.infoName}>MRP Points</Text>
        </View>
        <View style={[styles.infoContainer]}>
          <Text style={styles.infoDetail}>{ Math.abs(customer.sale_balance) || '0' }</Text>
          <Text style={styles.infoName}>Total Sales</Text>
        </View>
        <View style={[styles.infoContainer]}>
          <Text style={styles.infoDetail}>{ customer.reward_percentage || 'Lv. 1' }%</Text>
          <Text style={styles.infoName}>Reward</Text>
        </View>
      </View>
        <View style={[styles.wFull, styles.pL20, styles.pR20]}>
          <TextInput
            style={styles.input}
            clearButtonMode="always"
            placeholder="Sale Amount"
            inputMode="numeric"
            maxLength={10}
            onChangeText={(e)=> calculateLoyalty(e)}
            value={saleAmount}
            placeholderTextColor={COLORS.gray}
          />
        </View>
        { showComp && 
           <View style={[styles.wFull, styles.pL20, styles.pR20]}>
            <View>
              <Text style={styles.orderSumText}>Summary</Text>
            </View>

            <View style={[styles.row, styles.spaceBtw, styles.borderBottom]}>
              <Text style={styles.orderTitle}>MRP Redeemed</Text>
              <Text style={styles.orderTitle}>{ redeemMRP } </Text>
            </View>

            <View style={[styles.row, styles.spaceBtw, styles.borderBottom]}>
              <Text style={styles.orderTitle}>MRP Rewarded</Text>
              <Text style={styles.orderTitle}>{ rewardMRP } </Text>
            </View>  

            <View style={[styles.row, styles.spaceBtw]}>
              <Text style={styles.orderTitle}>Cash To Collect</Text>
              <Text style={[styles.orderTitle, styles.fontBold]}>₹ { amountToCollect } </Text>
            </View> 

            <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.goldA, COLORS.goldC, COLORS.goldA]}
                  style={styles.linearGradientButton}
                  start={{ y: 0.0, x: 0.0 }}
                  end={{ y: 0.0, x: 1.0 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.loginBtn}
                    onPress={() => processTransaction()}
                  >
                    {loading ? success ? ( <LottieView source={require("../../screens/json/success.json")} style={styles.animation} autoPlay loop={false} /> ) : ( <ActivityIndicator size="small" color={COLORS.black} /> ) : (
                      <Text style={styles.loginBtnText}>Collect ₹ { amountToCollect }</Text>
                    )}
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.white, COLORS.white, COLORS.white]}
                  style={styles.linearGradientCancelButton}
                  start={{ y: 0.0, x: 0.0 }}
                  end={{ y: 0.0, x: 1.0 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.loginBtn}
                    onPress={() => navigation.navigate(ROUTES.ORDER)}
                  >
                      <Text style={styles.loginBtnCancelText}>Cancel</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
          </View> 
      }
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
  spaceEven:{
    justifyContent: 'space-evenly',
  },
  spaceBtw:{
    justifyContent: 'space-between',
  },
  borderBottom:{
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  fontBold:{
    fontWeight: '700',
  },
  animation:{
  width: 22,
  height: 22,
  },
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
  placeholderStyle: {
    color: COLORS.grayLight,
  },
  selectedTextStyle: {
    color: COLORS.grayLight,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 16,
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
  linearGradientCancelButton: {
    width: "100%",
    flex: 1,
    borderRadius: 8,
    borderColor: COLORS.goldA,
    borderWidth: 1,
  },
  loginBtnCancelText: {
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    color: COLORS.brown,
  },
  // store
 storeImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor : COLORS.goldA,
  },
  storeName:{
    fontSize: 12,
    fontWeight: 'normal',
    color: COLORS.goldA,
  },
  storePhone:{
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  // user
  custImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor : COLORS.goldA,
  },
  custName:{
    fontSize: 16,
    fontWeight: 'normal',
    color: COLORS.black,
  },
  custPhone:{
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.goldA,
    paddingTop: 3,
  },
  infoContainer: {
    padding: 14,
    backgroundColor: COLORS.goldLight,
    borderRadius: 10,
  },
  infoDetail: {
    fontSize: 26,
    color: COLORS.goldA, 
    fontWeight: '500',
    textAlign: 'center',
  },
  infoName: {
    fontSize: 12,
    color: COLORS.lightBlack,
    fontWeight: '400',
    textAlign: 'center',
  },
  orderSumText:{
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  orderTitle:{
    paddingBottom: 8,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop:8,
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '400',
  },
});

export default OrderPunch;
