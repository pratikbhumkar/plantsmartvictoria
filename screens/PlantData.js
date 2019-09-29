import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';

export default class MyPlants extends React.Component {
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
                <HeaderComponent text="Plant Data" back={this.props.navigation}/>
                <Card style = {styles.container}
                image={{uri: u['url']}}
                imageStyle={{width:'100%',height:400}}
                title={u['Commonname'].toUpperCase()}
                titleStyle={{alignSelf:'flex-start',paddingLeft:10,paddingBottom:-5}}
                >

                    <Text style={styles.contents}>Botanical Name: {u['Botanicalname'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Height(m): {u['Height(m)']}</Text>
                    <Text style={styles.contents}>Rain(mm): {u['Rain(mm)']}</Text>
                    <Text style={styles.contents}>Genus: {u['Genus'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Spread(m): {u['Spread(m)'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Tube Colour: {u['Tubecolour'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Plant Type: {u['Type'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Soil pH: {u['SoilpH'].toUpperCase()}</Text>
                    <Text style={styles.contents}>Soil Texture: {u['Soiltexture'].toUpperCase()}</Text>
                </Card>
            </ScrollView>
        )
    }
}
MyPlants.navigationOptions = {
    title: 'My Plants',

};
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
