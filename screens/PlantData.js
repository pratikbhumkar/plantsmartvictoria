import React from 'react';
import { StyleSheet,ScrollView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent.js';
import LandScapeCat from '../components/LandScapeCat';
/**
 * This component shows plant's data.
 */
export default class PlantData extends React.Component {
    constructor(props) {
        super(props)
        ////Get data passed from prior component
        this.state.plant = this.props.navigation.getParam('plant', '');
    }
    state = {
        plant: {}
    }
/**
 * Rendering the Plant data component.
 */
    render() {
        var u = this.state.plant;
        return (
            <ScrollView style={styles.mainContainer}>
                <HeaderComponent text="Plant Data" back={this.props.navigation} />
                <LandScapeCat
                    imageUri={{ uri: u['url'] }}
                    title={u['Commonname'].toUpperCase()}
                    extraInfoLevel2={true}
                    description1={"Botanical Name: " + u['Botanicalname'].toUpperCase()}
                    description2={"Height(m):" + u['Height']}
                    description3={"Rain(mm): " + u['Rain']}
                    description4={"Spread(m):" + u['Spread'].toUpperCase()}
                    transfer={() => {
                        this.props.navigation.navigate('PlantStack', {
                            plant: u
                        });
                    }}
                />
            </ScrollView>
        )
    }
}
//Setting the navigation options.
PlantData.navigationOptions = {
    title: 'My Plants',

};
//Style details for Plant data page.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: '#fff'
    },

    containerStyle: {
        alignContent: 'center', padding: 2, paddingLeft: -3, paddingRight: -3, marginBottom: 10,
        marginTop: -3, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#827f7b'
    },
    contents: { fontSize: 14, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#000', paddingTop: 10 }
});
