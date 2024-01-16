import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {COLORS, ROUTES, IMGS} from '../constants';
import {Loyalty, Transaction} from '../screens';
import BottomTabNavigator from './BottomTabNavigator';
import CustomDrawer from '../components/CustomDrawer';
import {StyleSheet, Image} from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  console.log("drawer", Drawer);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.black,
        drawerActiveTintColor: COLORS.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}>
      <Drawer.Screen
        name={ROUTES.ORDER_DRAWER}
        component={BottomTabNavigator}
        options={{
          title: 'Order',
          drawerIcon: ({focused, color, size}) => (
            <Image source={IMGS.home} style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.LOYALTY_DRAWER}
        component={Loyalty}
        options={{
          title: 'Loyalty',
          drawerIcon: ({focused, color, size}) => (
            <Image source={IMGS.loyalty} style={styles.icon} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.TRANSACTION_DRAWER}
        component={Transaction}
        options={{
          title: 'Transaction',
          drawerIcon: ({focused, color, size}) => (
            <Image source={IMGS.wallet} style={styles.icon} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  icon:{
    width:28,
    height:28,
  }
});

export default DrawerNavigator;
