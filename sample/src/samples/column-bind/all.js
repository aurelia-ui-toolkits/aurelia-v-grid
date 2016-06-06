import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];

  columnSetup = [
    {
      attribute: "index",
      filter: true,
      filterOperator:">",
      filterTop: true,
      sort: true,
      contextmenuRow: true,
      contextmenuHeader: true
    }, {
      attribute: "name",
      filterTop: true,
      filter: true,
      filterOperator:"*",
      sort: true,
      contextmenuRow: true,
      contextmenuHeader: true
    }, {
      attribute: "number",
      filter: true,
      filterTop: false,
      sort: true,
      contextmenuRow: true,
      contextmenuHeader: true
    }, {
        attribute: "date",
        filter: false,
        filterTop: false,
        sort: true,
        contextmenuRow: true,
        contextmenuHeader: true
    }, {
      attribute: "bool",
      filter: true,
      filterTop: false,
      sort: true,
      type:"checkbox",
      contextmenuRow: true,
      contextmenuHeader: true
    }, {
      attribute: "images",
      type:"image",
      contextmenuRow: true
    }

  ]


  //helper for dummy data
  constructor(dummyDataGenerator) {
      //get this element
      this.dummyDataGenerator = dummyDataGenerator;
      this.dummyDataGenerator.generateData(10000, (data) => {
        this.myCollection = data;
      });

    }



}
