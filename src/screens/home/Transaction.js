import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar, 
  ScrollView,
} from 'react-native';
import {COLORS, IMGS} from '../../constants';
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

function Transaction({ navigation }) {
  const vendor = useSelector((state) => state.vendor.vendor);
  const [transactionHistory, setTransactionHistory] = useState([
    {
        "cash_collected": "832.00",
        "created_at": null,
        "customer_id": 1,
        "order_value": "832.00",
        "points_redeemed": 0,
        "points_rewarded": 24,
        "reward_balance_after": 24,
        "reward_balance_before": 0,
        "seller_id": 1,
        "status": "completed",
        "txn_id": 1,
        "txn_type": "sale"
    }]);

    useFocusEffect(
      React.useCallback(() => {
        getTransactions();
        return () => {
        };
      }, [])
    );

    const getTransactions = () => {
      let requestOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "sellerId": parseFloat(vendor.sellerid),
        }),
      };
  
      fetch("http://13.200.100.28:5000/api/fetchTransactionsBySellerID", requestOptions)
      .then(response => response.json())
      .then(async transactions => {
        let t = await transactions;
        console.log(t);
        setTransactionHistory(t.transactions);
        console.log("th", transactionHistory);
      })
      .catch(error => {
        console.log('error', error);
      });
    };


  const Item = ({item}) => {
    return (
      <View style={[styles.flatListContainer, styles.pL20, styles.pR20]}>
        <View style={[styles.row, styles.spaceBtw]}>
          <View style={[styles.row, styles.spaceBtw]}>
            <View style={styles.userIcon} />
            <Text style={[styles.userName]}>{item.name || item.phone_number || item.customer_id}</Text>
          </View>
          <View>
            <Text style={styles.cardDetail}>₹{item.cash_collected}</Text>
          </View>
        </View>
        <View style={[styles.wFull, styles.row, styles.spaceEven]}>
          <View style={styles.cardDetailDescCont}>
            <Text style={styles.cardDetailDescVal}>₹{item.order_value}</Text>
            <Text style={styles.cardDetailDesc}>Order{'\n'}Value</Text>
          </View>
          <View style={styles.cardDetailDescCont}>
            <Text style={styles.cardDetailDescVal}>{item.points_redeemed}</Text>
            <Text style={styles.cardDetailDesc}>MRP{'\n'}Used</Text>
          </View>
          <View style={styles.cardDetailDescCont}>
            <Text style={styles.cardDetailDescVal}>{item.points_rewarded} </Text>
            <Text style={styles.cardDetailDesc}>MRP{'\n'}Rewarded</Text>
          </View>
          <View style={styles.cardDetailDescCont}>
            <Text style={styles.cardDetailDescVal}>₹{item.cash_collected}</Text>
            <Text style={styles.cardDetailDesc}>Cash{'\n'}Collected</Text>
          </View>
        </View>
    </View>
  )
};

  return (
          <SafeAreaView style={styles.main}>
          <StatusBar
            backgroundColor={COLORS.goldA}
          />

              <View style={styles.container}>
                <View style={[styles.wFull, styles.pT20, styles.pL20, styles.pR20, styles.pB60]}>
                  <FlatList data={transactionHistory} renderItem={Item} keyExtractor={item => item.txn_id} />
                </View>
              </View>

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
  pB60: {
    paddingBottom: 60,
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
  flatListContainer: {
    width: '100%',
    color: COLORS.black,
    backgroundColor: COLORS.goldLight,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  userIcon: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
  },
  cardDetail:{
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500'
  },
  userName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 4,
    paddingTop: 2,
  },
  cardDetailDescCont: {
    backgroundColor: COLORS.goldD,
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  cardDetailDesc: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '400',
    textAlign: 'center',
  },
  cardDetailDescVal: {
    fontSize: 14,
    color: COLORS.black, 
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Transaction;
