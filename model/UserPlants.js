import { types } from 'mobx-state-tree';
/**
 * This is a store which centrally saves plant data for app.
 */
const Plant = types.model('Plants', {//Determining plant model.
    commonName: types.string,
    botanicalName: types.string,
    rain: types.string,
    height: types.string,
    spread: types.string,
    addDate: types.string,
    url: types.string,
    design: types.string,
    PlantComplete: types.string,
    plantImage:types.array(types.array(types.string,types.string))
})
//Creating an array to store.
const plantStore = types.model('Plants', {
    plantsArray: types.array(Plant)
})
    .actions(self => ({
        removePlant(botanicalName){
            var plant=this.getPlant(botanicalName);
            self.plantsArray.remove(plant)
        },
        addPlant(plant) {   //This method adds data.
            var insertFlag=true;
            //Checking if plants already exists, if not add. Send appropriate return value.
            for (let index = 0; index < self.plantsArray.length; index++) {
                var element = self.plantsArray[index];
                if (element.botanicalName==plant.botanicalName) {
                    insertFlag=false;
                    break;
                }
            }
            if(insertFlag){
                self.plantsArray.push(plant)
                return true;
            }
            else{
                return false;
            }
        },
        pushOriginal(plant,originalURL){    //Pusing the original image data to plant.
            var plant=self.plantsArray.find(plant);
            plant.plantImage.push(originalURL,'Original')
        },
        getPlants() {   //Get all the plants without default plant.
            return self.plantsArray.slice(1,);
        },
        getPlant(botanicalName){ //Get particular plant based on botanical name
            for (let index = 0; index < self.plantsArray.length; index++) {
                var element = self.plantsArray[index];
                if (element.botanicalName==botanicalName) {
                    return element
                }
            }
            return null;
        },
        removeDesignPlants(designToRemove) {    //Remove plants of a particular design
            self.plantsArray.forEach(element => {
                if (element.design != designToRemove && element.design != 'null') {     //Marking complete to plants which are added via design only.
                    self.plantsArray.remove(element)
                }
            });
        },
        markComplete(plantBotanicalName,design) { //Mark complete a deisgn and return value accordingly. && element.design!=='null'
            
            self.plantsArray.forEach(element => {
                if (element.botanicalName == plantBotanicalName ) {
                    element.PlantComplete = '1';
                }
            });
            var completeFlag = true;
            self.plantsArray.forEach(element => {
                if (element.PlantComplete=='0' && element.design==design) {     //changing the design's plant as complete.
                    completeFlag = false;
                }
            });
            if (completeFlag) {
                return true;
            } else {
                return false;
            }
        },
        storeImages(botanicalName,imageLocationArray){  //Storing the images.
            self.plantsArray.forEach(element => {
                if(element.botanicalName==botanicalName) {
                    element.plantImage.push(imageLocationArray);
                }

            });
            
        }
    })
    )
    .create({   //Creating a default sample object.
        plantsArray: [{
            commonName: 'SampCom', botanicalName: 'sampbot', rain: '100', spread: '100', height: '100', addDate: ''
            , url: 'https://www.google.com/search?sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&q=image&tbm=isch&source=univ&sxsrf=ACYBGNS2L9T5EY03uL00twRzEekIn6_YAA:1570524741179&sa=X&ved=2ahUKEwiJ_bvKpIzlAhXVZSsKHaLGDtMQsAR6BAgDEAE&biw=1536&bih=792#'
            , design: 'null', PlantComplete: "0",plantImage:[['default','default']]
        }]
    })
//Exporting the store.
export default plantStore;