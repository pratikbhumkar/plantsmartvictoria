import React from 'react';
import { Platform,Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyPlants from '../screens/MyPlants.js';
import MyJournal from '../screens/MyJournal.js';
import PlantData from '../screens/PlantData.js';



MyJournal.navigationOptions = {
  tabBarLabel: 'My Journal',
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


const PlantStack = createStackNavigator(
  {
    'Plant Data':PlantData
  },
  {
    headerMode: 'none',
    title: 'Plant Data'
  },

);
PlantStack.navigationOptions = {
  tabBarLabel: 'Plant Data',
  gesturesEnabled: true,
  tabBarVisible:false
};

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
    PlantStack:PlantStack,

  },

);

LinksStack.navigationOptions = {
  backgroundColor:'#6ac99e',
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
    LinksScreen: LinksScreen,
    PlantStack:PlantStack
  },
  {
    headerMode:"none"
  }
);
SettingsStack.navigationOptions = {
  tabBarLabel: 'Plant Picker',
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


const tabNavigator = createBottomTabNavigator({
  'Plant Picker':SettingsStack,
  'My Plants':MyPlants,
  'My Journal':MyJournal,
},{
  tabBarOptions: {
    labelStyle:{
      fontSize:13
    },
  }
}
);
tabNavigator.navigationOptions


const HomeStack = createStackNavigator(
  {
    HomeScreen:HomeScreen,
    MyPlants:MyPlants,
    MyJournal:MyJournal,
    Tabs: tabNavigator
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      backgroundColor:'#6ac99e'


    }
   }
  );



export default HomeStack;
