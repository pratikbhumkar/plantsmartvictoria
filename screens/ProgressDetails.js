import React from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import { Card, Button } from 'react-native-elements'
import Gallery from '../components/Gallery'
import { View, AsyncStorage, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from "react-native";
import { inject, observer } from 'mobx-react';
import ProgressTracker from './ProgressTracker.js';
import { toJS } from 'mobx';
import UserPlants from '../model/UserPlants';
const { height, width } = Dimensions.get('window');


class ProgressDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state.botanicalName = this.props.navigation.getParam('botanicalName', '');
    this.state.commonName = this.props.navigation.getParam('commonName', '');
    this.state.url = this.props.navigation.getParam('url', '');

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.splittingArray()
      });
    this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.storeItem('userData', UserPlants.getPlants())
      });
  }
  splittingArray() {
    var item = UserPlants.getPlant(this.state.botanicalName);
    if (item !== null) {
      this.setState({
        plantImageArray: item.plantImage
      })
    }
  }
  state = {
    plantImageArray: [],
    botanicalName: '',
    commonName: '',
    url: ''
  }
  async storeItem(key, item) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log(error.message);
    }
  }
  render() {
    var imageArray = this.state.plantImageArray.slice(0);
    imageArray.push([this.state.url, 'Original'])
    console.log('This is array==', imageArray)

    var imageUrl = this.state.url;
    if (this.state.plantImageArray == null) {
      return (
        <View>
          <HeaderComponent text="Progress Details" back={this.props.navigation} />
          <View>
            <View style={{ padding: 20 }} />
            <Text style={styles.contents}>There are no saved images for this plant. </Text>
            <View style={{ padding: 20 }} />
            <Button
              raised={true}
              title="Capture Image"
              style={{ height: 40, padding: 20, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ marginBottom: 100 }}>
        <View >
          <HeaderComponent text="Progress Details" back={this.props.navigation} back={this.props.navigation} />
          <ScrollView>
            <View style={{ height: null, width: null,marginBottom:200 }}>
              <View style={{ width: width, height: 300 }}>
                <Image
                  style={{
                    flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1,
                    borderColor: '#dddddd', justifyContent: 'flex-end', alignItems: 'center'
                  }}
                  source={{ uri: imageUrl }}
                >
                </Image>
                <View style={{ padding: 2 }} />
              </View>
              <ScrollView scrollEventThrottle={16} >
                <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }}>
                    <Text style={styles.contents}>{this.state.commonName.toUpperCase()}{"\n"}
                    </Text>
                  </Text>
                  <Button
                    raised={true}
                    title="Image Capture"
                    onPress={() => this.props.navigation.navigate('ProgressTracker', {
                      'botanicalName': this.state.botanicalName
                    })}
                    buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                  />
                  <Button
                    raised={true}
                    title="Mark Complete"
                    onPress={(plant) => {
                      console.log('botname sent:', this.state.botanicalName)
                      var result = UserPlants.markComplete(this.state.botanicalName, this.props.PlantStore.designSelected);
                      if (result) {
                        alert('You can claim the developer incentive!')
                      }
                    }}
                    buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#75ebb6', alignSelf: 'flex-end' }}
                  >
                    <Text>Mark Complete</Text>
                  </Button>
                  <View style={{ padding: 30 }} />
                  <View style={{ height: 130, marginTop: 20 }}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {imageArray.map((u, i) => (
                        <View key={i}>
                          <TouchableOpacity key={i} onPress={() => this.setState({ url: u[0] })} >
                            <Gallery
                              imageUri={{ uri: u[0] }}
                              date={u[1]}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default inject("PlantStore")(observer(ProgressDetails))
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    borderRadius: 10,
    //backgroundColor: '#c8cdce',
    backgroundColor: '#6ac99e',
  },
  containerStyle: {
    alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
    marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b',
  },
  contents: { fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }
});
