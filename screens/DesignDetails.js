import React from 'react';
import { StyleSheet, View, Text, Image,AsyncStorage, ScrollView, Dimensions, ToastAndroid, TouchableOpacity,Platform} from 'react-native';
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'

//const{height,width}= Dimensions.get('window')

export default class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('DesignObj', '');
        this.state.userData = this.props.navigation.getParam('userData', '');
        

        
    }
    
    state = {
        userData:[],
        plant: [],
        PlantName: '',
        shrubsClimbers:[],
        groundcoversGrasses: [],
        treesStrapLeaves:[],
        content:[]
      }
      
      shrubsAndClimbers(){
        
        this.state.shrubsClimbers = this.state.plant['SH'];  
        climbers = this.state.plant['CL'];
        if( climbers != undefined)
        {
            this.state.shrubsClimbers = this.state.shrubsClimbers.concat(climbers);
          
        }
        
      }

      grassAndGroundcovers(){
        
        this.state.groundcoversGrasses = this.state.plant['GC'];  
        grasses = this.state.plant['GS'];
        rushes = this.state.plant['RS'];
        if( grasses != undefined)
        {
            this.state.groundcoversGrasses = this.state.groundcoversGrasses.concat(grasses);
          
        }
        if( rushes != undefined)
        {
            this.state.groundcoversGrasses = this.state.groundcoversGrasses.concat(rushes);
          
        }
        
      }

      treesAndStrapLeaves(){
        
        this.state.treesStrapLeaves = this.state.plant['TS'];  
        strapLeaves = this.state.plant['SLP'];
        
        if( strapLeaves != undefined)
        {
            this.state.treesStrapLeaves = this.state.treesStrapLeaves.concat(strapLeaves);
          
        }
        
        
      }
      
      
      addToMyPlants() {
        var uploadFlag = true;
        var designData=this.state.content;
        var userplantsArray = this.state.userData;
        if (userplantsArray === null) {       //This fix is for new devices using app and no data in app storage so cant store in empty array.
          userplantsArray = [];
        }
        const date = new Date();
        var addDate = date.toISOString().split('T')[0];
        designData.forEach(element => {
            element.addDate = addDate;
        });
       
        if (uploadFlag) {
          if (Platform.OS === 'ios') {
            alert('Plant added to my plants');
          }
          else {
            ToastAndroid.show('Plant added to my plants', ToastAndroid.LONG);
          }
          userplantsArray=userplantsArray.concat(designData);
          
          this.storeItem("userData", userplantsArray);
        }
        else {
          if (Platform.OS === 'ios') {
            alert('Plant already added to my plants');
          }
          else {
            ToastAndroid.show('Plant already added to my plants', ToastAndroid.LONG);
          }
        }
    
    
      }
async storeItem(key, item) {
    try {
        //we want to wait for the Promise returned by AsyncStorage.setItem()
        //to be resolved to the actual value before returning the value
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
        console.log(error.message);
    }
}
      
componentWillMount(){
    var userPlants=this.state.plant;
    var contentArray=[];
    for (const key in userPlants) {
        if (userPlants.hasOwnProperty(key)) {
            console.log('type1=',key);
            const elements = userPlants[key];
           
            if (elements.length>0) {
                elements.forEach(element => {
                  contentArray.push(element);
                });
            }  
        }
        
    }
    this.state.content=contentArray;
    console.log(this.state.content);
    } 

    render(){
        
        return(
            <View >
                <View>
                <HeaderComponent text="Design Details"  back={this.props.navigation}/>

                <View style ={{ width : null , height: 200}}>
                    <Image
                    style={{flex:1, height:null, width:null, resizeMode:'cover', borderRadius:5, borderWidth:1,
                    borderColor: '#dddddd', justifyContent:'flex-end', alignItems:'center'}}
                    source={require('../assets/images/landscape1.png')}
                    >
                        
                    </Image>
                    <View style ={{ padding:2}}/>
                    <Button
                      raised={true}
                      title="S E L E C T   D E S I G N"
                      onPress={() =>{
                          this.addToMyPlants();
                      }}
                      buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                    />
                    
                </View>
                
                </View>

                <ScrollView scrollEventThrottle={16} >

                <View style={{flex:1, backgroundColor:'white',paddingTop:20}}>
                        <Text style={{fontSize:16, fontWeight:'700',paddingHorizontal:20}}>
                            Shrubs and Climbers
                        </Text>
                        <View style={{height:130, marginTop:20}}>

                                    <ScrollView
                                        
                                        horizontal = {true}
                                        showsHorizontalScrollIndicator={false}>
                                       
                                        {this.shrubsAndClimbers()}
                                        {this.state.shrubsClimbers.map((u, i) => (
                                            
                                            <View key = {i}>
                                                
                                            <Category 
                                             imageUri={{ uri: u['url'] }}
                                             name= {u['Commonname'].toUpperCase()}
                                           
                                            />
                                            </View>
        
                                            ))}


                                       
                                     </ScrollView>
                         
                        </View>
           
                        
                    </View>

               
                    <View style={{flex:1, backgroundColor:'white',paddingTop:20}}>
                        <Text style={{fontSize:16, fontWeight:'700',paddingHorizontal:20}}>
                            Grass, Groundcovers, Rushes and Sedges
                        </Text>
                        <View style={{height:130, marginTop:20}}>

                                    <ScrollView
                                        
                                        horizontal = {true}
                                        showsHorizontalScrollIndicator={false}>
                                        
                                        {this.grassAndGroundcovers()}
                                        {this.state.groundcoversGrasses.map((u, i) => (
                                            
                                            <View key = {i}>
                                            <Category 
                                             imageUri={{ uri: u['url'] }}
                                             name= {u['Commonname'].toUpperCase()}
                                           
                                            />
                                            </View>
        
                                            ))}
        
                                     </ScrollView>
                         
                        </View>
           
                        
                    </View>

                    <View style={{flex:1, backgroundColor:'white',paddingTop:20}}>
                        <Text style={{fontSize:16, fontWeight:'700',paddingHorizontal:20}}>
                            Trees and Strap-leaved Plants
                        </Text>
                        <View style={{height:130, marginTop:20}}>

                                    <ScrollView
                                        
                                        horizontal = {true}
                                        showsHorizontalScrollIndicator={false}>
                                        {this.treesAndStrapLeaves()}
                                        {this.state.treesStrapLeaves.map((u, i) => (
                                            
                                            <View key = {i}>
                                            <Category 
                                             imageUri={{ uri: u['url'] }}
                                             name= {u['Commonname'].toUpperCase()}
                                           
                                            />
                                            </View>
        
                                            ))}
        
                                     </ScrollView>
                         
                        </View>
           
                        
                    </View>


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
