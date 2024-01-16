import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, ForgotPassword, Register, Order } from '../screens';
import { COLORS, ROUTES } from '../constants';
import DrawerNavigator from './DrawerNavigator';
import Scanner from '../screens/auth/Scanner';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.SCANNER}>


      <Stack.Screen
        name={ROUTES.SCANNER}
        component={Scanner}
        options={{ headerShown: false }} />


      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={({ route }) => ({
          headerTintColor: COLORS.white,
          headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        })}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{ headerShown: false }} />

      <Stack.Screen
        name={ROUTES.ORDER}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}

export default AuthNavigator;
