import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Login = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Button
            onPress={() => {
              navigation.navigate('Region');
            }}>
            Login
          </Button>
        </View>
      </View>
    </>
  );
};

export const Region = ({navigation}) => {
  return (
    <>
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
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
    backgroundColor: color.white[0],
  },
  appName: {color: color.blue[0], fontSize: font.lg, marginBottom: hp(2)},
});
