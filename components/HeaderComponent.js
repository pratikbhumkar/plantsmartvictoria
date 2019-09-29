import React from 'react';
import { View,Image } from 'react-native';
import {Header,Button } from 'react-native-elements';

export default function HeaderComponent(props) {
  return (
    <Header
          leftComponent={ <View style={{display:'flex'}}><Image 
            style={{width: 50, height: 50,display:'flex',padding:5}}
            source={require('../assets/images/logoboxed.png')}
          /></View>}
          centerComponent={{text:props.text,style:{fontSize:22,color:'#ffff'}}}
          rightComponent={
            <Button
            title="Back"
            type="clear"
            onPress={() => props.back.pop()}
            titleStyle={{color:'#fff'}}
          />}
          containerStyle={{
            backgroundColor: '#75ebb6',
            height:100,
            justifyContent: 'space-around',
          }}
          statusBarProps={{ translucent: true}
            }
        />
  );
}

