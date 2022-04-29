/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {AllWallets} from './components/AllWallets';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUp} from './components/SignUp';
import {User} from './components/User';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const App = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.dark : '#ddd',
  };

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {
          flex: 1,
        },
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator>
        <Stack.Screen
          name={'users'}
          component={AllWallets}
          options={{
            title: 'All Users',
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTintColor: isDarkMode ? '#fff' : '#010101',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 40,
              fontWeight: '900',
            },
          }}
        />
        <Stack.Screen
          name={'add'}
          component={SignUp}
          options={{
            title: 'Add User',
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTintColor: isDarkMode ? '#fff' : '#010101',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 35,
              fontWeight: '900',
            },
          }}
        />
        <Stack.Screen
          name={'user'}
          component={User}
          options={{
            title: 'User',
            headerStyle: {
              backgroundColor: backgroundStyle.backgroundColor,
            },
            headerTintColor: isDarkMode ? '#fff' : '#010101',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 35,
              fontWeight: '900',
            },
            headerLargeTitle: true,
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default App;
