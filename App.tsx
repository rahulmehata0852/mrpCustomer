/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store/store';
import { Provider } from 'react-redux';
import AuthNavigator from './src/navigations/AuthNavigator';

function App(): JSX.Element {
  // isAuthenticated = is...
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
        <AuthNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
