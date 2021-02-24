import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register} from '@pokechallenge/screens';
import {font} from '@pokechallenge/styles';
import {Region, Locations, Groups, Clone} from '@pokechallenge/screens';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

export const LoginScreen = (props) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const RegionScreen = (props) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Region" component={Region} />
      <Stack.Screen name="Locations" component={Locations} />
      {/* <Stack.Screen name="Areas" component={Areas} /> */}
    </Stack.Navigator>
  );
};

// export const LocationsScreen = (props) => {
//   return (
//     <Stack.Navigator screenOptions={screenOptionStyle}>
//       <Stack.Screen name="Locations" component={Locations} />
//     </Stack.Navigator>
//   );
// };

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
