import React from 'react';
import firebase from 'firebase';
import {StyleSheet, Text,TouchableOpacity,Picker,View} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class SettingsScreen extends React.Component  {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */

  constructor(props) {
    super(props);

  }
  state = {
    selectedIndex: 0,
    planttype: 'Select one',
    soiltype:'Select one',
    planttypeMasterList:['Select one','Trees and Shrubs','Aquatic and Riparian Zone Plants','Bulbs and Lilies','Climbers','Grasses','Groundcover'
    ,'Rushes and Sedges'],
    soiltypeMasterList:['Sand','Loam','Clay','Limestone'],
    location:false
}
  updateIndex = (selectedIndex) => this.setState({ selectedIndex })


componentWillMount(){
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

    updateplanttype= (planttype) => {
      this.setState({ planttype: planttype })
    }

    readFromDatabase= () => {
    var soiltype=this.state.soiltypeMasterList[this.state.selectedIndex]
    if (soiltype.includes('Sand')) {
      soiltype='Sa'
    } else if (soiltype=='Loam') {
      soiltype='Lo'
    }
    else if (soiltype=='Clay') {
      soiltype='Cl'
    }
    else if (soiltype=='Limestone') {
      soiltype='Li'
    }

    if(this.state.planttype=='Select one'|| soiltype=='Select one'){
      alert('Please select option')
    }
    else{

      var that=this;
      var listofTrees=[];
      var passedList=[];
      var counter=0;
      var pType=this.state.planttype

      firebase.database().ref('/').orderByChild('Type').equalTo(pType).on('value', function (snapshot)
       {
        listofTrees =snapshot.val();
        if (snapshot.numChildren()>0) {
          for(var k in listofTrees){
            var element = listofTrees[k];
            if(element['Soiltexture'].includes(soiltype)){
               passedList.push(element)
               counter=counter+1
               if (counter>4) {
                 break;
               }
            }
          }
          if (counter>0) {
            that.props.navigation.navigate('LinksScreen', {
            plants: passedList
            });
          }else {
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
    location=await Location.reverseGeocodeAsync(location.coords);
    this.setState({ location });
  };

    addToDatabase() {
    var email='Checkin'
    firebase.database().ref('/').push({
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
      var index=this.state.selectedIndex;
      const buttons = this.state.soiltypeMasterList;
      return (
        <View style={styles.container}>
          <View style={{marginBottom:20}}>
            <Text style={styles.titleText}>Plant Type</Text>
            <Picker selectedValue = {this.state.planttype} onValueChange = {this.updateplanttype}>
               {plantypeitems}
            </Picker>
            </View>
            <Text style={styles.titleText}>Soil Type</Text>
            <ButtonGroup onPress={this.updateIndex} selectedIndex={index}
          buttons={buttons} containerStyle={{height: 50}} selectedButtonStyle={{backgroundColor:'#0d9b60'}}/>
            <TouchableOpacity style={styles.button}
              onPress={this.readFromDatabase}>
              <Text style={styles.titleText}>Show me!</Text>
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
    alignContent:'center',
    backgroundColor: '#DDDDDD',
    alignSelf:'center',
    padding: 10,
    position:'absolute',
    bottom:1,
    marginBottom:160,
    height:50,
    borderRadius:15,
    width:200
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor: '#fff'
  }
});


