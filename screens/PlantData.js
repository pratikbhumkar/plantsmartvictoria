import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, AsyncStorage, StatusBar } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default class MyPlants extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('plant', '');
    }
    state = {
        plant: {}
    }

    render() {
        var u = this.state.plant;
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }}>{u['Commonname'].toUpperCase()}</Text>
                <Image source={{ uri: u['url'] }} style={{ width: '100%', height: 400 }} />
                <Text style={styles.contents}>Botanical Name: {u['Botanicalname'].toUpperCase()}</Text>
                <Text style={styles.contents}>Height(m): {u['Height(m)']}</Text>
                <Text style={styles.contents}>Rain(mm): {u['Rain(mm)']}</Text>
                <Text style={styles.contents}>Genus: {u['Genus'].toUpperCase()}</Text>
                <Text style={styles.contents}>Spread(m): {u['Spread(m)'].toUpperCase()}</Text>
                <Text style={styles.contents}>Tube Colour: {u['Tubecolour'].toUpperCase()}</Text>
                <Text style={styles.contents}>Plant Type: {u['Type'].toUpperCase()}</Text>
                <Text style={styles.contents}>Soil pH: {u['SoilpH'].toUpperCase()}</Text>
                <Text style={styles.contents}>Soil Texture: {u['Soiltexture'].toUpperCase()}</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    containerStyle: {
        alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
        marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b'
    },
    contents: { fontSize: 20, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: '#000' }
});
