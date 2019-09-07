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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Tabs')}>
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
    //resizeMode : 'stretch',

  },
  top: {
  height:'50%',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
},
header: {
  color: '#fff',
  fontSize: 28,
  borderColor: '#fff',
  borderWidth: 2,
  padding: 20,
  paddingLeft: 40,
  paddingRight: 40,
  textAlign: 'center',
  backgroundColor: 'transparent',
},
menuContainer: {
  height: '35%',
  paddingLeft: 30,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: 'transparent',

  shadowColor: 'rgba(0,0,0, .4)',
  shadowOffset: { height: 2, width: 2 },
  shadowOpacity: 2,
  shadowRadius: 4,
},


});
