import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image  } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default class LinksScreen extends React.Component  {
  state ={
    itemid:'',
    PlantName:''
  }
  constructor(props) {
    super(props);
    this.state.itemid=this.props.itemid;
  }
render(){
  return (
    <ScrollView style={styles.container}>
     <Card
  title='Acmena Allyn Magic'>
  <Text style={{marginBottom: 10}}>
      Dwarf lilly pilly variety, ideal for small gardens, low hedges and mass plantings. Only 50cm around, ideal low maintenance shrub or container plant, with lovely dark pink new growth after clipping.
  </Text>
</Card>
    </ScrollView>
  );
}
}
LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
