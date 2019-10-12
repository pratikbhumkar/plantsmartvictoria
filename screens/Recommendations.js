import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ToastAndroid, AsyncStorage, Platform, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import LandScapeCat from '../components/LandScapeCat';
import UserPlants from '../model/UserPlants';
import Journal from '../model/JournalEntry';
import { inject, observer } from 'mobx-react';

class Recommendations extends React.Component {
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
      , spread: String(u.Spread), height: String(u.Height), addDate: addDate, url: u.url,design:'null', PlantComplete:"0"
    })
    var plantArray = []
    alert('Plant added to my plants');
    UserPlants.plantsArray.map((plant, i) => {
      if (i != 0) {
        plantArray.push(plant)
      }
    });

    this.props.PlantStore.loadItems(plantArray);
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
export default inject("PlantStore")(observer(Recommendations))

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
