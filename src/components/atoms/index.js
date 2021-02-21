import {color, font} from '@pokechallenge/styles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text as RNText} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';

export const Text = ({children, style = null}) => {
  return (
    <RNText
      style={[
        {
          fontFamily: font.regular,
          color: color.gray[1],
          fontSize: 14,
          ...style,
        },
      ]}>
      {children}
    </RNText>
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

export const NavBarAvatar = () => {
  const navigation = useNavigation();

  return (
    <Avatar.Image
      style={{marginRight: 15, backgroundColor: color.white[0]}}
      size={25}
      source={{
        uri:
          'https://assets.pokemon.com/static2/_ui/img/chrome/profile-navigation/profile-nav-signup.png',
      }}
    />
  );
};
