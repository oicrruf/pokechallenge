import {color, font} from '@pokechallenge/styles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text as RNText} from 'react-native';
import {IconButton} from 'react-native-paper';

export const Text = ({children, style = null}) => {
  return (
    <RNText style={[{fontFamily: font.regular, ...style}]}>{children}</RNText>
  );
};

export const NavBarLogo = () => {
  return (
    <Image
      style={{height: 30, width: 90.75}}
      source={require('@pokechallenge/assets/images/navbar.png')}
    />
  );
};

export const NavBarLogout = () => {
  const navigation = useNavigation();
  return (
    <IconButton
      icon="logout"
      color={color.black[0]}
      onPress={() => navigation.navigate('Login')}
    />
  );
};
