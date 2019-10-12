import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, TouchableOpacity, Picker, View, ImageBackground, StatusBar } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import HeaderComponent from '../components/HeaderComponent.js';


export default class PlantPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    planttype: 'Select one',
    planttypeMasterList: ['Select one', 'Trees and Shrubs', 'Bulbs and Lilies', 'Climbers', 'Grasses', 'Groundcover'
      , 'Rushes and Sedges'],
    location: false,
    postalCode: '3145',
    errorMessage: ''
  }
  updateIndex = (selectedIndex) => this.setState({ selectedIndex })

  componentWillMount() {
    console.disableYellowBox = true;
    
    this._getLocationAsync();
  }

  updateplanttype = (planttype) => {
    this.setState({ planttype: planttype })
  }


  readFromDatabase = () => {
    var postcode = this.state.postalCode
    var okFlag=false;
    try {
      if(2999<Number(this.state.postalCode) && 4000>Number(this.state.postalCode)){
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
      var plantTypeDict = {
        "Trees and Shrubs": "TS", 'Groundcover': 'GC', 'Climbers': "CL", 'Grasses': "GS",
        'Rushes and Sedges': 'RAS'
      };
      var pType = this.state.planttype;
      firebase.database().ref('/').orderByChild('Postcode').equalTo(postcode).on('value', function (snapshot) {
        var DesignObj = snapshot.val();
        if (snapshot.numChildren() > 0) {
          for (var item in DesignObj) {
            var bject = DesignObj[item];
            DesignObj = bject['Design'];
          }
          pType = plantTypeDict[pType];
          var plantsAdvanceDesign = DesignObj['Advance'];
          plants = plantsAdvanceDesign[pType]
          if (plants !== undefined) {
            if (plants.length > 0) {
              that.props.navigation.navigate('Recommendations', {
                plants: plants
              });
            }
          } else {
            alert('No Data found!, Please try other options')
          }
        }
      });
    }
  }
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
