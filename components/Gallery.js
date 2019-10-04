import React, {Component}   from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

class Gallery extends Component{
    render(){
        return(
            <View style={{height:160, width:200,marginLeft:20, borderWidth:0.5, borderColor:'#dddddd'}}>
                <View style={{flex:2}}>
                    <Image source={this.props.imageUri}
                        style={{flex:1, width:null, height:null, resizeMode:'cover'}}
                    />
                </View>
                <View style={{flex:1, paddingLeft:10, paddingTop:10, font:5}}>
                <Text>{this.props.date}</Text>
                </View>

            </View>

        );

    }
}
export default Gallery;