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
import { ExpoConfigView } from '@expo/samples';

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
    Color:''
}
componentDidMount(){
  firebase.database().ref('react-fire-6c362/').on('child_added',function (data) {
    console.log('from read,did mount',data);
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
   updateColor= (Color) => {
    this.setState({ Color: Color })
 }
 readFromDatabase= (Color) => {
  firebase.database().ref('react-fire-6c362/').once('value', function (snapshot) {
    console.log(snapshot.val())
  });
}
  handleHelpPress() {
   
 
    this.props.navigation.navigate('LinksScreen', {
          itemId: 'BS',
        });
   
  this.props.navigation.navigate('LinksScreen')
  if (this.state.Color=='B'&& this.state.planttype=='Shrub') {
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'BS',
    });
  } else if(this.state.Color=='G'&& this.state.planttype=='Shrub'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'GS',
    });
  }
  else if(this.state.Color=='G'&& this.state.planttype=='Tree'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'GT',
    });
  }
  else if(this.state.Color=='B'&& this.state.planttype=='Tree'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'BT',
    });
  }
}

addToDatabase() {
  
  var email='Checkin'
  firebase.database().ref('react-fire-6c362/').set({
    email
}).then((data)=>{
    //success callback
}).catch((error)=>{
})
    }
    render(){
      
      return (
        <View style={styles.container}>
            <Text>Plant Type</Text>
            <Picker selectedValue = {this.state.planttype} onValueChange = {this.updateplanttype}>
               <Picker.Item label = "Shrub" value = "Shrub" />
               <Picker.Item label = "Tree" value = "Tree" />
            </Picker>
            <Text>Color</Text>
            <Picker selectedValue = {this.state.Color} onValueChange = {this.updateColor}>
               <Picker.Item label = "Black" value = "B" />
               <Picker.Item label = "Green" value = "G" />
            </Picker>
            <TouchableOpacity
        style={styles.button}
          // onPress={() => this.props.navigation.navigate('SettingsScreen')}>
          onPress={this.addToDatabase}>
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