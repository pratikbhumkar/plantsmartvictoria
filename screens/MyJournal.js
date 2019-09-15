import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, AsyncStorage, StatusBar } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MyJournal extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.retrieveItem("userData");
        this.setState({});
      });

  }

  state = {
    userplants: [],
    items: {},
    today: ''
  }
  componentWillMount() {
    const date = new Date();
    var today = date.toISOString().split('T')[0];
    this.state.today = today;
  }
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      this.setState({
        userplants: item
      })

      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  render() {
    return (

      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.today}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange={1}
        theme={{
          week: {
            height: 150
          }
        }}
      />
    )
  }

  // Fertilize, Prune Type
  // 'Trees and Shrubs' F-1ce a year P-3-years 
  // ,'Aquatic and Riparian Zone Plants' F-Never P-Never 
  // ,'Bulbs and Lilies' F-1ce a month P-1ce year
  // ,'Climbers' F-weekly P- P-1ce year
  // ,'Grasses' F-twice a year P-1ce
  // ,'Groundcover' F-twice a year  P-1ce

  //       Rainfall Rain(mm)
  // 0-300: low, Bi weekly
  // 300-400 moderate, after 5 days
  // 400+ : high,Daily

  loadItems(day) {
    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          var numItems = this.state.userplants.length;
          for (let j = 0; j < numItems; j++) {
            var item = this.state.userplants[j];
            var itemRain = Number(item['Rain(mm)']);
            if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
              this.state.items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 100
              });

            } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
              this.state.items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 100
              });
            } else if (itemRain > 400) {
              this.state.items[strTime].push({
                name: 'Water ' + this.state.userplants[j].Commonname,
                height: 100
              });
            }


          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);

  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No plant care! yay!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 10
  },
  emptyDate: {
    height: 10,
    flex: 1,
    paddingTop: 20
  }
});