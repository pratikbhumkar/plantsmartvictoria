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
    plantsArray:[{commonName:'SampCom',botanicalName:'sampbot',rain:'100',spread:'100',height:'100',addDate:'',url:'https://www.google.com/search?sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&q=image&tbm=isch&source=univ&sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&sa=X&ved=2ahUKEwiJ_bvKpIzlAhXVZSsKHaLGDtMQsAR6BAgDEAE&biw=1536&bih=792#'}]
})

export default plantStore;