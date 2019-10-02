import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Picker } from 'react-native';
import { Card } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Input from '../components/Input';
import LandScapeCat from '../components/LandScapeCat';

export default class GardenDesign extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('plant', '');
        
    } 
    state = {
        plant: {}

    }

    render(){
        var u=this.state.plant;
        return(
            <View>
                <HeaderComponent text="Garden Design" back={this.props.navigation} back={this.props.navigation}/>
                <ScrollView>
                <View style ={styles.action}>
                <Text style={styles.title}>1. My Garden Location</Text>
                <Text>Why This?</Text>
                </View>
                <Input
                    id="postcode"
                    label=" Post-Code"
                    keyboardType= 'default'
                    required
                    minLength={4}
                    autoCapitalize="none"
                    errorText="Please enter a valid post code."
                    onInputChange={()=>{}}
                    initialValue=""
                    style ={styles.label}
                    />
                <Text style={styles.title}>2. Select a Model below</Text>

                <LandScapeCat 
                    imageUri={require('../assets/images/basic3.png')}
                    title="Basic landscaping - Developer Guidelines"
                    description1="20 Groundcovers / 5 Shrubs / Grass / 1 Tree"
                    description2="Meet your developer's landscaping guidelines"
                    transfer = {() => this.props.navigation.navigate('DesignDetails')}
                    
                />

                <LandScapeCat 
                    imageUri={require('../assets/images/moderate3.png')}
                    title="Moderate Landscaping"
                    description1="30 Groundcover / 10 Shrubs / 5 climbers / Grass / 1 tree"
                    description2="Recommended for 10 -12m garden"
                    transfer = {() => this.props.navigation.navigate('DesignDetails')}
                />

                <LandScapeCat 
                    imageUri={require('../assets/images/advance3.png')}
                    title="Advanced Landscaping"
                    description1="40 Groundcovers / 15 Shrubs / 10 Climbers / 1 Grass / 3 Trees"
                    description2="Recommended for 12.5m - 18m garden"
                    transfer = {() => this.props.navigation.navigate('DesignDetails')}
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
