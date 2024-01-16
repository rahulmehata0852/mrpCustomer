import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {COLORS} from '../../constants';
import LottieView from "lottie-react-native";

function Offer({ navigation }) {

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={styles.main}>
      <View style={styles.container}>
      <View style={[styles.wFull, styles.pT40]}>
      <Text style={styles.orderDescText}>Offers</Text>
      <LottieView source={require("../../screens/json/25.json")} style={styles.offerAnimation} autoPlay loop />
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
  row: {
    flexDirection: "row",
  },
  offerAnimation: {
    width: 340,
    height: 600,
    alignSelf: 'center'
  },

  //main
  main: {
    flex: 1,
    backgroundColor: COLORS.white,
    color: COLORS.black, 
  },
  container: {
    width: '100%',
    position: 'relative',
    flex: 1,
    backgroundColor: COLORS.white,
  },
  orderDescText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default Offer;
