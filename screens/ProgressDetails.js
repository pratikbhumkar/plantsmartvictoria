import React from 'react';
import HeaderComponent from '../components/HeaderComponent.js';
import { Card, Button } from 'react-native-elements'
import Gallery from '../components/Gallery'


import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Image,
  ScrollView
} from "react-native";

const { height, width } = Dimensions.get('window')

export default class ProgressDetails extends React.Component {
  constructor(props) {
    super(props)
    //Dhanu replace sample with the botanical name. use plantImageArray as it will have images.
    this.state.botanicalName = this.props.navigation.getParam('botanicalName', '');
    this.state.commonName = this.props.navigation.getParam('commonName', '');
    this.state.url = this.props.navigation.getParam('url', '');

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.retrieveItem(this.state.botanicalName)
      });

  }


  splittingArray(item) {
    var newArray = [];
    var newObj = {};

    console.log('this is some item', item);

    item = item[this.state.botanicalName];

    item.forEach(element => {

      console.log('this is one element : ', element[0])
      newObj = { "url": element[0], "date": element[1] };
      newArray.push(newObj);

    });

    console.log("Something New Array", newArray);

    this.state.plantImageArray = newArray;

  }


  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);


      this.splittingArray(item);

      this.setState({
        plantImageArray: this.state.plantImageArray
      })
      return item;
    } catch (error) {
      console.log(error.message);
    }
  }
  state = {
    plantImageArray: [],
    botanicalName: '',
    commonName: '',
    url: ''
  }



  render() {
    var imageUrl = this.state.url;
    console.log('**************************$$$$$$$$$$$$$$$$$$$$$$$')
    console.log('plant array', this.state.plantImageArray);

    if (this.state.plantImageArray == null) {

      return (

        <View>

          <HeaderComponent text="Progress Details" back={this.props.navigation} back={this.props.navigation} />

          <View>

            <View style={{ padding: 20 }} />

            <Text style={styles.contents}>There are no saved images for this plant. </Text>

            <View style={{ padding: 20 }} />
            <Button
              raised={true}
              title="Capture Image"
              onPress={() => this.props.navigation.navigate('ProgressTracker', {
                'botanicalName': this.state.botanicalName
              })}
              buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
            />


          </View>


        </View>




      );






    }

    return (
      <View >
        <View>
          <HeaderComponent text="Progress Details" back={this.props.navigation} back={this.props.navigation} />

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
            <View style={{ padding: 30 }} />
            <View style={{ height: 130, marginTop: 20 }}>

              <ScrollView

                horizontal={true}
                showsHorizontalScrollIndicator={false}>


                {this.state.plantImageArray.map((u, i) => (

                  <View key={i}>

                    <Gallery
                      imageUri={{ uri: u['url'] }}
                      date={u['date']}

                    />
                  </View>

                ))}



              </ScrollView>

            </View>


          </View>
        </ScrollView>

      </View>

    );
  }
}

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
