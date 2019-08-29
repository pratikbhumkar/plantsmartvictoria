import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Picker,
  View,
} from 'react-native';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component  {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  constructor(props) {
    super(props);
    this.handleHelpPress=this.handleHelpPress.bind(this);
  }
  state = {
    planttype: '',
    Color:''
}
   updateplanttype= (planttype) => {
      this.setState({ planttype: planttype })
   }
   updateColor= (Color) => {
    this.setState({ Color: Color })
 }
  handleHelpPress() {
  if (this.state.Color=='B'&& this.state.planttype=='Shrub') {
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'BS',
    });
  } else if(this.state.Color=='G'&& this.state.planttype=='Shrub'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'GS',
    });
  }
  else if(this.state.Color=='G'&& this.state.planttype=='Tree'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'GT',
    });
  }
  else if(this.state.Color=='B'&& this.state.planttype=='Tree'){
    this.props.navigation.navigate('LinksScreen', {
      itemId: 'BT',
    });
  }
}
    render(){
      
      return (
        <View>
            <Text>Plant Type</Text>
            <Picker selectedValue = {this.state.planttype} onValueChange = {this.updateplanttype}>
               <Picker.Item label = "Shrub" value = "Shrub" />
               <Picker.Item label = "Tree" value = "Tree" />
            </Picker>
            <Text>Color</Text>
            <Picker selectedValue = {this.state.Color} onValueChange = {this.updateColor}>
               <Picker.Item label = "Black" value = "B" />
               <Picker.Item label = "Green" value = "G" />
            </Picker>
            <Button  onPress={this.handleHelpPress}   title="Plant Picker"
                  color="#808080"
                  width='100px'
                  height='400px'/>
        </View>
      );
    }
}

SettingsScreen.navigationOptions = {
  title: 'Plant Picker',
};