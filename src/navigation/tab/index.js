import {Groups, Clone} from '@pokechallenge/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '@pokechallenge/styles';
import {RegionScreen} from '@pokechallenge/navigation/stack';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    if (route.name === 'Region') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === 'Groups') {
      iconName = focused ? 'apps' : 'apps-outline';
    } else if (route.name === 'Clone') {
      iconName = focused ? 'copy' : 'copy-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: color.red[0],
  inactiveTintColor: color.gray[2],
};

export const RegionTab = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName="Region">
      <Tab.Screen name="Region" component={RegionScreen} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Clone" component={Clone} />
    </Tab.Navigator>
  );
};

export const GroupsTab = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName="Groups">
      <Tab.Screen name="Region" component={RegionScreen} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Clone" component={Clone} />
    </Tab.Navigator>
  );
};

export const CloneTab = () => {
  return (
    <Tab.Navigator
      screenOptions={screenOptions}
      tabBarOptions={tabBarOptions}
      initialRouteName="Clone">
      <Tab.Screen name="Region" component={RegionScreen} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="Clone" component={Clone} />
    </Tab.Navigator>
  );
};
