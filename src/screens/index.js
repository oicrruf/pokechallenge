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
import {UserProvider, useUser} from '@pokechallenge/context';

export const Login = (props) => {
  const [user, setUser] = useState();

  const {navigation} = props;

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '293885740534-hu5vk3rb6ava1s4efnb1e2e7somiuamq.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      try {
        setUser({userInfo});
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Region');
    } catch (error) {
      console.log(error);
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
      <View style={login.page}>
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
            {/* <Button
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
            </Button> */}
          </View>
        </View>
      </View>
    </>
  );
};

export const Region = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(useUser());

  console.log(props, user);
  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />

      <View style={styles.container}>
        <Text>Region</Text>
        <Text style={styles.screenContent}>{JSON.stringify(user)}</Text>
      </View>
    </>
  );
};

export const Groups = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(useUser());

  console.log(props, user);
  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />

      <View style={styles.container}>
        <Text>Groups</Text>
        <Text style={styles.screenContent}>{JSON.stringify(user)}</Text>
      </View>
    </>
  );
};

export const Clone = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(useUser());

  console.log(props, user);
  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />

      <View style={styles.container}>
        <Text>Clone</Text>
        <Text style={styles.screenContent}>{JSON.stringify(user)}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    width: wp(100),
    padding: wp(5),
    backgroundColor: color.white[0],
  },
  screenContent: {
    color: color.gray[1],
    fontSize: font.normal,
    marginBottom: hp(2),
  },
});

const login = StyleSheet.create({
  logo: {width: wp(40), height: wp(40), marginTop: hp(2)},
  page: {
    height: hp(100),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white[0],
  },
  container: {
    justifyContent: 'space-between',
    height: hp(50),
    paddingHorizontal: wp(20),
  },
});
