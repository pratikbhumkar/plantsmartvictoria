import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import firebase from 'firebase';
import HeaderComponent from '../components/HeaderComponent.js';
//import Input from '../components/Input';
import { Input } from 'react-native-elements';
import LandScapeCat from '../components/LandScapeCat';

export default class GardenDesign extends React.Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this);
    this.state.userData = this.props.navigation.getParam('userData', '');
  }
  state = {
    plant: {},
    postalCode: '3145',
    userData: []
  }
  onPress(design) {
    selectedDesign = design;
  }
  getDesignDetails(designType) {
    var postCode=Number(this.state.postalCode);
    if (4000 >postCode && postCode>2999) {
      var that = this;
      firebase.database().ref('/').orderByChild('Postcode').equalTo(this.state.postalCode).on('value', function (snapshot) {
        postCodeSnapshot = snapshot.val();
        var DesignObj = snapshot.val();
        for (var item in DesignObj) {
          var bject = DesignObj[item];
          DesignObj = bject['Design'];
          that.props.navigation.navigate('DesignDetails', {
            DesignObj: DesignObj[designType],
            userData: that.state.userData,
            DesignName:designType
          })
        }
      });
    } else {
      alert('Please enter Postal Code, This will help us get your soil type and Soil Ph getting best plants for you!')
    }
  }
  render() {
    var u = this.state.plant;
    return (
      <View>
        <HeaderComponent text="Garden Design" back={this.props.navigation} />
        <ScrollView>
          <View style={styles.action}>
            <Text style={styles.title}>Location</Text>
            </View>
          <Input
            placeholder='Postcode'
            value={this.state.postalCode}
            errorStyle={{ color: 'red' }}
            onChangeText={postalCode => this.setState({ postalCode })}
            errorMessage={this.state.errorMessage}
            inputContainerStyle={{ width: '18%' ,marginLeft:20}}
            style={{paddingLeft:20}}
          />
          
          <Text style={styles.title}>Garden Design</Text>

          <LandScapeCat
            imageUri={require('../assets/images/basic3.png')}
            title="Basic landscaping"
            extraInfoLevel1={true}
            description3="20 Groundcovers / 5 Shrubs / Grass / 1 Tree"
            description4="Meet your developer's landscaping guidelines"
            transfer={() => {
              this.getDesignDetails('Basic')
            }}
          />
          <LandScapeCat
            imageUri={require('../assets/images/moderate3.png')}
            title="Moderate Landscaping"
            extraInfoLevel1={true}
            description3="30 Groundcover / 10 Shrubs / 5 climbers / Grass / 1 tree"
            description4="Recommended for 10 -12m garden"
            transfer={() => {
              this.getDesignDetails('Moderate')
            }}
          />

          <LandScapeCat
            imageUri={require('../assets/images/advance3.png')}
            title="Advanced Landscaping"
            extraInfoLevel1={true}
            description3="40 Groundcovers / 15 Shrubs / 10 Climbers / 1 Grass / 3 Trees"
            description4="Recommended for 12.5m - 18m garden"
            transfer={() => {
              this.getDesignDetails('Advance')
            }}
          />
          <View style={{margin:100}}></View>
        </ScrollView>

      </View>

    );

  }
}


const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    paddingLeft:20,
    paddingVertical: 5,
    color: 'green',
    paddingTop: 10
  }
});
