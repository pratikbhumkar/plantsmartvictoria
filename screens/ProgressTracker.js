import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, AsyncStorage ,CameraRoll} from 'react-native';
import { Camera,Constants } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import MenuItem from '../components/MenuItem';

export default class ProgressTracker extends React.Component {
  state = {
    hasCameraPermission: null,
    newPhotos:false,
    statusCamera:false,
    statusCameraStorage:false
  };

   async componentDidMount() {
    this.state.statusCamera= await Permissions.askAsync(Permissions.CAMERA);
    this.state.statusCameraStorage = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  takePicture = () => {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  };
  onPictureSaved = async photo => {
    console.log(photo.uri)
    try {
      await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
  } catch (error) {
      //Print the error
      console.log(error);
  }
  CameraRoll.getPhotos({
    first: 1,
    assetType: 'Photos',
  })
  .then(r => {
    console.log('pic',r.edges[0].node.image.uri)
  })
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
