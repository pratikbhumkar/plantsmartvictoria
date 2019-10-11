import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, Platform } from 'react-native';
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'
import { inject, observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';

class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('DesignObj', '');
        this.state.userData = this.props.navigation.getParam('userData', '');
        this.state.design=this.props.getParam('DesignName', '');
    }
    componentWillMount() {
        var userPlants = this.state.plant;
        var contentArray = [];
        for (const key in userPlants) {
            if (userPlants.hasOwnProperty(key)) {
                const elements = userPlants[key];
                if (elements.length > 0) {
                    elements.forEach(element => {
                        contentArray.push(element);
                    });
                }
            }
        }
        this.state.content = contentArray;
    }

    state = {
        design:'',
        userData: [],
        plant: [],
        PlantName: '',
        shrubsClimbers: [],
        groundcoversGrasses: [],
        treesStrapLeaves: [],
        content: [],
        items: {}
    }

    shrubsAndClimbers() {
        this.state.shrubsClimbers = this.state.plant['SH'];
        climbers = this.state.plant['CL'];
        if (climbers != undefined) {
            this.state.shrubsClimbers = this.state.shrubsClimbers.concat(climbers);
        }
    }
    grassAndGroundcovers() {
        this.state.groundcoversGrasses = this.state.plant['GC'];
        grasses = this.state.plant['GS'];
        rushes = this.state.plant['RS'];
        if (grasses != undefined) {
            this.state.groundcoversGrasses = this.state.groundcoversGrasses.concat(grasses);
        }
        if (rushes != undefined) {
            this.state.groundcoversGrasses = this.state.groundcoversGrasses.concat(rushes);
        }
    }
    treesAndStrapLeaves() {
        this.state.treesStrapLeaves = this.state.plant['TS'];
        strapLeaves = this.state.plant['SLP'];
        if (strapLeaves != undefined) {
            this.state.treesStrapLeaves = this.state.treesStrapLeaves.concat(strapLeaves);
        }
    }


    addToMyPlants() {
        const date = new Date();
        var addDate = date.toISOString().split('T')[0];

        if(this.props.PlantStore.designSelected!=this.state.design && this.props.PlantStore.designSelected!=='null'){
            alert('You have chosen a design already, your design will be changed to:',this.state.design)
            UserPlants.removeDesignPlants(this.state.design)
          }else{
            this.props.PlantStore.designSelected=this.state.design;
          }
          this.state.content.forEach(element => {
            UserPlants.addPlant({
                commonName: element.Commonname, botanicalName: element.Botanicalname, rain: String(element.Rain)
                , spread: String(element.Spread), height: String(element.Height), addDate: addDate, url: element.url
                ,design:this.state.design
            })
        });
      

        var plantArray = []
        alert('Plant added to my plants');
        UserPlants.plantsArray.map((plant, i) => {
            if (i != 0) {
                plantArray.push(plant)
            }
        });
        this.props.PlantStore.loadItems(plantArray);
    }
    render() {
        return (
            <View >
                <View>
                    <HeaderComponent text="Design Details" back={this.props.navigation} />
                    <View style={{ width: null, height: null }}>

                    </View>
                </View>
                <ScrollView scrollEventThrottle={16} >
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }}>
                            Shrubs and Climbers
                        </Text>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.shrubsAndClimbers()}
                                {this.state.shrubsClimbers.map((u, i) => (
                                    <View key={i}>
                                        <Category
                                            imageUri={{ uri: u['url'] }}
                                            name={u['Commonname'].toUpperCase()}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }}>
                            Grass, Groundcovers, Rushes and Sedges
                        </Text>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.grassAndGroundcovers()}
                                {this.state.groundcoversGrasses.map((u, i) => (
                                    <View key={i}>
                                        <Category
                                            imageUri={{ uri: u['url'] }}
                                            name={u['Commonname'].toUpperCase()}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>


                    </View>

                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }}>
                            Trees and Strap-leaved Plants
                        </Text>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {this.treesAndStrapLeaves()}
                                {this.state.treesStrapLeaves.map((u, i) => (
                                    <View key={i}>
                                        <Category
                                            imageUri={{ uri: u['url'] }}
                                            name={u['Commonname'].toUpperCase()}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ height: 150, width: '80%', marginTop: 100, marginLeft: 50 }}>
                    <Button
                        raised={true}
                        title="SELECT DESIGN"
                        onPress={() => {
                            this.addToMyPlants();
                        }}
                        buttonStyle={{ height: 60, width: '100%', borderRadius: 20, backgroundColor: '#75ebb6' }}
                    />
                </View>
            </View>
        );
    }
}
export default inject("PlantStore")(observer(DesignDetails))
DesignDetails.navigationOptions = {
    title: 'DesignDetails',
};

