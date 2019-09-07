import React from 'react';
import { ScrollView, StyleSheet,View, Text, Image,AsyncStorage,StatusBar  } from 'react-native';
import { Card,Button } from 'react-native-elements'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class MyJournal extends  React.Component{
    constructor(props){
        super(props)
        
    }
    state={
        plants:[],
        items: {}
    }
    render(){
        return(

    <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2019-09-07'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        pastScrollRange = {1}
        theme={{
            week:{
                height:150
            }
        }}
      />          
        )
    }
    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
              const numItems = Math.floor(Math.random() * 5);
              for (let j = 0; j < numItems; j++) {
                this.state.items[strTime].push({
                  name: 'Item for ' + strTime,
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          //console.log(this.state.items);
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({
            items: newItems
          });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
      }
    
      renderItem(item) {
        return (
          <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
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
        flex:1,
        paddingTop: 20
      }
    });