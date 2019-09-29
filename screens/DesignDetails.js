import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';

export default class DesignDetails extends React.Component {
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
            <ScrollView style = {styles.mainContainer}>
                <HeaderComponent text="Design Details" />
                <Card style = {styles.container}>

                <Image source={require('../assets/images/balltree.jpg')} style={{width: 40, height: 200, borderRadius:200}}/>

                <ScrollView
                    horizontal={true}
                >

                </ScrollView>

                </Card>

                
                
            </ScrollView>

        );
    
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: '#6ac99e'
    },

    containerStyle: {
        alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
        marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b'
    },
    contents: { fontSize: 14, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#000', paddingTop: 10 }
});
