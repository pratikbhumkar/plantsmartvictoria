import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image,AsyncStorage,StatusBar  } from 'react-native';
import { Card,Button } from 'react-native-elements'

export default class MyPlants extends  React.Component{
    constructor(props){
        super(props)
        this.props.navigation.addListener(
          'willFocus',
          payload => {
            this.retrieveItem('userData');
          });
    }
    state={
        plants:[]
    }

    async retrieveItem(key) {
        try {
          const retrievedItem =  await AsyncStorage.getItem(key);
          const item = JSON.parse(retrievedItem);
          this.setState({
            plants:item
          })
          return item;
        } catch (error) {
          console.log(error.message);
        }
      }

  render() {
  if(this.state.plants!==undefined){
    if(this.state.plants!==null){
      return (
        <ScrollView style={styles.container}>
          <StatusBar backgroundColor='#6ac99e' barStyle='light-content' />
        {

            this.state.plants.map((u, i) => {
              return (
                <Card containerStyle={styles.containerStyle} key={i}>
                  <View key={i} style={{width:'100%',padding:5}}>
                    <Text style={{fontSize:20,fontWeight:'bold',borderBottomWidth:0.5,borderBottomColor:'#000'}}>{u['Commonname'].toUpperCase()}</Text>
                  <Image
                      source={{uri: u['url']}}
                      style={{width:'100%',height:250}} />
                  <View style={{borderTopWidth:0.5,borderTopColor:'#000'}}>
                        <Text style={styles.contents}>Botanical Name: {u['Botanicalname'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Height(m): {u['Height(m)']}</Text>
                        <Text style={styles.contents}>Rain(mm): {u['Rain(mm)']}</Text>
                        <Text style={styles.contents}>Genus: {u['Genus'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Spread(m): {u['Spread(m)'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Tube Colour: {u['Tubecolour'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Plant Type: {u['Type'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Soil pH: {u['SoilpH'].toUpperCase()}</Text>
                        <Text style={styles.contents}>Soil Texture: {u['Soiltexture'].toUpperCase()}</Text>
                  </View>
                  </View>
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
MyPlants.navigationOptions = {
    title: 'My Plants',
    gesturesEnabled: true
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 2,

      //backgroundColor: '#c8cdce',
      backgroundColor: '#6ac99e',

    },
    containerStyle:{alignContent:'center',padding:2,paddingLeft:-3,paddingRight:-3,marginBottom:10,
    marginTop:-3,backgroundColor:'#fff',borderWidth:0.5,borderColor:'#827f7b'},
    contents:{fontSize:12,fontWeight:'bold',borderBottomWidth:0.5,borderBottomColor:'#000'}
  });
