import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image  } from 'react-native';
import { Card } from 'react-native-elements'

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
              <Card containerStyle={styles.containerStyle} key={i}>
                <View key={i} style={{width:'100%',padding:5}}>
                  <Text style={{fontSize:20,fontWeight:'bold',borderBottomWidth:0.5,borderBottomColor:'#000'}}>{u['Commonname'].toUpperCase()}</Text>
                <Image
            source={
              __DEV__
                ? require('../assets/images/logo.jpg')
                : require('../assets/images/logo.jpg')
            }
            style={{width:'100%',height:200}} />
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
  containerStyle:{alignContent:'center',padding:2,paddingLeft:-3,paddingRight:-3,marginBottom:10,
  marginTop:-3,backgroundColor:'#fff',borderWidth:0.5,borderColor:'#827f7b'},
  contents:{fontSize:12,fontWeight:'bold',borderBottomWidth:0.5,borderBottomColor:'#000'}
});
