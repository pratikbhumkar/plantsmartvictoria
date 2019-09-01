import React from 'react';
import { ImageBackground, Image,  Platform,  ScrollView, StyleSheet, Text,TouchableOpacity, View} from 'react-native';

import MenuItem from '../components/MenuItem';

export default class HomeScreen extends  React.Component{
  render() {
  return (
    <ImageBackground
      source={require('../assets/images/balltree.jpg')}
      style={styles.container}>

      <View style = {styles.overlayContainer}>
        <View style ={styles.top}>
            <Text style={styles.header}>
            P L A N T  S M A R T{"\n"}
               V I C T O R I A
            </Text>
        </View>

        <View style = {styles.menuContainer}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SettingsScreen')}>
        <MenuItem itemImage={require('../assets/images/plantPicker.png')}/>
        </TouchableOpacity>

        </View>
        </View>

        </ImageBackground>

         );

       }
     }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(47,163,218, .4)',
  },
  top: {
  height:'50%',
  alignItems: 'center',
  justifyContent: 'center',
},
header: {
  color: '#fff',
  fontSize: 28,
  borderColor: '#fff',
  borderWidth: 2,
  padding: 20,
  paddingLeft: 40,
  paddingRight: 40,
  //backgroundColor: 'rgba(255,255,255, .1)',
  textAlign: 'center',
},
menuContainer: {
  height: '35%',
  paddingLeft: 30,
  flexDirection: 'row',
  flexWrap: 'wrap',
},


});
