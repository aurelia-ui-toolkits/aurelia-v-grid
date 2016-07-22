import {dummyDataGenerator} from 'shared/dummyDataGenerator'

export class BasicUse {
  static inject = [dummyDataGenerator];


  //utillity functions
  myGrid = {};
  //current entity, link this to inputs etc
  myCurrentEntity = {};
  //collection to display
  myCollection = [];


  collectionChange(e){
    console.log(e)
  }

  //helper for dummy data
  constructor(dummyDataGenerator) {
    //get this element
    this.dummyDataGenerator = dummyDataGenerator;
    this.dummyDataGenerator.generateData(10000, (data) => {
      this.myCollection = data;
    });

    this.context = this;
    this.showOnlySelected = false;

  }

  showSelectedBtn(){
    this.myGrid.ctx.showOnlySelected();

  }

  showAll(){
    this.myGrid.ctx.showSelectedAndNotSelected();
  }

  showOnlyNotSelected(){
    this.myGrid.ctx.showOnlyNotSelected();
  }

  setColumns(){
    this.myGrid.ctx.setColumns(this.columnsOption1)
    this.myGrid.ctx.reGenerateColumns();
  }



  setColumns2(){
    this.myGrid.ctx.setColumns(this.columnsOption2)
    this.myGrid.ctx.reGenerateColumns();
  }


  singleClick(e) {
    console.log("click")
  }


  singleDblClick(e) {
    console.log("dblClick")
  }

  // sort1(){
  //   let sortArray = [
  //     {attribute:"name", asc:true},
  //     {attribute:"number", asc:false}
  //   ]
  //
  //   this.myGrid.ctx.orderBy(sortArray);
  //
  // }


  sort1(){
    var columns = this.myGrid.ctx.getColumns();
    columns.pop();
    this.myGrid.ctx.setColumns(columns)
    this.myGrid.ctx.reGenerateColumns();



  }

  sort2(){
    let sortArray = [
      {attribute:"name", asc:false},
      {attribute:"number", asc:false}
    ]

    this.myGrid.ctx.orderBy(sortArray);

  }

  columnsOption1 = [
    {
      colWidth:122,
      colField:"name"
    },
    {
      colWidth:122,
      colField:"bool"
    },
    {
      colWidth:122,
      colField:"number"
    }]


  columnsOption2 = [
    {
      colWidth: 100,
      colRowTemplate: null,
      colHeaderTemplate: null,
      colField: "name",
      colHeaderName: "Full name",
      colAddLabelAttributes: "",
      colAddFilterAttributes: "",
      colAddRowAttributes: "",
      colSort: "name",
      colFilter: true,
      colFilterTop: false,
      colCss: "",
      colType: "text"
    },
    {
      colWidth: 100,
      colRowTemplate: null,
      colHeaderTemplate: null,
      colField: "bool",
      colHeaderName: "Bool value",
      colAddLabelAttributes: "",
      colAddFilterAttributes: "",
      colAddRowAttributes: "",
      colSort: null,
      colFilter: true,
      colFilterTop: false,
      colCss: "",
      colType: "checkbox"
    }, {
      colWidth: 100,
      colRowTemplate: null,
      colHeaderTemplate: null,
      colField: "number",
      colHeaderName: "Salery",
      colAddLabelAttributes: "",
      colAddFilterAttributes: "",
      colAddRowAttributes: "",
      colSort: null,
      colFilter: true,
      colFilterTop: false,
      colCss: "color:${tempRef.numberColor};font-weight:${tempRef.numberFont}",
      colType: "text"
    }]



}
