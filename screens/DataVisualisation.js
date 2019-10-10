import React from 'react';
import {  WebView } from 'react-native';


export default class DataVisualisation extends React.Component {


    render(){
        return(

            <WebView
        source={{uri: 'http://wilison1992.github.io'}}
        style={{marginTop: 40}}
      />
        );

    }
}