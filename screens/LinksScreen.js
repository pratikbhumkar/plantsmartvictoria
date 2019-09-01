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
              <Card containerStyle={{padding: 0,alignContent:'center',alignItems:'center'}} key={i}>
                <View key={i} style={{width:180,height:250}}>
                <Image
            source={
              __DEV__
                ? require('../assets/images/logo.jpg')
                : require('../assets/images/logo.jpg')
            }
            style={{width:180,height:80}} />
                  <Text>item</Text>
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
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
