import React, {Component}   from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight
} from "react-native";

class LandscapeCat extends Component{
    render(){
        return(
            
            <View style={styles.product}>
            <View style={styles.imageContainer}>
              <TouchableOpacity activeOpacity={.5} onPress={this.props.transfer}>
              <Image style={styles.image} source={this.props.imageUri} /></TouchableOpacity>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.description}>{this.props.description1}</Text>
              <Text style={styles.description}>{this.props.description2}</Text>
            </View>
          </View>
        );

    }
}
const styles = StyleSheet.create({
    product: {
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 5,
      borderRadius: 10,
      backgroundColor: 'white',
      height: 300,
      margin: 20
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    details: {
      alignItems: 'center',
      height: '15%',
      padding: 10
    },
    title: {
      fontSize: 15,
      marginVertical: 4
    },
    description: {
      fontSize: 12,
      color: '#888'
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '25%',
      paddingHorizontal: 20
    }
  });
export default LandscapeCat;