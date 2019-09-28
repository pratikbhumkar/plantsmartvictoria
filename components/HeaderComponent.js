import React from 'react';
import { View,Image } from 'react-native';
import {Header } from 'react-native-elements';

export default function HeaderComponent(props) {
  return (
    <Header
          leftComponent={ <View style={{display:'flex'}}><Image 
            style={{width: 90, height: '100%',display:'flex'}}
            source={require('../assets/images/logoboxed.png')}
          /></View>}
          centerComponent={{text:'Plant Picker',style:{fontSize:28,color:'#ffff'}}}
          containerStyle={{
            backgroundColor: '#75ebb6',
            height:'10%',
            justifyContent: 'space-around',
          }}
        />
  );
}

