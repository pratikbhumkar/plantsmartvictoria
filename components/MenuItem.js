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
      padding: 10,
      backgroundColor: 'transparent',

    },
    image: {
      width:90,
      height:90,
      opacity: 0.7,
      borderColor: '#F5B041',
      borderWidth: 3,
      backgroundColor: '#ffc966',


    }
  });
