import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, TouchableOpacity, Picker, View, ImageBackground, StatusBar } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import HeaderComponent from '../components/HeaderComponent.js';

/**
 * This component is responsible for picker form.
 */
export default class PlantPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    planttype: 'Select one',
    planttypeMasterList: ['Select one', 'Trees and Shrubs', 'Climbers', 'Grasses', 'Groundcover'
      , 'Rushes and Sedges'],   //A master list for controlling the plant types.
    location: false,
    postalCode: '3145',
    errorMessage: ''
  }
  updateIndex = (selectedIndex) => this.setState({ selectedIndex })  //Update the picked index.

  componentWillMount() {
    console.disableYellowBox = true;
    
    this._getLocationAsync();   //Getting the location access for postcode details
  }
/**
 * Setting the current plant type
 */
  updateplanttype = (planttype) => {
    this.setState({ planttype: planttype })
  }

/**
 * Reading data from firebase realtime database.
 */
  readFromDatabase = () => {
    var postcode = this.state.postalCode
    var okFlag=false;
    try {
      if(2999<Number(this.state.postalCode) && 4000>Number(this.state.postalCode)){   //Postcode verification and error-handling. 
        okFlag=true;
      }
      else{
        alert('Please enter a valid Victorian Postcode! from else')
      }
    } catch (error) {
      alert('Please enter a valid Victorian Postcode! from error')
    }
    if (this.state.planttype == 'Select one' && okFlag) {
      alert('Please select option')
    }
    else {
      var that = this;
      var plantTypeDict = {       //Dictionary to convert plant shortforms stored in database.
        "Trees and Shrubs": "TS", 'Groundcover': 'GC', 'Climbers': "CL", 'Grasses': "GS",
        'Rushes and Sedges': 'RAS'
      };
      var pType = this.state.planttype;
      //Getting data from firebase.
      firebase.database().ref('/').orderByChild('Postcode').equalTo(postcode).on('value', function (snapshot) {
        var DesignObj = snapshot.val();
        if (snapshot.numChildren() > 0) {      //Checking if the plant type has plants in it
          for (var item in DesignObj) {
            var designData = DesignObj[item];
            DesignObj = designData['Design'];
          }
          pType = plantTypeDict[pType];
          var plantsAdvanceDesign = DesignObj['Advance'];
          plants = plantsAdvanceDesign[pType]
          if (typeof plants !== 'undefined') { //Checking if the data exists
            if (plants.length > 0) {  //if yes then show recommendation page, passing plants.
              that.props.navigation.navigate('Recommendations', {
                plants: plants
              });
            }
          } else {    //Else show error message.
            alert('No Data found!, Please try other options')
          }
        }
      });
    }
  }
  /**
   * This method gets the data from user's location and converts to postcode data.
   */
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    location = await Location.reverseGeocodeAsync(location.coords);
    this.setState({
      location: location,
      postalCode: location[0].postalCode
    });

  };

/**
 * This method renders Picker form components
 */
  render() {

    let plantypeitems = this.state.planttypeMasterList.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    return (
      <ImageBackground
        source={require('../assets/images/backgroundset1.png')} style={{ width: '100%', height: '100%' }}>
        <HeaderComponent text="Picker" back={this.props.navigation} back={this.props.navigation} />
        <StatusBar backgroundColor="#75ebb6" barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.titleText}>Post Code</Text>
          <Input
            placeholder='Postcode'
            value={this.state.postalCode}
            errorStyle={{ color: 'red' }}
            onChangeText={postalCode => this.setState({ postalCode })}
            errorMessage={this.state.errorMessage}
            inputContainerStyle={{ width: '18%' }}
          />
          <Text style={styles.titleText}>Plant Type</Text>
          <Picker selectedValue={this.state.planttype} onValueChange={this.updateplanttype}>
            {plantypeitems}
          </Picker>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DataVisualisation')} style={{ marginTop: 50, flex: 0.1 }}>
            <Text style={{ textDecorationLine: 'underline' }}>Tell me a bit more about my area!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={this.readFromDatabase}>
            <Text style={styles.searchText}>GO!</Text>
          </TouchableOpacity>
          <View>

          </View>
        </View>

      </ImageBackground>
    );
  }
}

//Styling data for picker
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 90,
    backgroundColor: '#edf9ec',
    marginBottom: 20,
    fontSize: 20,
    borderColor: '#c1cbc0',
    borderWidth: 1,
    alignContent: 'center',
    marginTop: 10
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 20,
    color: '#7d7b7a'
  },

  searchText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    color: 'black'
  },
  postcodeLocator: {
    paddingTop: 10,
    padding: 20,
  },

  button: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    bottom: 1,
    marginTop: 70,
    height: 100,
    borderRadius: 120,
    width: 100,
    fontSize: 20,
    borderWidth: 0.1,
    borderColor: 'black'
  },
  container: {
    flex: 1,
    padding: 20
  }
});
