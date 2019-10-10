import React from 'react';
import {  View,WebView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent.js';


export default class DataVisualisation extends React.Component {


    render(){
        return(
            // <View>
            //     <HeaderComponent text="About your area." back={this.props.navigation} />
            <WebView
        source={{uri: 'http://wilison1992.github.io'}}
        style={{marginTop: 40}}
      >
           <HeaderComponent text="About your area." back={this.props.navigation} />
      </WebView>
    //   </View>
        );

    }
}