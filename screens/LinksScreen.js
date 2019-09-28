import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ToastAndroid, AsyncStorage, Platform, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default class LinksScreen extends React.Component {
  state = {
    plants: [],
    PlantName: '',
    userplants: [],
  }
  constructor(props) {
    super(props);
    this.state.plants = this.props.navigation.getParam('plants', '');

    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.retrieveItem("userData");
      });

    this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.loadItems("userData");
      });
  }
  async retrieveItem(key) {
    try {
      var retrievedItem = await AsyncStorage.getItem(key);
      var item = JSON.parse(retrievedItem);
      this.state.userplants = item;
    } catch (error) {
      console.log(error.message);
    }
  }

  addToMyPlants(u) {
    var uploadFlag = true;
    var userplantsArray = this.state.userplants;
    if (userplantsArray === null) {       //This fix is for new devices using app and no data in app storage so cant store in empty array.
      userplantsArray = [];
    }
    const date = new Date();
    var addDate = date.toISOString().split('T')[0];
    u.addDate = addDate;
    userplantsArray.forEach(element => {
      if (element['Botanicalname'] == u['Botanicalname']) {
        uploadFlag = false;
      }
    });
    if (uploadFlag) {
      if (Platform.OS === 'ios') {
        alert('Plant added to my plants');
      }
      else {
        ToastAndroid.show('Plant added to my plants', ToastAndroid.LONG);
      }
      userplantsArray.push(u);
      this.storeItem("userData", userplantsArray);
    }
    else {
      if (Platform.OS === 'ios') {
        alert('Plant already added to my plants');
      }
      else {
        ToastAndroid.show('Plant already added to my plants', ToastAndroid.LONG);
      }
    }


  }
  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {

    return (
      <ScrollView style={styles.container}>
        {
          this.state.plants.map((u, i) => {
            return (
              <Card containerStyle={styles.containerStyle} key={i} >

                <View key={i} style={{ width: '100%', padding: 5 }}>

                  <TouchableOpacity key={i}
                    onPress={() => {
                      this.props.navigation.navigate('PlantStack', {
                        plant: u
                      });
                    }}>
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }}>{u['Commonname'].toUpperCase()}</Text>

                      <Image
                        source={{ uri: u['url'] }}
                        style={{ width: '100%', height: 250 }} />
                    </View>
                  </TouchableOpacity>

                  <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', margin: 15 }}>
                    <Button
                      raised={true}
                      title="Add"
                      onPress={() => this.addToMyPlants(u)}
                      buttonStyle={{ height: 40, width: 80, borderRadius: 20, backgroundColor: '#6ac99e' }}
                    />

                  </View>
                </View>
              </Card>
            );
          })
        }


      </ScrollView>
    );
  }
  timeToString(time) {
    try {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    } catch (error) {

    }

  }
  async loadItems() {
    // setTimeout(() => {
    var day = new Date().valueOf();
    var items = {};
    for (let i = 0; i < 30; i++) {
      var time = day + i * 24 * 60 * 60 * 1000;
      var strTime = this.timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
        // console.log(this.state.userplants);
        if (this.state.userplants !== null) {
          var numItems = this.state.userplants.length;
          for (let j = 0; j < numItems; j++) {
            var item = this.state.userplants[j];
            var itemRain = Number(item['Rain(mm)']);
            if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
              this.state.items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 60
              });

            } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
              items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 60
              });
            } else if (itemRain > 400) {
              items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 60
              });
            }
            else if([1, 15].includes(i)){
              items[strTime].push({
                name: 'Fertilize ' + this.state.userplants[j].Commonname,
                height: 60
              });
              
            }
            else if([1].includes(i)){
              items[strTime].push({
                name: 'Prune ' + this.state.userplants[j].Commonname,
                height: 60
              });
            }
          }
        }
      }
    }
    const newItems = {};

    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    this.storeItem("CalendarItems", newItems);
    // }, 1000);
  }

}
LinksScreen.navigationOptions = {
  title: 'Recommendations',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,

    //backgroundColor: '#c8cdce',
    backgroundColor: '#6ac99e',


  },
  containerStyle: {
    alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
    marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b'
  },
  contents: { fontSize: 12, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }
});
