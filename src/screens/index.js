import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ToastAndroid} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

export const Login = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '293885740534-hu5vk3rb6ava1s4efnb1e2e7somiuamq.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const setUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_user', jsonValue);
    } catch (e) {
      console.log('Error on save data user');
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo({userInfo});
      try {
        if (userInfo) {
          setUser({userInfo});
          navigation.navigate('Region');
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        ToastAndroid.show('We have found a error', ToastAndroid.SHORT);
      }
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={login.container}>
          <Image
            style={login.logo}
            source={require('@pokechallenge/assets/images/pokeball.png')}
          />
          <View>
            <Text
              style={{
                marginBottom: hp(2),
                color: color.gray[0],
                textAlign: 'center',
              }}>
              Sign in with
            </Text>
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={signIn}
            />
            <Button
              style={{
                marginBottom: hp(2),
                backgroundColor: color.facebook[0],
              }}
              mode="contained"
              uppercase={false}
              icon={'facebook'}
              labelStyle={{color: color.white[0]}}
              onPress={() => {
                navigation.navigate('Region');
              }}>
              Sign In Facebook
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};

export const Region = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('@storage_user');
      return user != null ? setUser(JSON.parse(user)) : null;
    } catch (e) {
      console.log('Error on read data user');
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user != undefined) setLoading(false);
  }, [user]);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />

      <View style={styles.container}>
        <Text style={styles.appName}>Region</Text>
      </View>
    </>
  );
};

export const Groups = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.appName}>Groups</Text>
      </View>
    </>
  );
};

export const Clone = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.appName}>Clone</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white[0],
  },
  appName: {color: color.blue[0], fontSize: font.lg, marginBottom: hp(2)},
});

const login = StyleSheet.create({
  logo: {width: wp(40), height: wp(40), marginTop: hp(2)},
  container: {
    justifyContent: 'space-between',
    height: hp(50),
    paddingHorizontal: wp(20),
  },
});
