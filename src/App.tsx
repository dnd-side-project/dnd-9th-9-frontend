/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import {QueryClientProvider} from '@tanstack/react-query';

import {theme} from './assets/styles/theme';
import {queryClient} from './lib/react-query';
import {AppNavigator} from './navigators';

function App(): JSX.Element {
  return (
    <EmotionThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </EmotionThemeProvider>
  );
}

export default App;
