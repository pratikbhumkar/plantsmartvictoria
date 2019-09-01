import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class LinksScreen extends React.Component  {
  state ={
    plants:[],
    PlantName:''
  }
  constructor(props) {
    super(props);
    this.state.plants=this.props.navigation.getParam('plants', '');
  }
render(){
 
  return (
    <ScrollView style={styles.container}>
      {
          this.state.plants.map((u, i) => {
            return (
              <Card containerStyle={{alignContent:'center',padding:2,paddingLeft:-3,paddingRight:-3,backgroundColor:'#fff',borderWidth:0.5,borderColor:'#827f7b'}} key={i}>
                <View key={i} style={{width:'100%',padding:5}}>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>{u['Commonname'].toUpperCase()}</Text>
                <Image
            source={
              __DEV__
                ? require('../assets/images/logo.jpg')
                : require('../assets/images/logo.jpg')
            }
            style={{width:'100%',height:200}} />
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Botanical Name: {u['Botanicalname'].toUpperCase()}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Height(m): {u['Height(m)']}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Rain(mm): {u['Rain(mm)']}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Spread(m): {u['Genus'].toUpperCase()}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Tube Colour: {u['Tubecolour'].toUpperCase()}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Plant Type: {u['Type'].toUpperCase()}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Soil pH: {u['SoilpH'].toUpperCase()}</Text>
                  <Text style={{fontSize:12,fontWeight:'bold'}}>Soil Texture: {u['Soiltexture'].toUpperCase()}</Text>
                </View>
              </Card>
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
    paddingTop: 5,
    backgroundColor: '#c8cdce',
  },
});
