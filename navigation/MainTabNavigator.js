import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyPlants from '../screens/MyPlants.js';
import MyJournal from '../screens/MyJournal.js'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


MyPlants.navigationOptions = {
  tabBarLabel: 'My Plants',
  gesturesEnabled: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const topMaterialBar=createMaterialTopTabNavigator({
  'My Plants':MyPlants,
  'My Journal':MyJournal
},{
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
      fontWeight:'600',
      marginTop:50
    },
    tabStyle: {
      height:90
    },
    style: {
      backgroundColor: '#6ac99e',
    },
  }
}

);

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarVisible:false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    SettingsScreen: SettingsScreen,
    LinksScreen: LinksScreen
  },
  config
);

SettingsStack.navigationOptions = {
  gesturesEnabled: true,
  tabBarLabel: 'Plant Picker',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  Picker:SettingsStack,
  Journal:topMaterialBar
});

tabNavigator.path = 'Tabs';

const HomeStack = createStackNavigator(
  {
    HomeScreen:HomeScreen,
    Tabs: tabNavigator
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
  );

export default HomeStack;
