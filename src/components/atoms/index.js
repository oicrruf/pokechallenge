import {color, font} from '@pokechallenge/styles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text as RNText} from 'react-native';
import {IconButton, Avatar} from 'react-native-paper';

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

export const NavBarAvatar = () => {
  const navigation = useNavigation();

  return (
    <Avatar.Image
      style={{marginRight: 15}}
      size={24}
      source={{
        uri:
          'https://lh3.googleusercontent.com/a-/AOh14GjyfEu9M1DWOX07QPaSsNGpvwKu7GAGdhjVWXK5Sg=s96-c',
      }}
    />
  );
};
