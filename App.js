import {theme} from '@pokechallenge/styles';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Login} from './src/screens';

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Login />
        </SafeAreaView>
      </PaperProvider>
    </>
  );
};
export default App;
