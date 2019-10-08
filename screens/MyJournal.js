import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Agenda } from 'react-native-calendars';
import HeaderComponent from '../components/HeaderComponent.js';


export default class MyJournal extends React.Component {
  constructor(props) {
    super(props)
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        // this.retrieveItem("userData");
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
      console.log('cal items',item)
      if (item !== null || typeof item !== undefined)
        this.setState({
          items: item
        })
      else {
        this.setState({
          items: {}
        })
      }
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
    if (this.state.items !== null) {
      return (
        <View style={{ width: '100%', height: '100%' }}>
          <HeaderComponent text="My Journal" back={this.props.navigation} />
          <Agenda
            items={this.state.items}
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
        </View>
      )
    }
    else {
      return (
        <View>
          <HeaderComponent text="My Journal" back={this.props.navigation} />
          <Text>No Plants added please add some!</Text>
        </View>
      )
    }
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