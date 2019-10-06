import React from 'react';
import {  StyleSheet, Text, TouchableOpacity, View, AsyncStorage ,CameraRoll} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class ProgressTracker extends React.Component {
  constructor(props){
    super(props);
    //Dhanu remove this when you pass plantBotanicalName
    this.state.plantBotanicalName = this.props.navigation.getParam('botanicalName','');
    console.log('*********************************************')
    console.log('botanica', this.state.plantBotanicalName)

  }

  state = {
    hasCameraPermission: null,
    newPhotos:false,
    statusCamera:false,
    statusCameraStorage:false,
    plantBotanicalName:'',
    plantImageArray:[]
  };
  async componentWillMount(){
    this.state.plantBotanicalName = this.props.navigation.getParam('botanicalName', '');
    // dhanu replace sample to plant botanical name whereever you find sample replace botanical name.
    this.retrieveItem(this.state.plantBotanicalName);
  }
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({
        plantImageArray:item[this.state.plantBotanicalName]
      })
      // console.log('retrieved from tracker',item)
      return item;
    } catch (error) {
      console.log(error.message);
    }
  }
   async componentDidMount() {
    this.state.statusCamera= await Permissions.askAsync(Permissions.CAMERA);
    this.state.statusCameraStorage = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  takePicture = () => {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  };
  onPictureSaved = async photo => {
    try {
      await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
  } catch (error) {
      //Print the error
      console.log(error);
  }
  CameraRoll.getPhotos({
    groupTypes:'All',
    first: 1,
    assetType: 'Photos',
  })
  .then(r => {
    var plantDict={};
    var plantArray=[];
    if(this.state.plantImageArray!== undefined  && this.state.plantImageArray!== null){
      plantArray=this.state.plantImageArray;
    }
    const date = new Date();
    var today = date.toISOString().split('T')[0];
    plantArray.push([r.edges[0].node.image.uri,today])
    plantDict[this.state.plantBotanicalName]=plantArray;
    console.log('item saved',plantDict)
    this.storeItem(this.state.plantBotanicalName,plantDict)
  })
}
async storeItem(key, item) {
  try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    this.props.navigation.pop();
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
}
  render() {
    return (
      <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={'back'}
        ref={ref => { this.camera = ref; }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          
          <TouchableOpacity
          onPress={this.takePicture}
          style={{
            flex: 1,
            margin:100,
            padding:20,
            borderWidth:0.5,
            borderRadius:10,
            backgroundColor:'#fff',
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, color: 'black'}}>Take Picture</Text>
        </TouchableOpacity>
        </View>
        
      </Camera>
    </View>

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
