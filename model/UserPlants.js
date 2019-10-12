import { types } from 'mobx-state-tree';

const Plant = types.model('Plants', {
    commonName: types.string,
    botanicalName: types.string,
    rain: types.string,
    height: types.string,
    spread: types.string,
    addDate: types.string,
    url: types.string,
    design: types.string,
    PlantComplete: types.string,
})

const plantStore = types.model('Plants', {
    plantsArray: types.array(Plant)
})
    .actions(self => ({
        addPlant(plant) {
            self.plantsArray.push(plant);
        },
        getPlants() {
            return self.plantsArray;
        },
        removeDesignPlants(designToRemove) {
            self.plantsArray.forEach(element => {
                if (element.design != designToRemove && element.design != 'null') {
                    self.plantsArray.remove(element)
                }
            });
        },
        markComplete(plantBotanicalName,design) {
            
            self.plantsArray.forEach(element => {
                console.log('Botanical Name',plantBotanicalName,'plant name',element.botanicalName);
                if (element.botanicalName == plantBotanicalName) {
                    element.PlantComplete = '1';
                }
            });
            var completeFlag = true;
            self.plantsArray.forEach(element => {
                console.log(element.PlantComplete,element.design,design,element.PlantComplete=='0', element.design==design)
                if (element.PlantComplete=='0' && element.design==design) {
                    completeFlag = false;
                }
            });
            if (completeFlag) {
                return true;
            } else {
                return false;
            }
        }
    })
    )
    .create({
        plantsArray: [{
            commonName: 'SampCom', botanicalName: 'sampbot', rain: '100', spread: '100', height: '100', addDate: ''
            , url: 'https://www.google.com/search?sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&q=image&tbm=isch&source=univ&sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&sa=X&ved=2ahUKEwiJ_bvKpIzlAhXVZSsKHaLGDtMQsAR6BAgDEAE&biw=1536&bih=792#'
            , design: 'null', PlantComplete: "0"
        }]
    })

export default plantStore;