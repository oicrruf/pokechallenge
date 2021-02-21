import {theme} from '@pokechallenge/styles';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {LoginScreen} from '@pokechallenge/navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <LoginScreen />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};
export default App;
