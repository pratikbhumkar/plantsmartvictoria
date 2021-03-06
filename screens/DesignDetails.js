import React from 'react';
import {  View, Text,  ScrollView, Alert, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'
import { inject, observer } from 'mobx-react';
import UserPlants from '../model/UserPlants';
/**
 * Component reponsible for design's details.
 */
class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        //Saving passed data.
        this.state.plant = this.props.navigation.getParam('DesignObj', '');
        this.state.userData = this.props.navigation.getParam('userData', '');
        this.state.design = this.props.navigation.getParam('DesignName', '');
        //Storing the user's data on screen focus lost.
        this.props.navigation.addListener(
            'willBlur',
            payload => {
                this.storeItem('userData',this.state.userPlants)
            });
    }
    /**
   * This method stores data to user's local memory.
   * @param {*} key : Key used to store the data.
   * @param {*} item : Item to be stored
   */
    async storeItem(key, item) {
        try {
          //we want to wait for the Promise returned by AsyncStorage.setItem()
          //to be resolved to the actual value before returning the value
          var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
          return jsonOfItem;
        } catch (error) {
          console.log(error.message);
        }
      }
    /**
     * Separating invidual plants and saving to state.
     */
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
        design: '',
        userData: [],
        plant: [],
        PlantName: '',
        shrubsClimbers: [],
        groundcoversGrasses: [],
        treesStrapLeaves: [],
        content: [],
        items: {},
        userPlants:[]
    }
    //Separating plant components
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

    /**
     * This method adds the data to user's plants.
     */
    addToMyPlants() {
        const date = new Date();
        var addDate = date.toISOString().split('T')[0];
        var self=this;
        if (this.props.PlantStore.designSelected != this.state.design && this.props.PlantStore.designSelected.length>0) {
            Alert.alert(
                'Design change',
                'Are you sure you want to change design from '+this.props.PlantStore.designSelected+' to '+this.state.design+' ?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            UserPlants.removeDesignPlants(self.state.design)
                            self.props.PlantStore.designSelected = self.state.design;
                            self.state.content.forEach(element => {
                                UserPlants.addPlant({
                                    commonName: element.Commonname, botanicalName: element.Botanicalname, rain: String(element.Rain)
                                    , spread: String(element.Spread), height: String(element.Height), addDate: addDate, url: element.url
                                    , design: self.state.design, PlantComplete:"0"
                                })
                            });
                        }
                    },
                ],
                { cancelable: false },
            );

        }else{
            var plantArray = []
            self.props.PlantStore.designSelected = self.state.design;
            self.state.content.forEach(element => {
                UserPlants.addPlant({
                    commonName: element.Commonname, botanicalName: element.Botanicalname, rain: String(element.Rain)
                    , spread: String(element.Spread), height: String(element.Height), addDate: addDate, url: element.url
                    , design: self.state.design,PlantComplete:"0"
                })
            });
            UserPlants.plantsArray.map((plant, i) => {
                if (i != 0) {
                    plantArray.push(plant)
                }
            });
            this.state.userPlants=plantArray;
            this.props.PlantStore.loadItems(plantArray);
            alert('Plant added to my plants');
        }
    }
    /**
     * Rendering the Design details component.
     */
    render() {
        return (
            <View >
                <HeaderComponent text="Design Details" back={this.props.navigation} />
                <ScrollView scrollEventThrottle={16} style={{ marginBottom: 30 }}>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', paddingHorizontal: 20 }}>
                            Shrubs and Climbers
                        </Text>
                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}>
                                {this.shrubsAndClimbers()}
                                {this.state.shrubsClimbers.map((u, i) => (
                                    <View key={i} style={{ marginBottom: 3 }}>
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
                                showsHorizontalScrollIndicator={true}>
                                {this.grassAndGroundcovers()}
                                {this.state.groundcoversGrasses.map((u, i) => (
                                    <View key={i} style={{ marginBottom: 10 }}>
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
                        <View style={{ height: 130, marginTop: 20, marginBottom: 3 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={true}>
                                {this.treesAndStrapLeaves()}
                                {this.state.treesStrapLeaves.map((u, i) => (
                                    <View key={i} style={{ marginBottom: 10 }}>
                                        <Category
                                            imageUri={{ uri: u['url'] }}
                                            name={u['Commonname'].toUpperCase()}
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ height: 150, width: '80%', marginTop: 20, marginLeft: 50 }}>
                        <Button
                            raised={true}
                            title="SELECT DESIGN"
                            onPress={() => {
                                this.addToMyPlants();
                            }}
                            buttonStyle={{ height: 60, width: '100%', borderRadius: 20, backgroundColor: '#75ebb6' }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default inject("PlantStore")(observer(DesignDetails))        //Injecting mobx store to component.
//Stytles for Design details
DesignDetails.navigationOptions = {
    title: 'DesignDetails',
};

