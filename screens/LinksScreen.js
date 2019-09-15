import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, ToastAndroid, AsyncStorage } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    return
  }

  addToMyPlants(u) {
    ToastAndroid.show('Added to my plants, Swipe left to view!', ToastAndroid.LONG);
    var userplantsArray = this.state.userplants;
    if (typeof userplantsArray !== null) {
      userplantsArray = [];
    }
    const date = new Date();
    var addDate = date.toISOString().split('T')[0];
    u.addDate = addDate;
    userplantsArray.push(u);
    this.storeItem("userData", userplantsArray);
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
              <TouchableOpacity key={i}
                onPress={() => {
                  this.props.navigation.navigate('PlantStack', {
                    plant: u
                  });
                }}
              >
                <Card containerStyle={styles.containerStyle} key={i} >
                  <View key={i} style={{ width: '100%', padding: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }}>{u['Commonname'].toUpperCase()}</Text>
                    <Image
                      source={{ uri: u['url'] }}
                      style={{ width: '100%', height: 250 }} />

                    <View style={{ alignContent: 'flex-end', alignItems: 'flex-end', margin: 15 }}>
                      <Button
                        raised={true}
                        title="Add"
                        onPress={() => this.addToMyPlants(u)}
                        buttonStyle={{ height: 30, width: 80, borderRadius: 20 }}
                      />
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>

            );
          })
        }

      </ScrollView>
    );
  }
}
LinksScreen.navigationOptions = {
  title: 'Recommendations',

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,

    backgroundColor: '#c8cdce',
  },
  containerStyle: {
    alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
    marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b'
  },
  contents: { fontSize: 12, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }
});
