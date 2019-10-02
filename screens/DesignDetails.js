import React from 'react';
import { StyleSheet, View, Text, Image,AsyncStorage, ScrollView, Dimensions, ToastAndroid, TouchableOpacity,Platform} from 'react-native';
import { Button } from 'react-native-elements'
import HeaderComponent from '../components/HeaderComponent.js';
import Category from '../components/Category'

const{height,width}= Dimensions.get('window')

export default class DesignDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state.plant = this.props.navigation.getParam('DesignObj', '');
        this.state.userData = this.props.navigation.getParam('userData', '');
    }
    componentWillMount(){
        // console.log(this.state.plant);
        // this.renderPlants();
    }
    state = {
        userData:[],
        plant: [],
        PlantName: '',
        shrubs: [],
        groundcovers: [],
        trees:[],
        content:[]
      }

      splitPlants = () =>{
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
          console.log('userplants:::',userplantsArray)
          console.log('designData:::',designData)
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
      
renderPlants(){
    var userPlants=this.state.plant;
    var content=[];
    for (const key in userPlants) {
        if (userPlants.hasOwnProperty(key)) {
            console.log('type=',key);
            const elements = userPlants[key];
            // console.log('type is:'+key+'::',element)
            // console.log(elements.length)
            if (elements.length>0) {
                elements.forEach(element => {
                    content.push(element);
                });
            }  
        }
        
    }
    console.log('content::',content);
    this.state.content=content;
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
                  
                {this.renderPlants()}
                </ScrollView>
                <Button
                      raised={true}
                      title="Add"
                      onPress={() =>{
                          this.addToMyPlants();
                      }}
                      buttonStyle={{ height: 40, width: '100%', borderRadius: 20, backgroundColor: '#6ac99e', alignSelf: 'flex-end' }}
                    />
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
