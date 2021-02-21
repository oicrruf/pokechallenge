import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '@pokechallenge/screens';
import {RegionScreen} from '@pokechallenge/navigation/drawer';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

export const LoginScreen = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Region" component={RegionScreen} />
    </Stack.Navigator>
  );
};
