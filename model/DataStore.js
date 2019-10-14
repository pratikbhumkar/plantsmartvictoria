import { observable, action } from 'mobx';

/**
 * Store which stores and manages the user and plant data.
 */
class PlantStore {
  @observable calendarItems = [];   //Store calendar items
  @observable plantJournal;   //Store plant journal object.
  @observable imageDict={};   //Store the image dictionary for the plant
  @observable designSelected='';  //Store the design selected for the user.

  @action
  storePlantImages(BotanicalName,imageArray){
    this.imageDict[BotanicalName]=imageArray
  }
 /**
  * This method creates the calendar items for the plants.
  * @param {*} plantArray 
  */
  @action
  loadItems(plantArray) {
    // setTimeout(() => {
    var day = new Date().valueOf();
    var items = {};
    for (let i = 0; i < 30; i++) {
      var time = day + i * 24 * 60 * 60 * 1000;
      var date = new Date(time);

      var strTime = date.toISOString().split('T')[0];;

      if (!items[strTime]) {
        items[strTime] = [];
        if (plantArray !== null) {
          var numItems = plantArray.length;
          for (let j = 0; j < numItems; j++) {
            var item = plantArray[j];
            var itemRain = Number(item['rain']);
            if (itemRain > 0 && itemRain < 301 && [1, 5, 8, 12, 15, 19, 22, 26].includes(i)) {
              items[strTime].push({
                name: 'Water ' + plantArray[j].commonName,
                height: 60
              });

            } else if (itemRain > 300 && itemRain < 401 && [1, 15].includes(i)) {
              items[strTime].push({
                name: 'Water ' + plantArray[j].commonName,
                height: 60
              });
            } else if (itemRain > 400) {
              items[strTime].push({
                name: 'Water ' + plantArray[j].commonName,
                height: 60
              });
            }
            if ([2].includes(i)) {
              items[strTime].push({
                name: 'Fertilize ' + plantArray[j].commonName,
                height: 60
              });

            }
            
            if ([5].includes(i)) {
              items[strTime].push({
                name: 'Prune ' + plantArray[j].commonName,
                height: 60
              });
            }
          }
          if([2].includes(i)) {
          items[strTime].push({
            name: 'Click some pictures',
            height: 60
          });
        }
        }
      }
    }
    const newItems = {};

    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    this.calendarItems = newItems
  }

 
}
export default new PlantStore();