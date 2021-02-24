import {RegionScreen} from '@pokechallenge/navigation/drawer';
import {LoginScreen} from '@pokechallenge/navigation/stack';
import {Themes} from '@pokechallenge/styles';
import firebase from '@pokechallenge/utils';
import {NavigationContainer} from '@react-navigation/native';
import 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider as ElementProvider} from 'react-native-elements';

export default App = () => {
  const {paper} = Themes;
  const [user, setUser] = useState(undefined);
  const [message, setMessage] = useState('You must register or log in');
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
    if (!user === undefined) return null;
    if (user) {
      setMessage('Logging in');
    } else {
      setMessage('You must register or log in');
    }
    console.log(message);
  }, []);

  return (
    <>
      <PaperProvider theme={paper}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          {user ? <RegionScreen /> : <LoginScreen />}
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};
