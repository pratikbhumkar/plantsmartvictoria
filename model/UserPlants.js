import {types} from 'mobx-state-tree';

const Plant= types.model('Plants',{
    commonName:types.string,
    botanicalName:types.string,
    rain:types.string,
    height:types.string,
    spread:types.string,
    addDate:types.string,
    url:types.string
})

const plantStore= types.model('Plants',{
    plantsArray:types.array(Plant)
})
.actions(self=>({
    addPlant(plant){
        self.plantsArray.push(plant);
    },
    getPlants(){
        return self.plantsArray;
    }
})
)
.create({
    plantsArray:[{commonName:'SampCom',botanicalName:'sampbot',rain:'100',spread:'100',height:'100',addDate:'',url:''}]
})

export default plantStore;