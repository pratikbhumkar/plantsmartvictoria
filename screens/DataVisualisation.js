import React from 'react';
import { WebView } from 'react-native';
import HeaderComponent from '../components/HeaderComponent.js';

/**
 * This component loads the data visualization on wilson's site.
 */
export default class DataVisualisation extends React.Component {
    render() {
        return (
            <WebView
                source={{ uri: 'http://wilison1992.github.io' }}
                style={{ marginTop: 40 }}
            >
                <HeaderComponent text="About your area." back={this.props.navigation} />
            </WebView>
        );
    }
}