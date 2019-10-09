import { observable, action, computed } from 'mobx';


class PlantStore {
  @observable calendarItems = [];
  @observable plantJournal;
  @observable imageDict={};

  @action
  storePlantImages(BotanicalName,imageArray){
    this.imageDict[BotanicalName]=imageArray
  }


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
            else if ([1, 15].includes(i)) {
              items[strTime].push({
                name: 'Fertilize ' + plantArray[j].commonName,
                height: 60
              });

            }
            else if ([1].includes(i)) {
              items[strTime].push({
                name: 'Prune ' + plantArray[j].commonName,
                height: 60
              });
            }
          }
        }
      }
    }
    const newItems = {};

    Object.keys(items).forEach(key => { newItems[key] = items[key]; });
    this.calendarItems = newItems
    // this.props.PlantStore.calendarItems=newItems;
  }

  //   @computed
  //   get plantJournalCount() {
  //     return this.birds.length;
  //   }
}
export default new PlantStore();