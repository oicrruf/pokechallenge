import {LoginScreen} from '@pokechallenge/navigation/stack';
import {theme} from '@pokechallenge/styles';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

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
