import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'

const{height,width}= Dimensions.get('window')

export default class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('designType', '');
    }
    state = {
        plants: [],
        PlantName: '',
        shrubs: [],
        groundcovers: [],
        trees:[]
        
      }

      splitPlants = () =>{
          var plants = this.state.plants;
          var newShrubs = this.state.shrubs;
          var newGroundcovers= this.state.groundcovers;
          var newTrees= this.state.trees;

          for (i=0; i < plants.length; i++)
          {
              if (plants[i].type == 'shrubs')
              {
                newShrubs.push(plants[i]);
                  this.setState({shrubs:newShrubs});
              }
              if (plants[i].type == 'groundcover')
              {
                newGroundcovers.push(plants[i]);
                this.setState({groundcovers:newGroundcovers});
              }
              if (plants[i].type == 'trees')
              {
                newTrees.push(plants[i]);
                this.setState({trees:newTrees});

              }
          }
      }

      
renderPlants(type){
    if (this.state.shrubs.length>0) {
        return(
            <View style={{flex:1, backgroundColor:'white',paddingTop:20}}>
                            <Text style={{fontSize:16, fontWeight:'700',paddingHorizontal:20}}>
                                {type}
                            </Text>
                            <View style={{height:130, marginTop:20}}>
                                <ScrollView
                                    horizontal ={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {this.state.shrubs.map(shrub =>
                                        <Category 
                                        imageUri={require('../assets/images/dummyShrub.jpg')}
                                        name= 'shrubcommonname'
                                        />
                                    )}   
                                </ScrollView>
                                 
                            </View>
                            
                        </View>
        )
    } 
}

    render(){
        
        return(
            <View >
                <View>
                <HeaderComponent text="Design Details" back={this.props.navigation} back={this.props.navigation}/>

                <View style ={{ width : width , height: 200}}>
                    <Image
                    style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:5, borderWidth:1,
                    borderColor: '#dddddd', justifyContent:'flex-end', alignItems:'center'}}
                    source={require('../assets/images/landscape1.png')}
                    >
                        
                    </Image>
                    <TouchableOpacity>
                    <Text style={{fontSize:20, fontWeight:'700', textAlign:"center", borderWidth:3, borderRadius:10, borderColor:'#dddddd'}}>
                        S E L E C T   D E S I G N
                    </Text>
                    </TouchableOpacity>
                    
                    

                </View>
                </View>

                <ScrollView scrollEventThrottle={16}>
                    {
                        this.renderShrubs('Shrubs')
                    }
                    
                    {
                        this.renderShrubs('GroundCovers')
                    }

                    {
                        this.renderShrubs('Trees')
                    }
                </ScrollView>
                
            </View>

        );
    
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        backgroundColor: '#fff'
    },

    
    contents: { fontSize: 14, fontWeight: '300', borderBottomWidth: 0.5, borderBottomColor: '#000', paddingTop: 10 }
});
