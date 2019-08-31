import React from 'react';
import firebase from 'firebase';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Picker,
  View,
} from 'react-native';

export default class SettingsScreen extends React.Component  {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  constructor(props) {
    super(props);
  }
  state = {
    planttype: '',
    soiltype:'',
    soilph:'',
    frost:'',
    planttypeMasterList:['Shrub','Groundcover','Climbers','Sedges'],
    soiltypeMasterList:['Sand','Loam','Clay','Limestone'],
    soilPhMasterList:['Acidic','Alkaline','Neutral'],
    climateMasterList:['Resistent','Moderate','Sensitive']
}
componentDidMount(){
  var ref= firebase.database().ref('react-fire-6c362/');
  ref.on('child_added',function (data) {
    ref.on("value", function(snapshot) {
      // console.log(snapshot.val());
      alert(snapshot.val())
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      alert('failed')
    });
  })
}
componentWillMount(){
  firebase.initializeApp({
    apiKey: "AIzaSyCvYnr2_slCbph-ZG3AHKdv7sqi-CqtZh4",
    authDomain: "react-fire-6c362.firebaseapp.com",
    databaseURL: "https://react-fire-6c362.firebaseio.com",
    projectId: "react-fire-6c362",
    storageBucket: "",
    messagingSenderId: "183735561443",
    appId: "1:183735561443:web:8a729e37c85daacf"
  });
}
    updateplanttype= (planttype) => {
      this.setState({ planttype: planttype })
    }
    updateplanttype= (soiltype) => {
      this.setState({ soiltype: soiltype })
    }
    updateplanttype= (soilph) => {
      this.setState({ soilph: soilph })
    }
    updateplanttype= (frost) => {
      this.setState({ frost: frost })
    }
   
    readFromDatabase= (Color) => {
    firebase.database().ref('react-fire-6c362/').limitToFirst(5)
    .on('value', function (snapshot) {
      console.log(snapshot.val());
    });
    }
    handleHelpPress() {
    this.props.navigation.navigate('LinksScreen', {
          itemId: 'BS',
        });
    }

    addToDatabase() {
    var email='Checkin'
    firebase.database().ref('react-fire-6c362/').push({
      email
    }).then((data)=>{
    console.log("Added")
    }).catch((error)=>{
    console.log("Error",error)
    })
  }
    render(){
      let plantypeitems = this.state.planttypeMasterList.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
      });
      let soiltypeitems = this.state.soiltypeMasterList.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
      });
      let climateitems = this.state.climateMasterList.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
      });
      let soilPhitems = this.state.soilPhMasterList.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
      });
      return (
        <View style={styles.container}>
            <Text>Plant Type</Text>
            <Picker selectedValue = {this.state.planttype} onValueChange = {this.updateplanttype}>
               {plantypeitems}
            </Picker>
            <Text>Soil Type</Text>
            <Picker selectedValue = {this.state.soiltype} onValueChange = {this.updateColor}>
               {soiltypeitems}
            </Picker>
            <Text>Soil PH</Text>
            <Picker selectedValue = {this.state.soilph} onValueChange = {this.updateColor}>
               {soilPhitems}
            </Picker>
            <Text>Level of tolerence</Text>
            <Picker selectedValue = {this.state.frost} onValueChange = {this.updateColor}>
               {climateitems}
            </Picker>
            <TouchableOpacity
            style={styles.button}
            // onPress={() => this.props.navigation.navigate('SettingsScreen')}>
            onPress={this.readFromDatabase}>
              <Text >Plant Picker</Text>
        </TouchableOpacity>
        </View>
      );
    }
}
const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height:80,
    width:150
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

SettingsScreen.navigationOptions = {
  title: 'Plant Picker',
};  