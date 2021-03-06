import React from 'react';
import {Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
/**
 * This component displays the main menu on home screen.
 */
export default class MenuItem extends React.Component{
  /**
   * Rendering the component
   */
  render() {
    return (
        <View style={styles.menuItem}>
          <Image
            source={this.props.itemImage}
            style={styles.image} />
            <Text style={{color:'#fff'}}>{this.props.text}</Text>
        </View>
      );
    }


}
//Style for the component
const styles = StyleSheet.create(
  {
    menuItem: {
      alignContent:'center',
      alignItems:'center',
      
      margin: 5,
      borderColor:'#fff',
      borderWidth:2,
      width:70,
      height:67,
      backgroundColor: 'transparent',
    },
    image: {
      width:40,
      height:40,
      opacity: 1,
      // borderColor: '#F5B041',
      borderWidth: 3,
      // backgroundColor: '#ffc966',


    }
  });
