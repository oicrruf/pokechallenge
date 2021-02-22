import {NavBarLogo, NavBarLogout} from '@pokechallenge/components/atoms';
import {CloneTab, GroupsTab, RegionTab} from '@pokechallenge/navigation/tab';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Login} from '@pokechallenge/screens';
import * as React from 'react';
import {NavBarAvatar} from '../../components/atoms';
import firebase from '@pokechallenge/utils';

const Drawer = createDrawerNavigator();

const Logout = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => firebase.auth().signOut()} />
    </DrawerContentScrollView>
  );
};

const screenOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitle: () => <NavBarLogo />,
  headerRight: () => <NavBarAvatar />,
};

export const RegionScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Region"
      drawerContent={(props) => <Logout {...props} />}>
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
    </Drawer.Navigator>
  );
};
