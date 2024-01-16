import React, {useState} from 'react';
import {StyleSheet, Text, SafeAreaView, TouchableOpacity, StatusBar, View, Image, Linking, Platform} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {COLORS, ROUTES} from '../../constants';
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Settings = ({navigation}) => {
  const vendor = useSelector((state) => state.vendor.vendor);
  const url = `http://www.mrpshop.in/seller/reports.php?seller_id=${vendor.sellerid}`;
  const [sellerUrl, setSellerUrl] = useState(url);

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
      >
      <View style={[styles.profileicon, styles.pB20]}>
          <LottieView source={require("../../screens/json/46.json")} style={styles.profileImage} autoPlay loop />
          <Text style={styles.sellerName}>{vendor.businessname || 'Business Name'}</Text>
      </View>
      <View style={[styles.container, styles.pL20, styles.pR20, styles.pT20, styles.pB20]}>
        <View style={[]}>
          <TouchableOpacity
            onPress={() => Linking.openURL('http://www.mrpshop.in/privacy.html')}
            style={[styles.SettingListing, styles.row]}
            >
            <LottieView source={require("../../screens/json/privacypolicy.json")} style={styles.ppAnime} autoPlay loop />
            <Text style={styles.settingListText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(sellerUrl)}
            style={[styles.SettingListing, styles.row]}
            >
            <LottieView source={require("../../screens/json/graphs.json")} style={styles.dbAnime} autoPlay loop />
            <Text style={styles.settingListText}>Seller Dashboard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pT40}>
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
                    >
                      <Text style={styles.loginBtnCancelText}>Update Profile</Text>
                    </TouchableOpacity>
                  </LinearGradient>
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
                      onPress={() => navigation.navigate(ROUTES.LOGIN)}
                    >
                      <Text style={styles.loginBtnText}>Log out</Text>
                    </TouchableOpacity>
                  </LinearGradient>
            </View>
          </View>      
      </View>
      </KeyboardAwareScrollView>
      
    </SafeAreaView>
  );
};

export default Settings;

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
  spaceEven:{
    justifyContent: 'space-evenly',
  },
  spaceBtw:{
    justifyContent: 'space-between',
  },
  sellerName: {  
    textAlign: "center",
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.goldA,
    marginTop: -20,
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
  fontWeight: "bold",
  color: COLORS.black,
},

  borderBottom:{
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  SettingListing: {
    color: COLORS.black
  },
  settingListText: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: 20,
    justifyContent: 'center',
    paddingLeft: 10,
    textAlignVertical: 'center'
  },
  profileicon:{
    alignSelf: 'center',
  },
  profileImage:{
    width: 200,
    height: 200,
    borderRadius: 75,
    borderWidth: 2, 
    borderColor: '#fff',
  },
  ppAnime: {
    width: 50,
    height: 50,
 },
 dbAnime: {
    width: 60,
    height: 60,
  },
});
