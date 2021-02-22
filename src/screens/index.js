import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import firebase, {validateEmail} from '@pokechallenge/utils';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Button, TextInput} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Keyboard} from 'react-native';

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const {navigation} = props;
  const defaultValue = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const _login = () => {
    let errors = {};
    if (!formData.email || !formData.password) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
          });
          setLoading(false);
        });
    }
    setFormError(errors);
  };

  const onChange = (e, type) => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

                  textAlign: 'center',
                }}>
                Sign in with
              </Text>
              <TextInput
                error={formError.email}
                autoCorrect={false}
                style={register.input}
                label="Email"
                onChange={(e) => onChange(e, 'email')}
              />
              <TextInput
                error={formError.password}
                autoCorrect={false}
                style={register.input}
                label="Password"
                secureTextEntry={true}
                onChange={(e) => onChange(e, 'password')}
              />
              <Button
                style={{
                  marginTop: 30,
                  backgroundColor: color.green[0],
                }}
                contentStyle={{height: 45}}
                icon={'login'}
                mode="contained"
                loading={loading}
                uppercase={false}
                labelStyle={{color: color.white[0]}}
                onPress={() => {
                  _login();
                }}>
                Register
              </Button>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <View style={{width: wp(50), alignSelf: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <Text>New User?</Text>
                    <Text
                      style={{
                        marginLeft: 8,
                        color: color.red[0],
                        fontFamily: font.bold,
                      }}>
                      Sign Up
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const Register = (props) => {
  const values = {
    email: '',
    password: '',
    repeatPassword: '',
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(values);
  const [formError, setFormError] = useState({});

  const _register = () => {
    let errors = {};
    if (!formData.email || !formData.password || !formData.repeatPassword) {
      if (!formData.email) errors.email = true;
      if (!formData.password) errors.password = true;
      if (!formData.repeatPassword) errors.repeatPassword = true;
    } else if (!validateEmail(formData.email)) {
      errors.email = true;
    } else if (formData.password !== formData.repeatPassword) {
      errors.password = true;
      errors.repeatPassword = true;
    } else if (formData.password.length < 6) {
      errors.password = true;
      errors.repeatPassword = true;
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            repeatPassword: true,
          });
          setLoading(false);
        });
    }
    setFormError(errors);
    console.log(formData, formError);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={register.page}>
          <Image
            source={require('@pokechallenge/assets/images/pokemon-register.png')}
            style={register.image}
          />
          <TextInput
            error={formError.email}
            autoCorrect={false}
            style={register.input}
            label="Email"
            value={formData.email}
            onChangeText={(email) => setFormData({...formData, email})}
          />
          <TextInput
            error={formError.password}
            autoCorrect={false}
            secureTextEntry={true}
            style={register.input}
            label="Password"
            value={formData.password}
            onChangeText={(password) => setFormData({...formData, password})}
          />
          <TextInput
            error={formError.repeatPassword}
            autoCorrect={false}
            secureTextEntry={true}
            style={register.input}
            label="Repeat password"
            value={formData.repeatPassword}
            onChangeText={(repeatPassword) =>
              setFormData({...formData, repeatPassword})
            }
          />
          <Button
            loading={loading}
            style={{
              marginTop: 30,
              backgroundColor: color.green[0],
            }}
            contentStyle={{height: 45}}
            mode="contained"
            uppercase={false}
            labelStyle={{color: color.white[0]}}
            onPress={() => {
              _register();
            }}>
            Register
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export const Region = (props) => {
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <Text>{email}</Text>
      </View>
    </>
  );
};

export const Groups = (props) => {
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <Text>{email}</Text>
      </View>
    </>
  );
};

export const Clone = (props) => {
  const [loading, setLoading] = useState(true);
  const {email, uid} = firebase.auth().currentUser;
  const route = useRoute();
  useEffect(() => {
    if (email) {
      setLoading(false);
    }
    console.log(email, uid);
  }, []);

  return (
    <>
      <Spinner visible={loading} color={color.red[0]} />
      <View style={styles.container}>
        <Text>{route.name}</Text>
        <Text>{email}</Text>
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
  logo: {
    width: hp(20),
    height: hp(20),
    marginBottom: hp(5),
    alignSelf: 'center',
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(100),
    backgroundColor: color.white[0],
  },
  container: {
    padding: wp(5),
    justifyContent: 'space-between',
  },
});

const register = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: wp(100),
    padding: wp(5),
    backgroundColor: color.white[0],
  },
  input: {
    marginBottom: 10,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
    width: wp(90),
  },
});
