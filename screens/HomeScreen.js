import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, AsyncStorage,Linking } from 'react-native';
import { inject, observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';
import MenuItem from '../components/MenuItem';
import firebase from 'firebase';
/**
 * This class represents the homescreen component. It contains the links to other pages.
 */
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    console.disableYellowBox = true; //Disabling verion prompts
    var plantArray = [];
    UserPlants.plantsArray.map((plant, i) => { //Setting up the plants for passing them on to next components
      if (i != 0) {
        plantArray.push(plant);
      }
      this.setState({     //Setting to component state
        userplants: plantArray
      })
    })
    if (!firebase.apps.length) {    //Initializing firebase.
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
    this.retrieveItem('userData') //Getting data from local storage.
  }
  state = {
    userplants: [],
  }
  /**
   * This method retrives data from local storage.
   * @param {*} key : The key against which the data is stored
   */
  async retrieveItem(key) {
    try {
      var retrievedItem = await AsyncStorage.getItem(key);
      var item = JSON.parse(retrievedItem); //Converting to Json
      if (item) {
        item.forEach(element => {
          UserPlants.addPlant(element)
        });
        this.props.PlantStore.loadItems(item);    //Loading the calendar items
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  /**
   * This method renders the homescreen contents.
   */
  render() {
    return (
      <ImageBackground
        source={require('../assets/images/balltree.jpg')}
        style={styles.container}>
          {/* Setting the background image*/}
        <View style={styles.overlayContainer}>
          <View style={styles.top}>

            <Text style={styles.header}>
              P L A N T  S M A R T{"\n"}
              V I C T O R I A
            </Text>
          </View>
          {/* Container for the menu consisting of buttons to screens. */}
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Tabs', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/picker-white.png')} text="Picker" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Plants', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/myplants-white.png')} text="Plants" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Journal', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/journal-white.png')} text="Journal" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Design', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/design-white.png')} text="Design" />
            </TouchableOpacity>

          </View>
          
        </View>
        <Text style={{bottom:50,borderWidth:1,borderColor:'#fff',color:'#fff',fontSize:25}} onPress={ ()=> Linking.openURL('https://vicsmartp.sgedu.site') } >Click here to visit our website.</Text>
      </ImageBackground>

    );

  }
}
export default inject("PlantStore")(observer(HomeScreen))   //Injecting mobx store to component.

//Stylesheet for Homescreen. 
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
    width: '25%'
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
});
