import React from 'react';
import { ImageBackground, Image,  Platform,AsyncStorage,  ScrollView, StyleSheet, Text,TouchableOpacity, View} from 'react-native';


export default class MyPlants extends  React.Component{
    constructor(props){
        super(props)

    }
    state={
        plants:[],

    }
    componentWillMount(){
        var userData = AsyncStorage.getItem("userData");
        try {
            userData= JSON.parse(userData);
            this.setState({
                plants:userData
            });
          } catch (error) {
            
          }
         
    }
  render() {
    if(this.state.plants.length>0){
    
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
              onPress={this.addToMyPlants}
              buttonStyle={{height:30,width:80,borderRadius:20}}
            />
            </View>
              </View>
            </Card>
          );
        })
    }

  </ScrollView>
  )}
  else{
    return (
        <View><Text>No Plants, add some</Text></View>
    ) 
  }
}
}
MyPlants.navigationOptions = {
    title: 'My Plants',
    gesturesEnabled: true
  };