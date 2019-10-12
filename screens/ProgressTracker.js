import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage, CameraRoll, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import UserPlants from '../model/UserPlants';

class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state.plantBotanicalName = this.props.navigation.getParam('botanicalName', '');
  }

  state = {
    hasCameraPermission: null,
    newPhotos: false,
    statusCamera: false,
    statusCameraStorage: false,
    plantBotanicalName: '',
    plantImageArray: []
  };
  componentWillMount() {
    this.state.plantBotanicalName = this.props.navigation.getParam('botanicalName', '');
  }

  componentDidMount() {
    this.state.statusCamera = Permissions.askAsync(Permissions.CAMERA);
    this.state.statusCameraStorage = Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  takePicture = () => {
    this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  };
  onPictureSaved = photo => {
    var plantDict = {};
    var plantArray = [];
    if (this.state.plantImageArray !== undefined && this.state.plantImageArray !== null) {
      plantArray = this.state.plantImageArray;
    }
    try {
      CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      var picuri = photo.uri;
      if (Platform.OS == 'android') {
        picuri = picuri.substring(picuri.lastIndexOf('/'));
        picuri = 'file:///storage/emulated/0/DCIM' + picuri
      }
      const date = new Date();
      var today = date.toISOString().split('T')[0];
      var imagedict=toJS(this.props.PlantStore.imageDict);
      plantArray=imagedict[this.state.plantBotanicalName]
      if(plantArray==null || typeof plantArray=='undefined'){
        plantArray=[]
      }
      plantArray.push([picuri, today])
      // this.props.PlantStore.storePlantImages(this.state.plantBotanicalName, plantArray);
      console.log('to be stored ',plantArray);
      UserPlants.storeImages(this.state.plantBotanicalName,[picuri, today])
      this.props.navigation.pop();
    } catch (error) {
      console.log(error);
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
                margin: 100,
                padding: 20,
                borderWidth: 0.5,
                borderRadius: 10,
                backgroundColor: '#fff',
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 18, color: 'black' }}>Take Picture</Text>
            </TouchableOpacity>
          </View>

        </Camera>
      </View>

    );

  }
}

export default inject("PlantStore")(observer(ProgressTracker))

