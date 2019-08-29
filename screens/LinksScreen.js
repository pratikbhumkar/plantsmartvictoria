import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

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
