import {RegionScreen} from '@pokechallenge/navigation/drawer';
import {LoginScreen} from '@pokechallenge/navigation/stack';
import {Themes} from '@pokechallenge/styles';
import firebase from '@pokechallenge/utils';
import {NavigationContainer} from '@react-navigation/native';
import {decode, encode} from 'base-64';
import 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {YellowBox, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;
YellowBox.ignoreWarnings(['Setting a timer']);

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
