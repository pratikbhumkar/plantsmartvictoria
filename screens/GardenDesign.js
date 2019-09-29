import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';

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
                <HeaderComponent text="Garden Design" />


            <View>
            <TouchableOpacity style={{ paddingTop: 500 }} onPress={() => this.props.navigation.navigate('DesignDetails')}>
              <Text>DummyButton</Text>
            </TouchableOpacity>

            </View>
               
            </View>

        );
    
    }


}