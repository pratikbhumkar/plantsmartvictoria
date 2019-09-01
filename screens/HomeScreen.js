import React from 'react';
import { Image,  Platform,  ScrollView, StyleSheet, Text,TouchableOpacity, View} from 'react-native';

export default class HomeScreen extends  React.Component{
  render() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/logo.jpeg')
                : require('../assets/images/logo.jpeg')
            }
            style={styles.welcomeImage}
          />
        <TouchableOpacity
        style={styles.button}
          onPress={() => this.props.navigation.navigate('SettingsScreen')}>
            <Text style={styles.titleText}>Plant Picker</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
    
}
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#DDDDDD',
    alignSelf:'center',
    padding: 10,
    
    marginTop:100,
    height:50,
    borderRadius:15,
    width:200
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    margin: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    alignContent:'center',
    alignSelf:'center'
  },
  welcomeImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 10,
  },

 
  
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  }
 
});
