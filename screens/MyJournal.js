import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class MyJournal extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.retrieveItem("userData");
        this.retrieveCalendarData();
      });
  }

  state = {
    userplants: [],
    items: {},
    today: '',
  }



  componentWillMount() {
    const date = new Date();
    var today = date.toISOString().split('T')[0];
    this.state.today = today;
  }

  async retrieveCalendarData() {
    try {
      const retrievedItem = await AsyncStorage.getItem("CalendarItems");
      const item = JSON.parse(retrievedItem);
      this.setState({
        items: item
      })
    } catch (error) {
      console.log(error.message);
    }
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

  }

  render() {
    return (

      <Agenda
        // items={{
        //   '2019-09-15': [{text: 'item 1 - any js object'}],
        //   '2019-09-16': [{text: 'item 2 - any js object'}],
        //   '2019-09-17': [],
        //   '2019-09-18': [{text: 'item 3 - any js object'},{text: 'any js object'}]
        // }}
        items={this.state.items}
        // loadItemsForMonth={}
        // loadItemsForMonth={this.loadItems.bind(this)}
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


  // loadItems() {
  //   // setTimeout(() => {
  //   var day = new Date().valueOf();
  //   for (let i = 0; i < 30; i++) {
  //     var time = day + i * 24 * 60 * 60 * 1000;
  //     var strTime = this.timeToString(time);

  //     if (!this.state.items[strTime]) {
  //       this.state.items[strTime] = [];
  //       // console.log(this.state.userplants);
  //       if (this.state.userplants !== null) {
  //         var numItems = this.state.userplants.length;
  //         for (let j = 0; j < numItems; j++) {
  //           var item = this.state.userplants[j];
  //           var itemRain = Number(item['Rain(mm)']);
  //           if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
  //             this.state.items[strTime].push({
  //               name: 'Water ' + this.state.userplants[j].Commonname,
  //               height: 100
  //             });

  //           } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
  //             this.state.items[strTime].push({
  //               name: 'Water ' + this.state.userplants[j].Commonname,
  //               height: 100
  //             });
  //           } else if (itemRain > 400) {
  //             this.state.items[strTime].push({
  //               name: 'Water ' + this.state.userplants[j].Commonname,
  //               height: 100
  //             });
  //           }
  //         }
  //       }
  //     }
  //   }
  //   const newItems = {};

  //   Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
  //   // console.log(newItems)
  //   this.setState({
  //     items: newItems
  //   });
  //   // }, 1000);
  // }

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

  // timeToString(time) {
  //   try {
  //     const date = new Date(time);
  //     return date.toISOString().split('T')[0];
  //   } catch (error) {

  //   }

  // }
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