import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';
import MenuItem from '../components/MenuItem';

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
    // this.retrieveItem("userData");
  }
  state={
    userplants: [],
  }
  // async retrieveItem(key) {
  //   try {
  //     var retrievedItem = await AsyncStorage.getItem(key);
  //     var item = JSON.parse(retrievedItem);
  //     this.state.userplants = item;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

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
              <MenuItem itemImage={require('../assets/images/plantPickerSize.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('My Plants', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/MyPlantsSize.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => this.props.navigation.navigate('My Journal', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/WateringCanSize.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 30 }} onPress={() => this.props.navigation.navigate('Design', {
              userData: this.state.userplants
            })}>
              <MenuItem itemImage={require('../assets/images/balltree.jpg')} />
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
    paddingRight: 30
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
    paddingLeft: 39,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },


});
