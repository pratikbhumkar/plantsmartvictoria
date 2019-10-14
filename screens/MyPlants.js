import React from 'react';
import { ScrollView, StyleSheet, Image, View, Text, StatusBar, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import UserPlants from '../model/UserPlants';
import { inject, observer } from 'mobx-react';

/**
 * This component shows user's plant's data.
 */
class MyPlants extends React.Component {
  constructor(props) {
    super(props)
    //store users plants to local array on screen gaining focus every time.
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        var plantArray = [];
        plantArray = UserPlants.getPlants()
        this.setState({
          userplants: plantArray
        })

      });
    this.props.navigation.addListener(      //On leaving the page the user's data to be stored in local memory.
      'willBlur',
      payload => {
        this.storeItem('userData', this.state.userplants)
      });
  }
  /**
    * This method stores data to user's local memory.
    * @param {*} key : Key used to store the data.
    * @param {*} item : Item to be stored
    */
  async storeItem(key, item) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.log(error.message);
    }
  }
  state = {
    plants: [],
    plantObject: '',
    userplants: []
  }
  /**
   * This method marks a plant as complete and adds a tick
   * @param {*} plant 
   */
  completeTick(plant) {
    if(plant.PlantComplete=='1')
    return (
      <View style={{ height: 30, marginTop: 5, width: 30, alignSelf: 'flex-end' }}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require('../assets/images/tick.png')}
        />
      </View>
    )
  }
  /**
 * Rendering the My Plants component.
 */
  render() {
    if (this.state.userplants.length > 0) {   //Checck if plants exist for user and show appropriate message.
      return (
        <View style={{ height: '100%', width: '100%' }}>
          <HeaderComponent text="My Plants" back={this.props.navigation} />
          <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#6ac99e' barStyle='light-content' />
            {
              this.state.userplants.map((plant, i) => {
                return (
                  <Card style={styles.container}
                    image={{ uri: plant.url }}
                    imageStyle={{ width: '100%', height: 400 }}
                    title={plant.commonName.toUpperCase()}
                    titleStyle={{ alignSelf: 'flex-start', paddingLeft: 10, paddingBottom: -5 }}
                    key={i}
                    containerStyle={{ borderRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginBottom: 10 }}>

                    <Text style={styles.contents}>Botanical Name: {plant.botanicalName.toUpperCase()}</Text>
                    <Text style={styles.contents}>Height(m): {plant.height}</Text>
                    <Text style={styles.contents}>Rain(mm): {plant.rain}</Text>
                    <View>
                      <Button
                        raised={true}
                        title="Progress Tracker"
                        onPress={() => this.props.navigation.navigate('ProgressDetails', { 'botanicalName': plant['botanicalName'], 'commonName': plant['commonName'], 'url': plant['url'] })}
                        buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#75ebb6', alignSelf: 'flex-end' }}
                      />
                    </View>
                    <View style={{ marginTop: 30 }}>
                      <Button
                        raised={true}
                        title="Remove Plant"
                        onPress={() => {
                          UserPlants.removePlant(plant.botanicalName);
                          var plantArray = [];
                          plantArray = UserPlants.getPlants()
                          this.setState({
                            userplants: plantArray
                          })
                        }}
                        buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#75ebb6', alignSelf: 'flex-end' }}
                      />
                    </View>
                        {this.completeTick(plant)}
                  </Card>
                );
              })
            }
          </ScrollView>
        </View>
      )
    }
    else {
      return (
        <View>
          <HeaderComponent text="My Plants" back={this.props.navigation} />
          <Text>No Plants, add some</Text>
        </View>
      )
    }

  }
}

export default inject("PlantStore")(observer(MyPlants)) //Injecting the plantstore for data storage and retrieval
//Style details for Plant data page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  containerStyle: {
    alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
    marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b',
  },
  contents: { fontSize: 15, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#fff', marginBottom: 3 }
});
