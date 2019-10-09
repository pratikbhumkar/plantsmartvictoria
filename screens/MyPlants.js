import React from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Platform, ToastAndroid } from 'react-native';
import { Card, Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import UserPlants from '../model/UserPlants';
import { inject, observer } from 'mobx-react';


class MyPlants extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        var plantArray = [];
        UserPlants.plantsArray.map((plant, i) => {
          if (i != 0) {
            plantArray.push(plant);
          }
          this.setState({
            userplants: plantArray
          })
        })
      });
  }

  state = {
    plants: [],
    plantObject: '',
    userplants: []
  }

  render() {
    if (this.state.userplants.length > 0) {
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
                    <Button
                      raised={true}
                      title="Progress Tracker"
                      onPress={() => this.props.navigation.navigate('ProgressDetails', { 'botanicalName': plant['botanicalName'], 'commonName': plant['commonName'], 'url': plant['url'] })}
                      buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                    />
                    <View style={{ height: 10 }} />

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

export default inject("PlantStore")(observer(MyPlants))
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
