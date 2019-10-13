import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, AsyncStorage, CameraRoll, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import UserPlants from '../model/UserPlants';
/**
 * This component is reponsible for captuing the image to keep track of the plant.
 */
class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    //Setting data retrieved from parent page.
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

  //Getting the permission from user for Camera and camera storage once the component is mounted.
 async componentDidMount() {
    this.setState({
      statusCamera: await Permissions.askAsync(Permissions.CAMERA),
      statusCameraStorage: await Permissions.askAsync(Permissions.CAMERA_ROLL),
      statusAudioStorage:await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    })
  }
  /**
   * This method is reponsible for taking the pictures.
   */
  takePicture = () => {
    this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
  };
/**
 * This method is called on picture is saved.
 */
  onPictureSaved = photo => {
    var plantArray = [];
    //Checking if data exists.
    if (this.state.plantImageArray !== undefined && this.state.plantImageArray !== null) {
      plantArray = this.state.plantImageArray;
    }
    try {
      CameraRoll.saveToCameraRoll(photo.uri, 'photo');  //Saving data to storage.
      var picuri = photo.uri;
      if (Platform.OS == 'android') { //On android get the image name from image uri, IOS natively provides it.
        picuri = picuri.substring(picuri.lastIndexOf('/'));
        picuri = 'file:///storage/emulated/0/DCIM' + picuri
      }
      //Date for the date required for the image.
      const date = new Date();
      var today = date.toISOString().split('T')[0];
      var imagedict = toJS(this.props.PlantStore.imageDict);  
      plantArray = imagedict[this.state.plantBotanicalName]
      if (plantArray == null || typeof plantArray == 'undefined') {
        plantArray = []
      }
      //Push the clicked image to array.
      plantArray.push([picuri, today])
      //Store image in memory
      UserPlants.storeImages(this.state.plantBotanicalName, [picuri, today])
      this.props.navigation.pop(); //Go backon success
    } catch (error) {
      console.log(error);
    }
  }
  /**
 * Rendering the progress tracker component.
 */
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
              {/* Button to click picture. */}
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

export default inject("PlantStore")(observer(ProgressTracker)) //Injecting mobx store to component.

//Style details for Progress Details page.

