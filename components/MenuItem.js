import React from 'react';
import {Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class MenuItem extends React.Component{
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

const styles = StyleSheet.create(
  {
    menuItem: {
      marginTop:180,
      padding: 5,
      borderColor:'#fff',
      borderWidth:2,
      backgroundColor: 'transparent',
      
    },
    image: {
      width:60,
      height:60,
      opacity: 1,
      // borderColor: '#F5B041',
      borderWidth: 3,
      // backgroundColor: '#ffc966',


    }
  });
