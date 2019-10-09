import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Recommendations from '../screens/Recommendations';
import PlantPicker from '../screens/PlantPicker';
import MyPlants from '../screens/MyPlants.js';
import MyJournal from '../screens/MyJournal.js';
import PlantData from '../screens/PlantData.js';
import GardenDesign from '../screens/GardenDesign.js';
import DesignDetails from '../screens/DesignDetails.js';
import ProgressTracker from '../screens/ProgressTracker.js';
import ProgressDetails from '../screens/ProgressDetails';
import DataVisualisation from '../screens/DataVisualisation.js';






MyJournal.navigationOptions = {
  tabBarLabel: 'My Journal',
  gesturesEnabled: true,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `${focused ? 'md-wallet' : 'md-wallet'}`
          : 'md-wallet'
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
          ? `${focused ? 'md-information-circle' : 'md-information-circle'}`
          : 'md-information-circle'
      }
    />
  ),
};



// GardenDesign.navigationOptions = {
//   tabBarLabel: 'Garden Design',
//   gesturesEnabled: true,
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `${focused ? 'md-albums' : 'md-albums'}`
//           : 'md-albums'
//       }
//     />
//   ),
// };



const PlantStack = createStackNavigator(
  {
    'Plant Data': PlantData
  },
  {
    headerMode: 'none',
    title: 'Plant Data'
  },
);

PlantStack.navigationOptions = {
  tabBarLabel: 'Plant Data',
  gesturesEnabled: true,
  tabBarVisible: false
};

const LinksStack = createStackNavigator(
  {
    Recommendations: Recommendations,
    PlantStack:PlantStack,
  },

);

LinksStack.navigationOptions = {
  backgroundColor: '#6ac99e',
  tabBarLabel: 'Links',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const DesignStack = createStackNavigator(
  {
    'GardenDesign': GardenDesign,
    'DesignDetails':DesignDetails
  },
  {
    headerMode: "none"
  }
);

DesignStack.navigationOptions = {
  backgroundColor: '#6ac99e',
  tabBarLabel: 'Garden Design',
  // tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-link' : 'md-link'} />
  ),
};

const SettingsStack = createStackNavigator(
  {
    PlantPicker: PlantPicker,
    Recommendations: Recommendations,
    PlantStack:PlantStack
  },
  {
    headerMode: "none"
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
          ? `ios-rose${focused ? '' : ''}`
          : 'ios-rose'
      }
    />
  ),
};


const tabNavigator = createBottomTabNavigator({
  'Plant Picker': SettingsStack,
  'Design': DesignStack,
  'My Plants': MyPlants,
  'My Journal': MyJournal,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 13
    },
  }
}
);
tabNavigator.navigationOptions


const HomeStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    MyPlants: MyPlants,
    ProgressTracker: ProgressTracker,
    MyJournal: MyJournal,
    Tabs: tabNavigator,
    GardenDesign: GardenDesign,
    DesignDetails: DesignDetails,
    ProgressDetails: ProgressDetails,
    DataVisualisation: DataVisualisation

  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
      backgroundColor: '#6ac99e'
    }
   }
  );

export default HomeStack;
