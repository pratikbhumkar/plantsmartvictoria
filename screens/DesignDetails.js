import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage, ScrollView, Dimensions, ToastAndroid, TouchableOpacity, Platform } from 'react-native';
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'
import {observer} from 'mobx-react';
import UserPlants from '../model/UserPlants';

@observer
export default class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('DesignObj', '');
        this.state.userData = this.props.navigation.getParam('userData', '');
        this.props.navigation.addListener(
            'willBlur',
            payload => {
              this.loadItems();
            });
    }
    state = {
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
   
    async loadItems() {
        var day = new Date().valueOf();
        var items = {};
        for (let i = 0; i < 30; i++) {
            var time = day + i * 86400000;
            var date = new Date(time);
            var strTime = date.toISOString().split('T')[0];;

            if (!items[strTime]) {
                items[strTime] = [];
                if (this.state.content !== null) {
                    var numItems = this.state.content.length;
                    for (let j = 0; j < numItems; j++) {
                        var item = this.state.content[j];
                        var itemRain = Number(item['Rain']);
                        if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
                            items[strTime].push({
                                name: 'Water ' + item.Commonname,
                                height: 60
                            });
                        } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
                            items[strTime].push({
                                name: 'Water ' + item.Commonname,
                                height: 60
                            });
                        } else if (itemRain > 400) {
                            items[strTime].push({
                                name: 'Water ' + item.Commonname,
                                height: 60
                            });
                        }
                        else if ([1, 15].includes(i)) {
                            items[strTime].push({
                                name: 'Fertilize ' +item.Commonname,
                                height: 60
                            });

                        }
                        else if ([1].includes(i)) {
                            items[strTime].push({
                                name: 'Prune ' + item.Commonname,
                                height: 60
                            });
                        }
                    }
                }
            }
        }
        const newItems = {};
        Object.keys(items).forEach(key => { newItems[key] = items[key]; });
        this.storeCalendarItem("CalendarItems", newItems);
    }
    addToMyPlants() {
        const date = new Date();
        var addDate = date.toISOString().split('T')[0];
        this.state.content.forEach(element => {
            UserPlants.addPlant({commonName:element.Commonname,botanicalName:element.Botanicalname,rain:String(element.Rain)
                ,spread:String(element.Spread),height:String(element.Height),addDate:addDate,url:element.url})
        });
    }
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
    async storeCalendarItem(key, item) {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
            return jsonOfItem;
        } catch (error) {
            console.log(error.message);
        }
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
                    <Button
                            raised={true}
                            title="S E L E C T   D E S I G N"
                            onPress={() => {
                                this.addToMyPlants();
                            }}
                            buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                        />
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
            </View>
        );
    }
}

DesignDetails.navigationOptions = {
    title: 'DesignDetails',
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: '#fff'
    },


    contents: { fontSize: 14, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#000', paddingTop: 10 }
});
