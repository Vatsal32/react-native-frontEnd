/**
 * @format
 */
import React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

const FApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? '#000' : '#fff',
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <App />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => FApp);
