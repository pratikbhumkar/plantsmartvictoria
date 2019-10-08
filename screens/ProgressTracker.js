import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage, CameraRoll } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class ProgressTracker extends React.Component {
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
    this.retrieveItem(this.state.plantBotanicalName);
  }
  async retrieveItem(key) {
    var picuri=''
    try {
      var retrievedItem = await AsyncStorage.getItem(key);
      if (retrievedItem == null) {
        this.state.plantImageArray = []
    }else {
      var item = JSON.parse(retrievedItem);
      this.state.plantImageArray = item[this.state.plantBotanicalName]
    }
   } catch (error) {
      throw (error.message);
    }
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
      var picuri=photo.uri;
      picuri=picuri.substring( picuri.lastIndexOf('/'),);
      picuri='file:///storage/emulated/0/DCIM'+picuri
      const date = new Date();
      var today = date.toISOString().split('T')[0];
      plantArray.push([picuri,today])
      plantDict[this.state.plantBotanicalName] = plantArray;
      this.storeItem(this.state.plantBotanicalName, plantDict)
    } catch (error) {
      console.log (error);
    }
  }
  async storeItem(key, item) {
    try {
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
