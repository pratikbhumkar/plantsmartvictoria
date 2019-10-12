import React from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Agenda } from 'react-native-calendars';
import HeaderComponent from '../components/HeaderComponent.js';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
/**
 * This component is responsible for the Journal Component.
 */
class MyJournal extends React.Component {
  constructor(props) {
    super(props)
    //Load calendar items before loading screen
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({
          items: toJS(this.props.PlantStore.calendarItems)
        })
      });
    ;
  }

  state = {
    userplants: [],
    items: {},
    today: '',
  }
  //Setting today's date
  componentWillMount() {
    const date = new Date();
    var today = date.toISOString().split('T')[0];
    this.state.today = today;   //Storing in state object for retrieval.
  }

  /**
   * Rendering the journal component.
   */
  render() {
    if (this.state.items !== null) {      //If there are no journal items present show message on screen.
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
//Render the calendar item for date with data
  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
    );
  }
//Render the calendar item for date with no tasks.
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No plant care! yay!</Text></View>
    );
  }
//checking for the row changed.
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

}
export default inject("PlantStore")(observer(MyJournal))    //Injecting mobx store to component.
//Style for the Journal component.
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