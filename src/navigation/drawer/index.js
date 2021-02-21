import {NavBarLogo, NavBarLogout} from '@pokechallenge/components/atoms';
import {CloneTab, GroupsTab, RegionTab} from '@pokechallenge/navigation/tab';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Login} from '@pokechallenge/screens';
import * as React from 'react';
import {NavBarAvatar} from '../../components/atoms';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitle: () => <NavBarLogo />,
  headerRight: () => <NavBarAvatar />,
};

export const RegionScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Region">
      <Drawer.Screen
        name="Region"
        component={RegionTab}
        options={screenOptions}
      />
      <Drawer.Screen
        name="Groups"
        component={GroupsTab}
        options={screenOptions}
      />
      <Drawer.Screen
        name="Clone"
        component={CloneTab}
        options={screenOptions}
      />
      <Drawer.Screen
        name="Logout"
        component={Login}
        options={{...screenOptions, headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
