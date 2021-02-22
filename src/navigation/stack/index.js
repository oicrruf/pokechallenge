import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register} from '@pokechallenge/screens';
import {RegionScreen} from '@pokechallenge/navigation/drawer';
import {font} from '@pokechallenge/styles';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

export const LoginScreen = (props) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Region" component={RegionScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const RegisterScreen = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          title: null,
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: font.regular,
          },
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
