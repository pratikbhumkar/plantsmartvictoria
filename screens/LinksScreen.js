import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image,ToastAndroid,AsyncStorage  } from 'react-native';
import { Card,Button } from 'react-native-elements'

export default class LinksScreen extends React.Component  {
  state ={
    plants:[],
    PlantName:'',
    userplants:[],
  }
  constructor(props) {
    super(props);
    this.state.plants=this.props.navigation.getParam('plants', '');
    userData = AsyncStorage.getItem("userData");
   
  }
  componentWillMount(){
    try {
      var userData= JSON.parse(userData);
    } catch (error) {
      
    }
   
    // this.state.userplants = JSON.parse(userData);
  }
  addToMyPlants(u) {
    ToastAndroid.show('Added to my plants, Swipe left to view!', ToastAndroid.LONG);
    var userplantsArray=this.state.userplants;
    userplantsArray.push(u)
  }
  componentWillUnmount(){
    AsyncStorage.setItem("userData", JSON.stringify(this.state.userplants));
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
            <View style={{alignContent:'flex-end',alignItems:'flex-end',margin:15}}>
            <Button
                raised={true}
                title="Add"
                onPress={(u)=>this.addToMyPlants(u)}
                buttonStyle={{height:30,width:80,borderRadius:20}}
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
