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
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: "AIzaSyC61gmfLxxRwQVigtqphSdwDPCDBeRtS_g",
            authDomain: "plantsmartvictoria.firebaseapp.com",
            databaseURL: "https://plantsmartvictoria.firebaseio.com",
            projectId: "plantsmartvictoria",
            storageBucket: "plantsmartvictoria.appspot.com",
            messagingSenderId: "723453194803",
            appId: "1:723453194803:web:9bd33978fafce44d"
          });
        }
        this.state.userData=this.props.navigation.getParam('userData', '');
    } 
    state = {
        plant: {},
        postalCode: '3145',
        userData:[]
    }
    onPress(design) {
        selectedDesign = design;
      }
    getDesignDetails(designType){
      var that=this;
      firebase.database().ref('/').orderByChild('Postcode').equalTo(this.state.postalCode).on('value', function (snapshot)
        {
          postCodeSnapshot = snapshot.val();
          var DesignObj=snapshot.val();
          for(var item in DesignObj){
            var bject=DesignObj[item];
            DesignObj=bject['Design'];
            console.log('designType',DesignObj);
            
            that.props.navigation.navigate('DesignDetails',{
              DesignObj:DesignObj[designType],
              userData:that.state.userData
            })
          }
        });
    }
    render(){
        var u=this.state.plant;
        return(
            <View>
                <HeaderComponent text="Garden Design" back={this.props.navigation}/>
                <ScrollView>
                <View style ={styles.action}>
                <Text style={styles.title}>1. My Garden Location</Text>
                </View>
                <Input
                placeholder='Postcode'
                value={this.state.postalCode}
                errorStyle={{ color: 'red' }}
                onChangeText={postalCode => this.setState({ postalCode })}
                errorMessage={this.state.errorMessage}
                inputContainerStyle={{ width: '18%' }}
              />
                <Text style={styles.title}>2. Select a Model below</Text>

                <LandScapeCat 
                    imageUri={require('../assets/images/basic3.png')}
                    title="Basic landscaping - Developer Guidelines"
                    description1="20 Groundcovers / 5 Shrubs / Grass / 1 Tree"
                    description2="Meet your developer's landscaping guidelines"
                    transfer = {() => {
                      this.getDesignDetails('Basic')
                    }}
                />
                <LandScapeCat 
                    imageUri={require('../assets/images/moderate3.png')}
                    title="Moderate Landscaping"
                    description1="30 Groundcover / 10 Shrubs / 5 climbers / Grass / 1 tree"
                    description2="Recommended for 10 -12m garden"
                    transfer = {() => {
                      this.getDesignDetails('Moderate')
                    }}
                />

                <LandScapeCat 
                    imageUri={require('../assets/images/advance3.png')}
                    title="Advanced Landscaping"
                    description1="40 Groundcovers / 15 Shrubs / 10 Climbers / 1 Grass / 3 Trees"
                    description2="Recommended for 12.5m - 18m garden"
                    transfer = {() => {
                      this.getDesignDetails('Advance')
                    }}
                />

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
      paddingTop:20,
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
    action:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
  
    },
    title:{
        fontSize: 20,
        paddingVertical:5,
        color:'green',
        paddingTop:10
    }
  });
