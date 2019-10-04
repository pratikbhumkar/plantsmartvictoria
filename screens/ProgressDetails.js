import React from 'react';
import HeaderComponent from '../components/HeaderComponent.js';

import{
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TextInput,
    Scrollview,
    Dimensions,
    Image,
    ScrollView
} from "react-native";
import Gallery from '../components/Gallery'

const{height,width}= Dimensions.get('window')

export default class ProgressDetails extends React.Component {
render() 
{
    return(
        <View >
        <View>
        <HeaderComponent text="Progress Details" back={this.props.navigation} back={this.props.navigation}/>

        <View style ={{ width : width , height: 500}}>
            <Image
            style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:5, borderWidth:1,
            borderColor: '#dddddd', justifyContent:'flex-end', alignItems:'center'}}
            source={require('../assets/images/dummyShrub.jpg')}
            >
                
            </Image>
            <View style ={{ padding:2}}/>
            
            
        </View>
        
        </View>

        <ScrollView scrollEventThrottle={16} >

        <View style={{flex:1, backgroundColor:'white',paddingTop:20}}>
                <Text style={{fontSize:16, fontWeight:'700',paddingHorizontal:20}}>
                    P L A N T  N A M E  C O M M O N  N A M E {"\n"}
                    B O T A N I C A L  N A M E 
                </Text>
                <View style={{padding:30}}/>
                <View style={{height:130, marginTop:20}}>

                            <ScrollView
                                
                                horizontal = {true}
                                showsHorizontalScrollIndicator={false}>
                               
                               
                                    
                                        
                                    <Gallery
                                     imageUri={require('../assets/images/dummyShrub.jpg')}
                                     date= "01/01/2019"
                                   
                                    />
                                    <Gallery
                                     imageUri={require('../assets/images/dummyShrub.jpg')}
                                     date= "01/01/2019"
                                    />
                                    <Gallery
                                     imageUri={require('../assets/images/dummyShrub.jpg')}
                                     date= "01/01/2019"
                                   
                                    />
                                   <Gallery
                                     imageUri={require('../assets/images/dummyShrub.jpg')}
                                     date= "01/01/2019"
                                    />
                                     <Gallery
                                     imageUri={require('../assets/images/dummyShrub.jpg')}
                                     date= "01/01/2019"
                                    />

                             


                               
                             </ScrollView>
                 
                </View>
   
                
            </View>

       
           


        </ScrollView>
       
    </View>

    );
}
}