import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';
import MenuItem from '../components/MenuItem';
import firebase from 'firebase';

@observer
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    console.disableYellowBox=true;
    var plantArray=[];
          UserPlants.plantsArray.map((plant, i) => {
            if(i!=0){
              plantArray.push(plant);
            }
            this.setState({
              userplants:plantArray
            })
          })
          if (!firebase.apps.length) {
            firebase.initializeApp({
              apiKey: "AIzaSyC61gmfLxxRwQVigtqphSdwDPCDBeRtS_g",
              authDomain: "plantsmartvictoria.firebaseapp.com",
              databaseURL: "https://plantsmartvictoria.firebaseio.com",
              projectId: "plantsmartvictoria",
              storageBucket: "plantsmartvictoria.appspot.com",
              messagingSenderId: "723453194803",
              appId: "1:723453194803:web:9bd33978fafce44d"
            });
          }
        }
  state={
    userplants: [],
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/balltree.jpg')}
        style={styles.container}>
        <View style={styles.overlayContainer}>
          <View style={styles.top}>
            <Text style={styles.header}>
              P L A N T  S M A R T{"\n"}
              V I C T O R I A
            </Text>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Tabs', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/picker-black.png')} text="Picker"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Plants', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/myplants-black.png')} text="Plants"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Journal', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/journal-black.png')} text="Journal"/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Design', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/design-black.png')} text="Design"/>
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
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

  },
  items: {
    width:'25%'

  },

  overlayContainer: {
    flex: 1,


  },
  top: {
    height: '50%',
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
    // paddingLeft: ,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },


});
