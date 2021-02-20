import React from 'react';
import {Text as RNText} from 'react-native';
import {font} from '@pokechallenge/styles';

export const Text = ({children, style = null}) => {
  return (
    <RNText style={[{fontFamily: font.regular, ...style}]}>{children}</RNText>
  );
};
