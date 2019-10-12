import React from 'react';
import { StyleSheet, View, Text,  ScrollView } from 'react-native';
import firebase from 'firebase';
import HeaderComponent from '../components/HeaderComponent.js';
import { Input } from 'react-native-elements';
import LandScapeCat from '../components/LandScapeCat';

/**
 * This component is responsible for garden design.
 */
export default class GardenDesign extends React.Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this); //Binding the onpress method.
    this.state.userData = this.props.navigation.getParam('userData', ''); //Getting user data from parent component.
  }
  state = {
    plant: {},
    postalCode: '3145',
    userData: []
  }
  /**
   * This method updates the selected design.
   * @param {*} design 
   */
  onPress(design) {
    selectedDesign = design;
  }
  /**
   * This method gets the details from the selected design
   * @param {*} designType: The selected design type. 
   */
  getDesignDetails(designType) {
    var postCode=0;
    var okflag=false;
    try { //Postcode Validation
      postCode=Number(this.state.postalCode);
    } catch (error) {
      alert('Please enter valid Postcode')
    }
    if (4000 >postCode && postCode>2999){ //Check for victorian postcode.
      okflag=true
    }
    if (okflag) { //If everything is correct get data from firebase.
      var that = this;
      firebase.database().ref('/').orderByChild('Postcode').equalTo(this.state.postalCode).on('value', function (snapshot) {
        postCodeSnapshot = snapshot.val();
        var DesignObj = snapshot.val();
        for (var item in DesignObj) {
          var designData = DesignObj[item];
          DesignObj = designData['Design'];
          that.props.navigation.navigate('DesignDetails', {   //Go to design details and pass the design type and details and user's data.
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
  /**
   * Render the Garden design component.
   */
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

//Stytles for Garden Design
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
