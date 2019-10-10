import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import PlantStore from './model/DataStore';
import {Provider} from 'mobx-react';
// import firebase from 'firebase';

export default function App(props) {
  // var firebaseConfig2 = {
  //   apiKey: "AIzaSyCCq1TmLebAJhlan-31JesZO_ACDpMJrK4",
  //   authDomain: "plantsmartvicuserdata.firebaseapp.com",
  //   databaseURL: "https://plantsmartvicuserdata.firebaseio.com",
  //   projectId: "plantsmartvicuserdata",
  //   storageBucket: "plantsmartvicuserdata.appspot.com",
  //   messagingSenderId: "980002538452",
  //   appId: "1:980002538452:web:b079e1ceda50dfb4cf0c41",
  //   measurementId: "G-VZ2RVBWY1S"
  // };
  // firebase.initializeApp(firebaseConfig2);

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider PlantStore={PlantStore}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Expo.Font.loadAsync({
      ...Ionicons.font,
      
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    width:'100%',
    backgroundColor: '#fff',
  },
});
