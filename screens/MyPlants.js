import React from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, AsyncStorage, StatusBar, Platform, ToastAndroid } from 'react-native';
import { Card, Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
export default class MyPlants extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.retrieveItem('userData');
      });
    this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.loadItems("userData");
      });
  }
  state = {
    plants: [],
    userplants: []
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
          }
        }
      }
    }
    const newItems = {};

    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    this.storeItem("CalendarItems", newItems);
    // }, 1000);
  }
  removePlant(plant) {
    var CurrentPlants = this.state.userplants;
    Alert.alert(
      'Remove Plant',
      'You have decided to remove ' + plant['Commonname'] + ', are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => { console.log(CurrentPlants.length) },
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            var i = 0;

            CurrentPlants.forEach(element => {
              if (element['Botanicalname'] == plant['Botanicalname']) {
                var indexToDel = CurrentPlants.indexOf(plant)
                CurrentPlants.splice(indexToDel, 1);
                this.setState({
                  plants: CurrentPlants,
                  userplants: CurrentPlants
                });
                this.storeItem("userData", CurrentPlants);
                if (Platform.OS === 'ios') {
                  alert('Plant removed from my plants');
                }
                else {
                  ToastAndroid.show('Plant removed from my plants', ToastAndroid.LONG);
                }
              }
            });

          }
        },
      ],
      { cancelable: false },
    );
  }
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({
        userplants: item
      })
      return item;
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    if (this.state.userplants !== undefined) {
      if (this.state.userplants !== null) {
        return (
          <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#6ac99e' barStyle='light-content' />
            <HeaderComponent text="My Plants" back={this.props.navigation}/>
            {

              this.state.userplants.map((u, i) => {
                return (
                  <Card style={styles.container}
                    image={{ uri: u['url'] }}
                    imageStyle={{ width: '100%', height: 400 }}
                    title={u['Commonname'].toUpperCase()}
                    titleStyle={{ alignSelf: 'flex-start', paddingLeft: 10, paddingBottom: -5 }}
                    key={i}
                    containerStyle={{ borderRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginBottom: 10 }}>

                    <Text style={styles.contents}>Botanical Name: {u['Botanicalname'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Height(m): {u['Height(m)']}</Text>
                    <Text style={styles.contents}>Rain(mm): {u['Rain(mm)']}</Text>
                    <Text style={styles.contents}>Genus: {u['Genus'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Spread(m): {u['Spread(m)'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Tube Colour: {u['Tubecolour'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Plant Type: {u['Type'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Soil pH: {u['SoilpH'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Soil Texture: {u['Soiltexture'].toUpperCase()}</Text>
                    <Button
                      raised={true}
                      title="Remove"
                      onPress={() => this.removePlant(u)}
                      buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                    />
                  </Card>
                );
              })
            }
          </ScrollView>
        )
      }
    }
    return (
      <View><Text>No Plants, add some</Text></View>
    )
  }
}
// MyPlants.navigationOptions = {
//   title: 'My Plants',
//   gesturesEnabled: true
// };
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
  contents: { fontSize: 15, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#fff', marginBottom: 3 }
});
