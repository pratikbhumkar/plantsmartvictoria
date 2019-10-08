import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ToastAndroid, AsyncStorage, Platform, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import LandScapeCat from '../components/LandScapeCat';
import { observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';
import Journal from '../model/JournalEntry';

@observer
export default class Recommendations extends React.Component {
  state = {
    plants: [],
    PlantName: '',
    userplants: [],
  }
  constructor(props) {
    super(props);
    this.state.plants = this.props.navigation.getParam('plants', '');

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
    const date = new Date();
    var addDate = date.toISOString().split('T')[0];

    UserPlants.addPlant({
      commonName: u.Commonname, botanicalName: u.Botanicalname, rain: String(u.Rain)
      , spread: String(u.Spread), height: String(u.Height), addDate: addDate, url: u.url
    })
    alert('Plant added to my plants');
    UserPlants.plantsArray.map((plant, i) => {
      this.state.userplants.push(plant)
    });
    // console.log('plants::',this.state.userplants)
    this.loadItems()
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
    console.log(this.state.userplants)
    // setTimeout(() => {
    var day = new Date().valueOf();
    var items = {};
    for (let i = 0; i < 30; i++) {
      var time = day + i * 24 * 60 * 60 * 1000;
      var strTime = this.timeToString(time);

      if (!items[strTime]) {
        items[strTime] = [];
        if (this.state.userplants !== null) {
          var numItems = this.state.userplants.length;
          for (let j = 0; j < numItems; j++) {
            var item = this.state.userplants[j];
            var itemRain = Number(item['rain']);
            if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
              items[strTime].push({
                name: 'Water ' + this.state.userplants[j].commonName,
                height: 60
              });

            } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
              items[strTime].push({
                name: 'Water ' + this.state.userplants[j].commonName,
                height: 60
              });
            } else if (itemRain > 400) {
              items[strTime].push({
                name: 'Water ' + this.state.userplants[j].commonName,
                height: 60
              });
            }
            else if ([1, 15].includes(i)) {
              items[strTime].push({
                name: 'Fertilize ' + this.state.userplants[j].commonName,
                height: 60
              });

            }
            else if ([1].includes(i)) {
              items[strTime].push({
                name: 'Prune ' + this.state.userplants[j].commonName,
                height: 60
              });
            }
          }
        }
      }
    }
    const newItems = {};

    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    console.log('Calendar items:', newItems);
    // this.storeItem("CalendarItems", newItems);
  }
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <HeaderComponent text="Recommendations" back={this.props.navigation} />
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
      </View>
    );
  }
}


Recommendations.navigationOptions = {
  title: 'Recommendations',
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    paddingTop: 2,
    backgroundColor: '#fff',
  },
  containerStyle: {
    alignContent: 'center', padding: 2, marginBottom: 10,
    marginTop: 5, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  contents: { fontSize: 12, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' },
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  title: {
    fontSize: 15,
    marginVertical: 4
  },
  description: {
    fontSize: 12,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  }
});
