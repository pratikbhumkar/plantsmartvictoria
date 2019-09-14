import React from 'react';
import {
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
        </View>
      );
    }


}

const styles = StyleSheet.create(
  {
    menuItem: {
      width: '33.333333%',
      height: '50%',
      padding: 20,
      backgroundColor: 'transparent',

    },
    image: {
      padding: 40,
      width:'100%',
      height:'100%',
      opacity: 0.7,
      borderColor: '#fff',
      borderWidth: 1,
      backgroundColor: '#ffc966',


    }
  });
