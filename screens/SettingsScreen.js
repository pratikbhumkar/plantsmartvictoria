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
    planttype: 'Select one',
    soiltype:'Select one',
    soilph:'',
    frost:'',
    planttypeMasterList:['Select one','Trees and Shrubs','Aquatic and Riparian Zone Plants','Bulbs and Lilies','Climbers','Grasses','Groundcover'
    ,'Other Strap-leaved Plants','Rushes and Sedges'],
    soiltypeMasterList:['Select one','Sand','Loam','Clay','Limestone'],
    soilPhMasterList:['Select one','Acidic','Neutral','Alkaline'],
    climateMasterList:['Select one','Resistent','Moderate','Sensitive']
}
// componentDidMount(){
//   var ref= firebase.database().ref('/plantsmartvictoria/');
//   ref.on('child_added',function (data) {
//     ref.on("value", function(snapshot) {
//       console.log(snapshot.val());
//     }, function (errorObject) {
//       console.log("The read failed: " + errorObject.code);
//       alert('failed')
//     });
//   })
// }
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
}

    updateplanttype= (planttype) => {
      this.setState({ planttype: planttype })
    }
    updatesoiltype= (soiltype) => {
      this.setState({ soiltype: soiltype })
    }
   
    readFromDatabase= () => {
    var soiltype=this.state.soiltype;
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
            that.props.navigation.navigate('LinksScreen', {
            plants: passedList
            });
        } else {
          alert('No Data found!, Please try other options')
        }
        
      });
    }
  }

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
      let soiltypeitems = this.state.soiltypeMasterList.map( (s, i) => {
        return <Picker.Item key={i} value={s} label={s} />
      });
      return (
        <View style={styles.container}>
            <Text>Plant Type</Text>
            <Picker selectedValue = {this.state.planttype} onValueChange = {this.updateplanttype}>
               {plantypeitems}
            </Picker>
            <Text>Soil Type</Text>
            <Picker selectedValue = {this.state.soiltype} onValueChange = {this.updatesoiltype}>
               {soiltypeitems}
            </Picker>
            
            <TouchableOpacity style={styles.button}
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