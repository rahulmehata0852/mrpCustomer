import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView, 
  Switch,
  ScrollView
} from 'react-native';
import {COLORS} from '../../constants';
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

function Loyalty({navigation}) {
  const vendor=useSelector((state) => state.vendor.vendor);
  const [loyaltyProgramDetails, setLoyaltyProgramDetails]=useState({"loyalty_program":{
    "program_name": '',
    "award_percentage" : '',
    "redeem_percentage" : '',
    "min_sale_for_award" : '',
    "min_sale_for_redeem" : '',
    "is_active": true,
    "program_description": '',
    "program_id": '',
    "seller_id": ''
  }});
  const [orderValue, setOrderValue]=useState('');
  const [isEnabled, setIsEnabled]=useState(false);
  const toggleSwitch=() => setIsEnabled(previousState => !previousState);
  const handleInputChange=(text) => {
    setOrderValue(text);
  };

  useEffect(() => {
    console.log("api load");
    let getLoyaltyProgram=() => {
      let requestOptions={
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId": parseFloat(vendor.sellerid),
        }),
      };
  
      fetch("http://13.200.100.28:5000/api/getLoyaltyProgram", requestOptions)
      .then(response => response.json())
      .then(async loyalty_program => {
        const x=await loyalty_program;
        console.log(loyalty_program);
        setLoyaltyProgramDetails(x);
      })
      .catch(error => console.log('error', error));
    };
    getLoyaltyProgram();
  }, []);

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.wFull, styles.pT20, styles.pL20, styles.pR20]}>
          <Text style={styles.reviewText}>Basic Loyalty Program</Text>
        </View>
        <View style={[styles.card, styles.margin20, styles.pT20, styles.pL20, styles.pR20, styles.pB20]}>
           <Text style={styles.cardHeading}>{loyaltyProgramDetails.loyalty_program.program_name}</Text>
          <View style={[styles.row]}>
            <Text style={styles.cardDetail}>Reward : {loyaltyProgramDetails.loyalty_program.award_percentage}%</Text>
            <Text style={styles.cardDetail}>Redeem : {loyaltyProgramDetails.loyalty_program.redeem_percentage}%</Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.cardDetail}>Min. Order Value for Reward : {loyaltyProgramDetails.loyalty_program.min_sale_for_award}</Text>
            <Text style={styles.cardDetail}>Min. Order Value for Redeem : {loyaltyProgramDetails.loyalty_program.min_sale_for_redeem}</Text>
          </View> 
        </View>

        <View style={[styles.tieredloyalty, styles.pT20, styles.pL20, styles.pR20, styles.pB20]}>
          <Text style={styles.loyaltytext}>Tiered loyalty</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? 'black' : COLORS.primary}
            onValueChange={toggleSwitch}
            value={isEnabled}
            disabled={true}
          />
        </View>

          <View style={[styles.column, styles.pL20, ]}>
            <View style={[styles.first]}>
            <LottieView source={require("../../screens/json/22.json")} style={styles.tierAnimation} autoPlay loop />
              <View style={styles.rowtext}>
                <Text style={styles.rewardtextone}>BRONZE</Text>
                <Text style={styles.rewardtext}>Shops 2 times every Week</Text>
                <Text style={styles.rewardtext}>Gets 1% loyalty points on each order</Text>
              </View>
            </View>

            <View style={styles.first}>
            <LottieView source={require("../../screens/json/23.json")} style={styles.tierAnimation} autoPlay loop />
              <View style={styles.rowtext}>
                <Text style={styles.rewardtextone}>SILVER</Text>
                <Text style={styles.rewardtext}>Shops 4 times every Week</Text>
                <Text style={styles.rewardtext}>Gets 2% loyalty points on each order</Text>
              </View>
            </View>

            <View style={styles.first}>
            <LottieView source={require("../../screens/json/24.json")} style={styles.tierAnimation} autoPlay loop />
              <View style={styles.rowtext}>
                <Text style={styles.rewardtextone}>GOLD</Text>
                <Text style={styles.rewardtext}>Shops 5 times every Week</Text>
                <Text style={styles.rewardtext}>Gets 3% loyalty points on each order</Text>
                </View>
            </View>

          </View>
      </ScrollView>
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
  row: {
    flexDirection: "row",
  },
  column:{
    flexDirection:"column",
  },
  margin20:{
    margin: 20,
  },
  tierAnimation:{
    width:100,
    height:100,
    marginLeft: -25,
    marginTop:-14,
    marginBottom:8,
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
  card: {
    color: COLORS.black,
    backgroundColor: COLORS.goldB,
    borderRadius: 14,
  },
  cardHeading:{
    color: COLORS.black,
    fontSize : 22,
  },
  cardDetail:{
    color: COLORS.black,
    fontSize: 16,
    paddingRight: 40,
    paddingTop: 10,
  },
  reviewText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  currencySymbol: {
    fontSize: 20,
    marginRight: 5,
  },
  inputsecond: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  warningText: {
    color: 'red',
    marginTop: 5,
  },
  tieredloyalty: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loyaltytext: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold"
  },
  first:{
    flexDirection: 'row',
    marginTop: 5
  },
  rewardtextone:{
    fontSize:18,
    color: COLORS.lightBlack,
  },
  rewardtext:{
    fontSize:14,
    fontWeight:"bold",
    color: COLORS.lightBlack,
  }
});

export default Loyalty;
