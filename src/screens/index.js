import {Text} from '@pokechallenge/components/atoms';
import {color, font} from '@pokechallenge/styles';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Login = () => {
  const image = require('@pokechallenge/assets/images/pokeball.png');
  return (
    <>
      <View style={styles.container}>
        <Image
          source={image}
          style={{width: 150, height: 150, marginBottom: 40}}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={styles.appName}>PokeChallenge</Text>
        <Text style={styles.lg}>Font: Large</Text>
        <Text style={styles.normal}>Font: Normal</Text>
        <Text style={styles.small}>Font: Small</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
    backgroundColor: color.gray[2],
  },
  appName: {color: color.yellow[0], fontSize: hp(5), marginBottom: hp(2)},
  small: {color: color.blue[0], fontSize: font.small},
  normal: {color: color.red[0], fontSize: font.normal},
  lg: {color: color.green[0], fontSize: font.lg},
});
