/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import {AppNavigator} from './navigators';
import {theme} from './assets/styles/theme';

function App(): JSX.Element {
  return (
    <EmotionThemeProvider theme={theme}>
      <AppNavigator />
    </EmotionThemeProvider>
  );
}

export default App;
