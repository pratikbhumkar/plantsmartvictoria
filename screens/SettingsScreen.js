import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, TouchableOpacity, Picker, View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  constructor(props) {
    super(props);

  }
  state = {
    planttype: 'Select one',
    planttypeMasterList: ['Select one', 'Trees and Shrubs', 'Aquatic and Riparian Zone Plants', 'Bulbs and Lilies', 'Climbers', 'Grasses', 'Groundcover'
      , 'Rushes and Sedges'],
    location: false,
    postalCode: '3145',
    errorMessage: ''
  }
  updateIndex = (selectedIndex) => this.setState({ selectedIndex })


  componentWillMount() {
    console.disableYellowBox = true;
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
    this._getLocationAsync();
  }

  updateplanttype = (planttype) => {
    this.setState({ planttype: planttype })
  }

  readFromDatabase = () => {
    var postcode = this.state.postalCode
    if (this.state.planttype == 'Select one') {
      alert('Please select option')
    }
    else {

      var that = this;
      var listofTrees = [];
      var passedList = [];
      var counter = 0;
      var pType = this.state.planttype;

      firebase.database().ref('/').orderByChild('Type').equalTo(pType).on('value', function (snapshot) {
        listofTrees = snapshot.val();
        if (snapshot.numChildren() > 0) {
          for (var k in listofTrees) {
            var element = listofTrees[k];
            if (element['Postcode'].includes(postcode)) {
              passedList.push(element)
              counter = counter + 1
              if (counter > 9) {
                break;
              }
            }
          }
          if (counter > 0) {
            that.props.navigation.navigate('LinksScreen', {
              plants: passedList
            });
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
      <View style={styles.container}>

        <Input
          label="Post Code"
          placeholder='Post code'
          value={this.state.postalCode}
          errorStyle={{ color: 'red' }}
          onChangeText={postalCode => this.setState({ postalCode })}
          errorMessage={this.state.errorMessage}
          inputContainerStyle={{ width: '50%' }}
        />
        <Text style={styles.titleText}>Plant Type</Text>
        <Picker selectedValue={this.state.planttype} onValueChange={this.updateplanttype}>
          {plantypeitems}
        </Picker>
        <TouchableOpacity style={styles.button}
          onPress={this.readFromDatabase}>
          <Text style={styles.titleText}>Show me!</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 10,

  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',

  },

  searchText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  postcodeLocator: {
    paddingTop: 10,
    padding: 20,
  },

  button: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#DDDDDD',
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 1,
    marginBottom: 160,
    height: 50,
    borderRadius: 15,
    width: 200
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  }
});
