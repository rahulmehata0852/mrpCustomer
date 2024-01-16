import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, Text} from 'react-native';
import {COLORS, IMGS, ROUTES} from '../constants';
import {Loyalty, Transaction, Profile, Offer} from '../screens';
import SettingsNavigator from './SettingsNavigator';
import OrderNavigator from './OrderNavigator';
import HomeIcon from '../assets/icons/home.png';
import GroupIcon from '../assets/icons/offer.png';
import LoyaltyIcon from '../assets/icons/loyalty.png';
import ProfileIcon from '../assets/icons/profile.png';
import WalletIcon from '../assets/icons/wallet.png';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

function BoldText({children, style}) {
  return <Text style={{...style, fontWeight: 'bold'}}>{children}</Text>;
}

function BottomTabNavigator({ navigation }) {

  return (
    <SafeAreaProvider style={styles.container}>
      <Tab.Navigator
        initialRouteName={ROUTES.ORDER_TAB}
        screenOptions={({route}) => ({
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 50,
            position: 'absolute',
            bottom: 0,
          },
        })}>
        <Tab.Screen
          name={ROUTES.ORDER_TAB}
          component={OrderNavigator}
          options={{
            tabBarLabel: ({color, focused}) => (
              <BoldText style={{color}}>Home</BoldText>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={HomeIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.goldA : COLORS.black,
                }}
              />
            ),
            headerShown: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.TRANSACTION}
          component={Transaction}
          options={{
            tabBarLabel: ({color, focused}) => (
              <BoldText style={{color}}>Wallet</BoldText>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={WalletIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.goldA : COLORS.black,
                }}
              />
            ),
            headerShown: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />

        <Tab.Screen
          name={ROUTES.WALLET}
          component={Loyalty}
          options={{
            tabBarLabel: ({color, focused}) => (
              <BoldText style={{color}}>Transaction</BoldText>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={LoyaltyIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.goldA : COLORS.black,
                }}
              />
            ),
            headerShown: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />
        <Tab.Screen
          name={ROUTES.OFFER}
          component={Offer}
          options={{
            tabBarLabel: ({color, focused}) => (
              <BoldText style={{color}}>Profile</BoldText>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={GroupIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.goldA : COLORS.black,
                }}
              />
            ),
            headerShown: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />

        <Tab.Screen
          name={ROUTES.SETTINGS_NAVIGATOR}
          component={SettingsNavigator}
          options={{
            tabBarLabel: ({color, focused}) => (
              <BoldText style={{color}}>Settings</BoldText>
            ),
            tabBarIcon: ({focused}) => (
              <Image
                source={ProfileIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.goldA : COLORS.black,
                }}
              />
            ),
            headerShown: false,
            headerTintColor: COLORS.white,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
          }}
        />

      </Tab.Navigator>
    </SafeAreaProvider>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
