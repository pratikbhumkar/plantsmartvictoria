import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image,AsyncStorage,StatusBar  } from 'react-native';
import { Card,Button } from 'react-native-elements'

export default class MyJournal extends  React.Component{
    constructor(props){
        super(props)
        
    }
    state={
        plants:[]
    }
    render(){
        return(
            <View >
                <StatusBar backgroundColor='#6ac99e' barStyle='light-content' />

                <Text>This is my journal</Text></View>
        )
    }
}