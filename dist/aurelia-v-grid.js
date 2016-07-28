import {Aurelia,inject,customAttribute,BindingEngine,noView,customElement,bindable,processContent,TargetInstruction,Container,ViewSlot,TaskQueue,ViewCompiler,ViewResources,containerless} from 'aurelia-framework';

/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [
    './vGrid/v-grid-element-footer-pager',
    './vGrid/v-grid-element-row-repeat',
    './vGrid/v-grid-element-col-config',
    './vGrid/v-grid.js',
    './vGrid/v-grid-attributes-filter',
    './vGrid/v-grid-attributes-sort',
    './vGrid/v-grid-attributes-selection',
    './vGrid/v-grid-attributes-image',
    './vGrid/v-grid-attributes-key-move',
    './vGrid/v-grid-attributes-contextmenu',
    './vGrid/v-grid-attributes-observe-field',
    './vGrid/v-grid-attributes-dragDropCol',
    './vGrid/v-grid-attributes-resize-col'
  ];

}

export function configure(aurelia: Aurelia, configCallback?: (builder: ConfigBuilder) => void) {
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}

export function configure(config) {
  config.globalResources(
    './v-grid-element-footer-pager',
    './v-grid-element-row-repeat',
    './v-grid-element-col-config',
    './v-grid',
    './v-grid-attributes-filter',
    './v-grid-attributes-sort',
    './v-grid-attributes-selection',
    './v-grid-attributes-image',
    './v-grid-attributes-key-move',
    './v-grid-attributes-contextmenu',
    './v-grid-attributes-observe-field',
    './v-grid-attributes-dragDropCol',
    './v-grid-attributes-resize-col'
  );
}

export function configure(config) {
  config.globalResources(
    'vGrid/v-grid-element-footer-pager',
    'vGrid/v-grid-element-row-repeat',
    'vGrid/v-grid-element-col-config',
    'vGrid/v-grid',
    'vGrid/v-grid-attributes-filter',
    'vGrid/v-grid-attributes-sort',
    'vGrid/v-grid-attributes-selection',
    'vGrid/v-grid-attributes-image',
    'vGrid/v-grid-attributes-key-move',
    'vGrid/v-grid-attributes-contextmenu',
    'vGrid/v-grid-attributes-observe-field',
    'vGrid/v-grid-attributes-dragDropCol',
    'vGrid/v-grid-attributes-resize-col'
  );
}

/*****************************************************************************************************************
 *    ContextMenu
 *    This is where I create all the <v-grid> attributes, and set then to vGridConfig
 *    Main idea/source https://github.com/callmenick/Custom-Context-Menu
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

/*****************************************************
 *  context menu for header
 ******************************************************/
@customAttribute('v-header-menu')
@inject(Element, VGrid)
export class VGridHeaderMenu extends Contextmenu {
  classToOpenOn = "vGrid-header-menu"; //class it opens menu on
  altMenuLogic = null; //alt menu to open


  //main menu listener
  menuItemListener(link) {
    var value = link.getAttribute("data-action");

    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value);
    }
  }


  canOpen() {
    return true;
  }


  //main menu to open
  menuHtmlMain() {
    return this.createMenuHTML([
      {
        action: "",
        value: this.getLang("menuMainHeaderOptions") || "Options",
        isHeader: true
      }, {
        action: "clear-cell",
        value: this.getLang("menuMainHeaderClearCell") || "Clear cell"
      }, {
        action: "clear-all",
        value: this.getLang("menuMainHeaderClearAllCells") || "Clear All Cells"
      }, {
        action: "show-all",
        value: this.getLang("menuMainHeaderShowAll") || "Show all (keep filter text)"
      }, {
        action: "set-filter",
        value: this.getLang("menuMainHeaderSetFilter") || "Set Filter"
      }
    ]);
  }


  //alt menu I manually set
  menuHtmlSetFilter() {
    return this.createMenuHTML([
      {
        action: "",
        value: this.getLang("menuFilterHeaderSetFilter") || "Set filter",
        isHeader: true
      }, {
        action: "set-filter-1",
        value: this.getLang("menuFilterHeaderEquals") || "equals"
      }, {
        action: "set-filter-2",
        value: this.getLang("menuFilterHeaderLessThanOrEq") || "less than or eq"
      }, {
        action: "set-filter-3",
        value: this.getLang("menuFilterHeaderGreaterThanOrEq") || "greater than or eq"
      }, {
        action: "set-filter-4",
        value: this.getLang("menuFilterHeaderLessThan") || "less than"
      }, {
        action: "set-filter-5",
        value: this.getLang("menuFilterHeaderGreaterThan") || "greater than"
      }, {
        action: "set-filter-6",
        value: this.getLang("menuFilterHeaderContains") || "contains"
      }, {
        action: "set-filter-7",
        value: this.getLang("menuFilterHeaderNotEqualTo") || "not equal to"
      }, {
        action: "set-filter-8",
        value: this.getLang("menuFilterHeaderDoesNotContain") || "does not contain"
      }, {
        action: "set-filter-9",
        value: this.getLang("menuFilterHeaderBeginsWith") || "begins with"
      }, {
        action: "set-filter-10",
        value: this.getLang("menuFilterEndsWith") || "ends with"
      }
    ]);
  }


  defaultMenu(value) {

    switch (value) {
      case "clear-cell" :
        this.triggerEvent("filterClearCell", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "clear-all" :
        this.triggerEvent("filterClearAll", {
          attribute: this.value
        });
        this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        this.toggleMenuOff();
        break;
      case "show-all":
        this.vGrid.vGridConfig.onFilterRun([]);
        this.toggleMenuOff();
        break;
      case "set-filter":
        this.replaceMenu(this.menuHtmlSetFilter());
        this.altMenuLogic = this.filterMenuLogic;
        break;
      default:
        this.toggleMenuOff();
    }
  }



  triggerEvent(name, data) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);
  }


  filterMenuLogic(value) {
    var newOperator = null;
    switch (value) {
      case "set-filter-1":
        newOperator = "=";
        break;
      case "set-filter-2":
        newOperator = "<=";
        break;
      case "set-filter-3":
        newOperator = ">=";
        break;
      case "set-filter-4":
        newOperator = "<";
        break;
      case "set-filter-5":
        newOperator = ">";
        break;
      case "set-filter-6":
        newOperator = "*";
        break;
      case "set-filter-7":
        newOperator = "!=";
        break;
      case "set-filter-8":
        newOperator = "!*";
        break;
      case "set-filter-9":
        newOperator = "*=";
        break;
      case "set-filter-10":
        newOperator = "=*";
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
    if (newOperator) {
      this.triggerEvent("filterUpdate", {
        attribute: this.value,
        operator: newOperator
      });
      this.toggleMenuOff();
    }


    this.altMenuLogic = null; //reset to main menu again
  }


}


/*****************************************************
 *  main context menu for row cells
 ******************************************************/

@customAttribute('v-row-menu')
@inject(Element, VGrid)
export class ContextRowMenu extends Contextmenu {
  classToOpenOn = "vGrid-row-menu"; //class it opens menu on
  altMenuLogic = null; //alt menu to open


  //main menu listener
  menuItemListener(link) {
    var value = link.getAttribute("data-action");
    if (this.altMenuLogic) {
      this.filterMenuLogic(value);
    } else {
      this.defaultMenu(value);
    }
  }


  canOpen() {
    return true;
  }


  //main menu to open
  menuHtmlMain() {
    return this.createMenuHTML([
      {
        action: "",
        value: this.getLang("menuRowOptions") || "Options",
        isHeader: true
      }, {
        action: "copy-cell",
        value: this.getLang("menuRowCopyCellValue") || "Copy cell value",
        isHeader: false
      }, {
        action: "paste-cell",
        value: this.getLang("menuRowCopyPasteIntoCell") || "Paste into cell/selected rows",
        isHeader: false
      }
    ]);
  }


  defaultMenu(value) {
    switch (value) {
      case "copy-cell":
        this.vGrid.vGridConfig.cellValue = this.bindingContext.rowRef[this.value];
        this.toggleMenuOff();
        break;
      case "paste-cell":
        if (this.vGrid.vGridConfig.cellValue !== null) {
          var rows = this.vGrid.vGridSelection.getSelectedRows();
          rows.forEach((x)=> {
            this.vGrid.vGridCollectionFiltered[x][this.value] = this.vGrid.vGridConfig.cellValue;
          });
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        this.toggleMenuOff();
        break;
      default:
        this.toggleMenuOff();
    }
  }

}

/*****************************************************************************************************************
 *    Drag drop columns for the grid
 *    can not be used with row-repeat... yet
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-drag-drop-col')
@inject(Element, VGrid)
export class vGridDragDropCol {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.dragEl;
    this.canMove = false;
    this.sortable = false;
    this.onDragOverX = this.onDragOver.bind(this);
    this.onDragEndX = this.onDragEnd.bind(this);
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }

  attached() {
    this.setDragHandles();

    //need to be better, will change when I rebuild header into custom element
    this.rootEl = this.vGrid.vGridGenerator.headerScrollElement; //this is BAD!

    //add event listeners for draggable
    this.mainCol.addEventListener('dragstart', this.onDragStart.bind(this), false);


    //event listener for when starting to drag
    this.vGrid.element.addEventListener("vGridDragStart", ()=> {
      this.drophelper.style["z-index"] = "100";
    });


    //event listener when stopped dragging
    this.vGrid.element.addEventListener("vGridDragStop", ()=> {
      this.drophelper.style["z-index"] = "-100";
    });


  }


  /***************************************************
   * sets drag handle
   *****************************************************/
  setDragHandles() {

    //add drag class
    this.element.classList.add("vGrid-vGridDragHandle");


    //get column element
    let mainCol = this.element;
    while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
      mainCol = mainCol.parentNode;
    }
    this.mainCol = mainCol;


    //create drop helper (so we dont get switching on wide columns)
    var drophelper = document.createElement("v-grid-drop");
    drophelper.style.width = "30px";
    drophelper.style.bottom = 0;
    drophelper.style.top = 0;
    drophelper.style.left = parseInt(this.mainCol.clientWidth / 2) - 15 + "px";
    //drophelper.style["background-color"] = "blue"; //enable to see them
    drophelper.style["z-index"] = "-100";
    drophelper.style.position = "absolute";
    this.mainCol.appendChild(drophelper);
    this.drophelper = drophelper;


    //helpers
    this.element.onmouseenter = () => {
      this.canMove = true;
      //add draggable to elements
      this.setDraggable(true);
    };


    //helpers
    this.element.onmouseleave = () => {
      this.canMove = false;
      //remove draggable to elements
      this.setDraggable(false);
    };


  }


  /***************************************************
   * sets the elements draggable attribute
   *****************************************************/
  setDraggable(newStatus) {
    this.mainCol.draggable = newStatus;
  }


  /***************************************************
   * updates columns
   *****************************************************/
  updateColumns() {

    //temp arrays
    let tempArr = [];
    let vGridConfig = [];


    //loop em and build temp arrays and set new column number
    var dragHandles = this.vGrid.vGridGenerator.gridElement.getElementsByTagName('v-grid-header-col');
    [].slice.call(dragHandles).forEach((itemEl, index) => {
      tempArr.push(parseInt(itemEl.getAttribute("column-no")));
      vGridConfig.push(null);
      itemEl.setAttribute("column-no", index);
    });


    //reorder to new column no
    tempArr.forEach((oldI, newI) => {
      vGridConfig[newI] = this.vGrid.vGridConfig.colConfig[oldI];
    });


    //set new columnconfig
    this.vGrid.vGridConfig.colConfig = vGridConfig;


    //reset template and fill data
    this.vGrid.vGridGenerator.rowTemplate = null;


    //rebuild the columns
    this.vGrid.vGridGenerator.rebuildColumnsRows();


  }


  /***************************************************
   * when starting dragging
   *****************************************************/
  onDragStart(evt) {

    if (this.canMove) {

      //get target
      this.dragEl = evt.target;

      //get our column no
      this.colNo = parseInt(this.dragEl.getAttribute("column-no"));

      //dispatch event so all make  dropzone
      let event = new CustomEvent("vGridDragStart", {
        detail: "",
        bubbles: true
      });
      this.vGrid.element.dispatchEvent(event);


      this.sortable = true;


      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', '');

      this.rootEl.addEventListener('dragover', this.onDragOverX, false);
      this.rootEl.addEventListener('dragend', this.onDragEndX, false);

      setTimeout(()=> {
        this.dragEl.classList.add('ghost');
      }, 0);
    } else {
      evt.preventDefault();
    }

  }


  /***************************************************
   * when dragging over event(moving)
   *****************************************************/
  onDragOver(evt) {

    //why?
    if (evt.preventDefault !== void 0) {
      evt.preventDefault();
      evt.stopPropagation();
    }

    //set temp col
    let colNo = -1;

    //get column
    let target = evt.target;
    if (target) {
      while (target.nodeName !== 'V-GRID-HEADER-COL') {
        target = target.offsetParent;
      }

      colNo = parseInt(target.getAttribute("column-no"));
      var targetNode = evt.target.nodeName === 'V-GRID-DROP';


      if (colNo !== this.colNo && targetNode && colNo > -1) {
        var after = colNo + 1 !== this.colNo;// && !isLong || halfway && isLong;

        //reset colNo
        this.colNo = colNo;

        //move
        this.rootEl.insertBefore(this.dragEl, after ? target.nextElementSibling : target);

        //update columns
        this.updateColumns();


      }
    }


  }


  /***************************************************
   * when drag event have ended
   *****************************************************/
  onDragEnd(evt) {

    evt.preventDefault();

    //trigger dragdrop so all updates and remove ghost/events
    let event = new CustomEvent("vGridDragStop", {
      detail: "",
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);

    this.dragEl.classList.remove('ghost');
    this.rootEl.removeEventListener('dragover', this.onDragOverX, false);
    this.rootEl.removeEventListener('dragend', this.onDragEndX, false);
    this.sortable = false;
  }


}

/*****************************************************************************************************************
 *    Attributes for header so users can add to headers to activate filtering
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-filter')
@inject(Element, VGrid)
export class vGridAttributesFilter {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  get valueConverters() {
    if (this.vGrid) {
      return this.vGrid.viewResources.lookupFunctions.valueConverters;
    }
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //splitt options
    let values = this.value.split("|");

    //get attribute
    this.attribute = values[0].trim();

    //loop values and find out what options are
    if (values.length > 1) {
      values.forEach((value, i)=> {
        if (i !== 0) {
          this.checkParams(value);
        }
      });
    }

    this.filterOn = this.filterOn || "onEnterKey";
    this.filterOperator = this.filterOperator || "=";
    this.valueFormater = this.valueFormater || null;
    this.type = this.element.type;
    this.state = 0;

  }


  checkParams(value) {

    if (value !== undefined && value !== null) {
      value = value.trim();
    }

    let valueConverter = this.valueConverters(value);
    if (valueConverter) {
      this.valueFormater = valueConverter;
    }

    let filterOperator = this.vGrid.vGridFilter.filterOperatorTableString[value];
    if (filterOperator) {
      this.filterOperator = value;
    }

    if (value === "onKeyDown") {
      this.filterOn = value;
    }


  }


  getValue() {
    if (this.type !== "checkbox") {
      return this.valueFormater ? this.valueFormater.fromView(this.element.value) : this.element.value;
    } else {
      return this.state ? this.state === 2 ? true : false : "";
    }
  }


  resetValue() {
    if (this.type !== "checkbox") {
      this.element.value = "";
    } else {
      this.state = 0;
      this.element.checked = false;
    }
  }


  updateFilter(curFilter) {
    var filterIndex = null;

    //get index of filter
    curFilter.forEach((filter, index)=> {
      if (filter.attribute === this.attribute) {
        filterIndex = index;
      }
    });

    if (filterIndex !== null) {

      //we found a filter, lets update
      if (this.getValue() === "") {
        curFilter.splice(filterIndex, 1);
      } else {
        curFilter[filterIndex].value = this.getValue();
        curFilter[filterIndex].operator = this.filterOperator;
      }

    } else {

      //we didnt find filter, lets add one
      if (this.getValue() !== "") {
        curFilter.push({
          attribute: this.attribute,
          operator: this.filterOperator,
          value: this.getValue()
        });
      }

    }
  }


  attached() {

    if (this.attribute) { //if no attibute we do not want to do anything

      this.vGrid.element.addEventListener("filterUpdate", (e)=> {
        if (e.detail.attribute === this.attribute) {
          this.filterOperator = e.detail.operator;
          this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
        }
      });


      this.vGrid.element.addEventListener("filterClearCell", (e)=> {
        if (e.detail.attribute === this.attribute) {
          this.resetValue();
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
        }
      });

      this.vGrid.element.addEventListener("filterClearAll", ()=> {
        this.resetValue();
        this.updateFilter(this.vGrid.vGridFilter.lastFilter);
      });


      if (this.type !== "checkbox") {

        this.element.placeholder = this.vGrid.vGridFilter.filterOperatorTableString[this.filterOperator];


        //add eveent listner
        this.element.onkeyup = (e) => {
          if (e.keyCode === 13) {

            //if they hit enter we need to get filter, update and run query
            this.updateFilter(this.vGrid.vGridFilter.lastFilter);
            this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);

          } else {

            //if they hit enter we need to get filter, update
            this.updateFilter(this.vGrid.vGridFilter.lastFilter);
            if (this.filterOn === "onKeyDown") {
              this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
            }
          }
        };


      } else {
        //set default!
        this.element.style.opacity = 0.3;
        //is checkbox
        this.element.onclick = (e) => {
          switch (this.state) {
            case 0:
              this.state = 2;
              this.element.style.opacity = 1;
              break;
            case 2:
              this.state = 3;
              this.element.style.opacity = 1;
              break;
            default:
              this.element.checked = false;
              this.state = 0;
              this.element.style.opacity = 0.3;
          }
          this.updateFilter(this.vGrid.vGridFilter.lastFilter);
          this.vGrid.vGridConfig.onFilterRun(this.vGrid.vGridFilter.lastFilter);
        }


      }
    }
  }
}

/*****************************************************************************************************************
 *    quickfix/hack until they fix this
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-image-fix')
@inject(Element, VGrid)
export class vGridAttributesImageFix {

  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    let x = this.element.src;
    this.element.src = "";
    this.element.src = x;
  }

  attached() {

  }


}

/*****************************************************************************************************************
 *    Attributes for tabbing, keyup/down and page up/down
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-key-move')
@inject(Element, VGrid)
export class vGridAttributesKeyMove {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.classname = "v-grid-key-move";
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {
    this.element.classList.add(this.classname);
    this.addGridKeyListner();

    this.element.addEventListener('tabbing', (e)=> {
      this.element.focus();

      let ev = document.createEvent('Event');
      ev.initEvent("click", true, true);
      this.element.offsetParent.dispatchEvent(ev);

    });


    this.element.addEventListener('focus', ()=> {

      if (this.vGrid.vGridCurrentEntityRef === null) {
        let ev = document.createEvent('Event');
        ev.initEvent("click", true, true);
        this.element.offsetParent.dispatchEvent(ev);
      }




    });

  }


  /***************************************************************************************
   * for setting next cell ny similating a mouse click, used for tabbing etc
   ***************************************************************************************/
  dispatchCellClick(index) {
    var e = document.createEvent('Event');
    e.initEvent("tabbing", true, true);

    if (this.cells[index]) {
      this.cells[index].dispatchEvent(e);
    }
  }


  /***************************************************************************************
   * sets "the cells" from  to direction asked for, so tabbing jumps to next row
   ***************************************************************************************/
  setCellsFromElement(node, direction) {
    var thisTop;
    var element;
    for (var i = 0; i < 10; i++) {
      try {
        if (node.classList.contains(this.vGrid.vGridConfig.css.row)) {
          var row = parseInt(node.getAttribute("row"));
          for (var y = 0; y < this.vGrid.vGridGenerator.rowElementArray.length; y++) {
            if (row === parseInt((this.vGrid.vGridGenerator.rowElementArray[y].top / this.vGrid.vGridConfig.attRowHeight))) {
              this.row = row;
              thisTop = this.vGrid.vGridGenerator.rowElementArray[y + direction].top;
              element = this.vGrid.vGridGenerator.rowElementArray[y + direction].div;
            }
          }
        }
        node = node.parentNode;
      } catch (err) {
        //nothing for now
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
    }
    return thisTop;
  }


  /***************************************************************************************
   * sets "the cells" from a top value, used for page up/down
   ***************************************************************************************/
  setCellsFromTopValue(top) {
    var element = 0;
    for (var i = 0; i < this.vGrid.vGridGenerator.rowElementArray.length; i++) {
      if (this.vGrid.vGridGenerator.rowElementArray[i].top === top) {
        element = this.vGrid.vGridGenerator.rowElementArray[i].div;
      }
    }
    if (element) {
      this.cells = element.querySelectorAll("." + this.classname);
    }

  }


  /***************************************************************************************
   * simple delay for the keydown events, like tabbing etc, so I cantrol the speed of it
   ***************************************************************************************/
  keyDownDelay(callback) {
    if (!this.timer) {
      this.timer = setTimeout(()=> {
        this.timer = null;
        callback();
      }, 150);
    }
  }


  /***************************************************************************************
   * get the index
   ***************************************************************************************/
  getIndex() {
    for (var i = 0; i < this.cells.length; i++) {
      if (this.element === this.cells[i]) {
        this.index = i;
        if (i === 0) {
          this.first = true;
        } else {
          this.first = false;
        }
        if (i === this.cells.length - 1) {
          this.last = true;
        } else {
          this.last = false;
        }

      }
    }
  }


  /***************************************************************************************
   * adds main keys, like arrow keys, tab, and page up/down
   ***************************************************************************************/
  addGridKeyListner() {


    this.element.onkeydown = (e) => {


      this.setCellsFromElement(this.element, 0);
      this.getIndex();


      //page up
      if (e.keyCode === 33) {
        e.preventDefault();
        this.keyDownDelay(() => {


         //get content height/rows
          var rowHeight = this.vGrid.vGridConfig.attRowHeight;
          var containerHeight = this.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          this.top = this.setCellsFromElement(this.element, 0);

          var newTop = this.top - (containerRows * rowHeight);
          if ((newTop / rowHeight) <= 0) {
            newTop = 0;
          }


          //if last scroll was up then we need to reverse the buffer
          if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
            this.vGrid.vGridScrollEvents.onSmallScroll(false);
          }

          this.setCellsFromTopValue(newTop);
          this.dispatchCellClick(this.index);

          var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
          this.vGrid.vGridClientCtx.setScrollTop(setTop);


        });
      }


      //page down
      if (e.keyCode === 34) {
        e.preventDefault();
        this.keyDownDelay(() => {


          //get scrolltop
          var currentscrolltop = this.vGrid.vGridClientCtx.getScrollTop();

          //get content height/rows
          var rowHeight = this.vGrid.vGridConfig.attRowHeight;
          var containerHeight = this.vGrid.vGridGenerator.contentElement.clientHeight;
          var containerRows = parseInt(containerHeight / rowHeight, 10);
          this.top = this.setCellsFromElement(this.element, 0);

          var newTop = this.top + (containerRows * rowHeight);
          if ((newTop / rowHeight) >= this.vGrid.vGridConfig.getCollectionLength()) {
            newTop = this.vGrid.vGridConfig.getCollectionLength() * rowHeight;
            newTop = newTop - rowHeight
          }

          //if last scroll was up then we need to reverse the buffer
          if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
            this.vGrid.vGridScrollEvents.onSmallScroll(true);
          }

          this.setCellsFromTopValue(newTop);
          this.dispatchCellClick(this.index);

          var setTop = newTop - parseInt((containerRows * rowHeight) / 2);
          this.vGrid.vGridClientCtx.setScrollTop(setTop);
        });
      }

      //arrow down
      if (e.keyCode === 40) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
            this.vGrid.vGridScrollEvents.onSmallScroll(true);
          }
          this.top = this.setCellsFromElement(this.element, +1);
          this.dispatchCellClick(this.index)
        });
      }


      //arrow up
      if (e.keyCode === 38) {
        e.preventDefault();
        this.keyDownDelay(() => {
          if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
            this.vGrid.vGridScrollEvents.onSmallScroll(false);
          }
          this.top = this.setCellsFromElement(this.element, -1);
          this.dispatchCellClick(this.index)
        });
      }


      //tab and shift key for tabing in other direction
      if (e.keyCode === 9 && e.shiftKey === true) {
        if (this.row !== 0 && this.first) {
          e.preventDefault();
          this.keyDownDelay(() => {
            this.index = this.index - 1;
            if (this.first) {
              if (this.vGrid.vGridScrollEvents.lastScrollType === "down") {
                this.vGrid.vGridScrollEvents.onSmallScroll(false);
              }
              this.index = this.cells.length - 1;
              this.top = this.setCellsFromElement(this.element, -1)
            }
            this.dispatchCellClick(this.index)

          });
        }
      }


      //normal tabbing
      if (e.keyCode === 9 && e.shiftKey === false) {


        e.preventDefault();
        this.keyDownDelay(() => {
          this.index = this.index + 1;
          if (this.last) {
            if (this.vGrid.vGridScrollEvents.lastScrollType === "up") {
              this.vGrid.vGridScrollEvents.onSmallScroll(true);
            }
            this.index = 0;
            this.top = this.setCellsFromElement(this.element, 1)
          }
          this.dispatchCellClick(this.index)
        });

      }

    }
  }


}

/*****************************************************************************************************************
 *    Just to have instant update on row events over to current entity
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-observe-field')
@inject(Element, VGrid, BindingEngine)
export class vGridAttributesObserveField {


  constructor(element, vGrid, bindingEngine) {
    this.vGrid = vGrid;
    this.element = element;
    this.timer = null;
    this.bindingEngine = bindingEngine;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    if(this.propertyObserver){
      this.propertyObserver.dispose();
      this.propertyObserver = null;
    }

    let attribute = this.value;

    //if there is any value and rowRef
    if (attribute && this.bindingContext.rowRef) {

      //remove old binding to current entity
      this.vGrid.vGridObservables.disableObservablesAttributes();

      //add to our observer array
      var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
      let attribute = this.value;
      //if not allready added, then lets add them
      if (attAttributeObserve.indexOf(attribute) === -1 && attribute) {
        attAttributeObserve.push(attribute);
      }
      //enable observer
      this.vGrid.vGridObservables.enableObservablesAttributes();


      //observe property on rowref
      this.propertyObserver = this.bindingEngine.propertyObserver(this.bindingContext.rowRef, this.value).subscribe((newValue, oldValue) => {

        //should I do the value formatting on the currentEntity also?
        var newValueCheck = (newValue !== undefined && newValue !== null) ? newValue.toString() : newValue;
        var oldValueCheck = (oldValue !== undefined && oldValue !== null) ? oldValue.toString() : oldValue;

        if (newValueCheck !== oldValueCheck && this.vGrid.vGridCurrentEntityRef) {
          this.vGrid.vGridCurrentEntity[this.value] = newValue;
        }
      });
    }

  }

  unbind() {
    if(this.propertyObserver){
      this.propertyObserver.dispose();
      this.propertyObserver = null;
    }

  }


}

/*****************************************************************************************************************
 *    Adds resizing to the columns
 *    Can not be used with row repeat... not atleast yet..
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-resize-col')
@inject(Element, VGrid)
export class vGridAttributesResizeCol {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.vGridConfig = this.vGrid.vGridConfig;
    this.vGridGenerator = this.vGrid.vGridGenerator;
    this.element = element;
    this.resizable = false;
    this.screenX;
    this.index;
    this.originalWidth;

  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

  }


  attached() {

    //get the column element
    let mainCol = this.element;
    while (mainCol.nodeName !== 'V-GRID-HEADER-COL') {
      mainCol = mainCol.parentNode;
    }
    this.mainCol = mainCol;

    //add resize handle
    var resizeHandle = document.createElement("DIV");
    resizeHandle.classList.add(this.vGridConfig.css.resizeHeaderDragHandle);

    //register onmouse doen event
    resizeHandle.onmousedown = (e) => {
      this.onmousedown(e);
    };

    //add
    this.mainCol.appendChild(resizeHandle);

  }

  /**************************************************
   *  when mouse button is let go
   **************************************************/
  onmouseup() {

    //set state
    this.resizable = true;

    //remove events
    this.vGridGenerator.headerElement.onmouseleave = "";
    this.vGridGenerator.headerElement.onmousemove = "";
    this.vGridGenerator.headerElement.onmouseup = "";

    //update this column width
    this.vGridConfig.colConfig[this.index].colWidth = parseInt(this.mainCol.style.width);

    //reset template and fill data
    this.vGridGenerator.rowTemplate = null;
    this.vGridGenerator.correctRowAndScrollbodyWidth();
    this.vGridGenerator.recreateRowViewSlots();
    this.vGridGenerator.updateGridScrollbars();
    this.vGridGenerator.rebindAllRowSlots(true);

  }


  /**************************************************
   *  when mouse moving mouse
   **************************************************/
  onmousemove(e) {

    //get when user let go of mouse button
    this.vGridGenerator.headerElement.onmouseup = () => {
      this.onmouseup();
    };

    //if mouse leaves header we want to stop, else it just gets buggy
    this.vGridGenerator.headerElement.onmouseleave = (e) => {
      this.vGridGenerator.headerElement.onmouseup(e);
    };

    //update
    if (this.resizable) {
      this.updateHeader(e);
    } else {
      this.vGridGenerator.correctHeaderAndScrollbodyWidth();
    }
  }


  /**************************************************
   *  updates the actual header/row column width
   **************************************************/
  updateHeader(e) {

    //updates
    var newWidth = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
    if (parseInt(newWidth) > 15) {
      this.vGridConfig.colConfig[this.index].colWidth = parseInt(newWidth);
      this.mainCol.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";
      this.mainCol.style.width = parseInt(this.originalWidth) - ((this.screenX - e.screenX)) + "px";

      //if resize also row attribute is set to true, then we also need to update them
      if (this.vGridConfig.attResizableHeadersAndRows) {

        //get the columns of the row
        var columnsToFix = this.vGridGenerator.contentElement.firstChild.querySelectorAll("." + this.vGridConfig.css.rowColumn + this.index);

        //loop the columns and update each row
        for (var col = 0; col < columnsToFix.length; col++) {
          columnsToFix[col].style.width = newWidth;
        }

        //update scrollbars and row widths
        this.vGridGenerator.correctRowAndScrollbodyWidth();
        this.vGridGenerator.updateGridScrollbars();

      }
    }

  }


  /**************************************************
   *  when mouse down, resizing starts
   **************************************************/
  onmousedown(e) {
    //set state
    this.resizable = true;

    //get som vars
    this.screenX = e.screenX;
    this.originalWidth = this.mainCol.style.width;
    this.index = this.mainCol.getAttribute("column-no");
    this.started = false;


    //add mouse move event
    this.vGridGenerator.headerElement.onmousemove = (e) => {
      this.started = true;
      this.onmousemove(e);
    };


    //incase they just release right away
    this.vGridGenerator.headerElement.onmouseup = () => {
      if (!this.started) {
        this.vGridGenerator.headerElement.onmousemove = "";
      }
    };

  }


}

/*****************************************************************************************************************
 *    Attributes for row/header, enables checkbox , manual selection much be used with this
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-selection')
@inject(Element, VGrid)
export class vGridAttributesSelection {

  
  
  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
    this.false = true;
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
    if (this.created) {
      this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
      this.element.checked = this.selected;
    }
  }


  attached() {

    this.created = true;
    this.selected = this.vGrid.vGridSelection.isSelected(this.bindingContext.row);
    this.element.checked = this.selected;

    this.element.onclick = () => { 

      var status = this.element.checked === "true" || this.element.checked === true ? true : false;

      if (status) {
        if (this.value === "header") {
          this.vGrid.vGridSelection.selectAll();
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }
        if (this.value === "row") {
          this.vGrid.vGridSelection.select(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.rebindRowNumber(this.bindingContext.row);
        }
      } else {

        if (this.value === "header") {
          this.vGrid.vGridSelection.deSelectAll();
          this.vGrid.vGridGenerator.rebindAllRowSlots();
        }

        if (this.value === "row") {
          this.vGrid.vGridSelection.deSelect(this.bindingContext.row, true);
          this.vGrid.vGridGenerator.rebindRowNumber(this.bindingContext.row);
        }
      }

    };


  }


}

/*****************************************************************************************************************
 *    Attributes for header, enables sorting
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customAttribute('v-sort')
@inject(Element, VGrid)
export class vGridAttributesSort {


  constructor(element, vGrid) {
    this.vGrid = vGrid;
    this.element = element;
  }



  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;

    //get values
    let values = this.value.split("|");
    this.attribute = values[0];

  }


  attached() {
    this.sortIcon = document.createElement("SPAN");
    this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    this.element.appendChild(this.sortIcon);
    this.element.onclick = (e)=> {
      this.vGrid.vGridConfig.onOrderBy(this.attribute, e.shiftKey);
    };

    this.vGrid.element.addEventListener("sortIconUpdate", ()=> {
      this.sortIcon.innerHTML = this.getSortIconMarkup(this.attribute);
    });
  }


  getSortIconMarkup(attribute) {
    var css = this.vGrid.vGridConfig.css;

    var markup = `<span  class="${css.sortIcon} ${css.sortIconSort}"></span>`;
    var isAscHtml = `<span  class="${css.sortIcon} ${css.sortIconAsc}"></span>`;
    var isDescHtml = `<span  class="${css.sortIcon} ${css.sortIconDesc}"></span>`;


    this.vGrid.vGridSort.getFilter().forEach((x) => {
      if (x.attribute === this.attribute) {
        var block = x.asc === true ? isAscHtml : isDescHtml;
        var main = `<span $ class="${css.sortIconNo}" data-vgridsort="${x.no}"></span>`;
        markup = main + block;
      }
    });

    return markup;
  }


}

/*****************************************************************************************************************
 *    VGridConfig
 *    This generates the config used by vGridgenerator, other classes also calls this to get the information, also have misc utillity functions
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridConfig {


  /***************************************************************************************
   * CSS classes used by grid
   ***************************************************************************************/
  css = {
    wrapper: "vGrid",
    row: "vGrid-row",
    mainHeader: "vGrid-header",
    mainContent: "vGrid-body",
    mainFooter: "vGrid-footer",
    scrollBody: "vGrid-body-scroll",
    rowColumn: "vGrid-row-column",
    rowHeaderColumn: "vGrid-row-column-header",
    rowHeader: "vGrid-row-header",
    rowSelected: "vGrid-row-selected",
    rowContainer: "vGrid-row-container",
    rowAlt: "vGrid-row-alt",
    rowEven: "vGrid-row-even",
    dragHandle: "vGrid-vGridDragHandle",
    resizeHeaderDragHandle: "vGrid-draggable-handler",
    sortIcon: "vGrid-glyphicon",
    sortIconSort: "vGrid-glyphicon-sort",
    sortIconAsc: "vGrid-glyphicon-sort-asc",
    sortIconDesc: "vGrid-glyphicon-sort-desc",
    sortIconNo: "vGrid-glyphicon"
  };


  /***************************************************************************************
   * different attributes used by grid
   ***************************************************************************************/
  atts = {
    dataAttribute: "v-grid-data-attribute",
    dataAttributeFilter: "v-grid-data-attribute-filter"
  };


  /***************************************************************************************
   * default settings, v-grid-col.js and v-grid-atts populate these defaults with new values
   ***************************************************************************************/
  constructor(vGrid) {
    this.vGrid = vGrid;

    //<v-grid-col> attributes
    this.colConfig = [];

    //count of columns;
    this.columnLength = 0;

    //<v-grid> attibutes
    this.attAttributeObserve = [];
    this.attRowHeight = 50;
    this.attHeaderHeight = 0;
    this.attFooterHeight = 0;
    this.attResizableHeaders = false;
    this.attMultiSelect = undefined;
    this.attSortableHeader = false;
    this.attLoadingThreshold = -1; //for when loading screen comes on
    this.attRemoteIndex = false;
    this.attManualSelection = false;
    this.eventOnRowDraw = null;
    this.eventOnRowClick = null;
    this.eventOnRowDblClick = null;
    this.eventOnRemoteCall = null;
    this.attHidePagerInfo = false;
    this.attCustomPager = null;
    this.attLanguage = {};
    this.attOnlyCustom = false; //to stop markup generator for adding attributes when in simple and column config

    //repeat html vars
    this.repeater = false;
    this.repeatRowTemplate = null;


    //static atm (dunno if I want them as options yet)
    this.attDataScrollDelay = 200;
    this.attRequestAnimationFrame = true;
    this.attResizableHeadersAndRows = true; //is just here if someone for some reson would like to just resize header, and fix rows after
    this.attRenderOnScrollbarScroll = true;


    //remote internal vars
    this.keepFilterOnCollectionChange = false; //for keeping the sorticons like they are
    this.remoteLimit = 40;
    this.remoteLength = 0;
    this.remoteOffset = 0;


  }


  /***************************************************************************************
   *  utillity functions for setting attibutes default, and converting them
   ***************************************************************************************/

  setValue(htmlAttributeValue, defaultValue) {
    var value = defaultValue;
    if (htmlAttributeValue !== undefined && htmlAttributeValue !== null && !isNaN(htmlAttributeValue)) {
      value = htmlAttributeValue;
    }
    return value;
  }


  setBindValueArray(value, toProperty) {
    if (value !== undefined && value !== null) {
      var tempArray = value.split(",");
      tempArray.forEach((prop)=> {
        prop = prop.trim();
      });
      this[toProperty] = tempArray;
    }
  }


  setBindValueInt(value, toProperty) {
    this[toProperty] = this.setValue(parseInt(value), this[toProperty]);
  }

  
  setBindValueString(value, toProperty) {
    if (typeof(value) === "string" && value !== '' && value !== undefined && value !== null) {
      if(toProperty === "attRemoteIndex"){
        //this one is special, for tracking remote
        this[toProperty] = true;
        this.vGrid.vGridRowKey = value;
      } else {
        this[toProperty] = value;
      }


    }

  }


  setBindValueFunction(value, toProperty) {
    if (typeof(value) === "function") {
      this[toProperty] = value;
    }
  }


  setBindValueBool(value, toProperty) {
    let type = {
      "true": true,
      "false": false
    };
    this[toProperty] = this.setValue(type[value], this[toProperty]);
  }


  /***************************************************************************************
   * loops current rowRef and create tempRef that gets sent to onRowDraw
   ***************************************************************************************/
  getRowProperties(obj) {
    if (obj) {
      var x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      return x;
    } else {
      return "";
    }
  }


  /***************************************************************************************
   * calls remote function
   ***************************************************************************************/
  remoteCall(data) {
    data = data ? data : {};
    this.eventOnRemoteCall({
      filter: data.filter || this.vGrid.vGridFilter.lastFilter,
      sort: data.sort || this.vGrid.vGridSort.getFilter(),
      limit: data.limit || this.remoteLimit,
      offset: data.offset || this.remoteOffset
    })
      .then((data)=> {

        this.vGrid.vGridObservables.disableObservablesArray();
        this.vGrid.vGridObservables.disableObservablesCollection();
        this.vGrid.vGridCollection = data.col;
        this.remoteLimit = data.limit;
        this.remoteLength = data.length;
        this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
        this.vGrid.checkKeys();
        this.vGrid.vGridCurrentRow = -1;
        if (!this.attRemoteIndex) {
          this.vGrid.vGridSelection.reset();
        }
        this.vGrid.vGridGenerator.collectionChange();
        this.vGrid.loading = false;
        this.vGrid.vGridPager.updatePager({
          limit: this.remoteLimit,
          offset: this.remoteOffset,
          length: this.remoteLength
        });
        setTimeout(()=> {
          this.vGrid.vGridObservables.enableObservablesArray();
          this.vGrid.vGridObservables.enableObservablesCollection();
        }, 200);
      });


  }


  /***************************************************************************************
   * This is called when grid runs filter
   ***************************************************************************************/
  onFilterRun = (filterObj) => {

    if (filterObj.length !== 0 || this.vGrid.vGridCollectionFiltered.length !== this.vGrid.vGridCollection.length || this.eventOnRemoteCall) {

      //set loading screen
      if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      //run query
      setTimeout(()=> {
        //get current key if there is any, need this to find current row after filter
        var curKey = -1;
        if (this.vGrid.vGridCurrentEntityRef) {
          curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
        }


        //if remotecall is set then lets use that
        if (this.eventOnRemoteCall) {

          //set last filter they just set
          this.vGrid.vGridFilter.lastFilter = filterObj;

          //on filter we need to set offset to 0
          this.remoteOffset = 0;

          //trigger remote call
          this.remoteCall();

        } else {


          //run filter
          this.vGrid.vGridCollectionFiltered = this.vGrid.vGridFilter.run(this.vGrid.vGridCollection, filterObj);


          //run sorting
          this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);


          //set current row/entity in sync
          var newRowNo = -1;
          if (curKey) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (curKey === x[this.vGrid.vGridRowKey]) {
                newRowNo = index;
              }
            });
          }


          //update current row/current entity/entity ref
          if (newRowNo > -1) {
            this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[newRowNo];
            this.vGrid.vGridCurrentEntity[this.vGrid.vGridRowKey] = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
            this.vGrid.vGridCurrentRow = newRowNo;
          } else {
            this.vGrid.vGridCurrentRow = newRowNo;
          }


          //update grid rows
          this.vGrid.vGridGenerator.collectionChange(true);
          this.vGrid.loading = false;
        }

      }, 50);

    }


  };


  /***************************************************************************************
   * grid asks for the filter name from attibute
   ***************************************************************************************/
  getFilterName(name) {
    return this.vGrid.vGridFilter.getNameOfFilter(name)
  }


  /***************************************************************************************
   * This just sets data from array,
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  getDataElement(row, isDown, isLargeScroll, callback) {
    if (this.vGrid.vGridCollectionFiltered !== undefined) {
      if (this.eventOnRowDraw) {
        //if user have added this then we call it so they can edit the row data before we display it
        var data = this.getRowProperties(this.vGrid.vGridCollectionFiltered[row]);
        this.eventOnRowDraw({
            tempRef: data || null,
            rowRef: this.vGrid.vGridCollectionFiltered[row] || null
          }
        );
        callback(data)
      } else {
        callback(this.vGrid.vGridCollectionFiltered[row]);
      }
    }
  }


  /***************************************************************************************
   * This calls the order by function
   * Use {} if you want markup of columns, or undefined for total blank rows
   ***************************************************************************************/
  onOrderBy(attribute, add) {




    //can we do the sorting?
    if (this.vGrid.vGridCollectionFiltered.length > 0) {
      //set loading screen
      if (this.vGrid.vGridCollection.length > this.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      //set query
      setTimeout(()=> {
        //set filter
        this.vGrid.vGridSort.setFilter({
          attribute: attribute,
          asc: true
        }, add);


        let event = new CustomEvent("sortIconUpdate", {
          detail: "",
          bubbles: true
        });
        this.vGrid.element.dispatchEvent(event);


        //if remote call is set
        if (this.eventOnRemoteCall) {

          //trigger remote call
          this.remoteCall();

        } else {
          //run filter
          this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);


          //set new row
          if (this.vGrid.vGridCurrentEntityRef) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey] === x[this.vGrid.vGridRowKey]) {
                this.vGrid.vGridCurrentRow = index;
              }
            });
          }


          //update grid
          this.vGrid.vGridGenerator.collectionChange();
          this.vGrid.loading = false;
        }

      }, 50);
    }


  }


  /***************************************************************************************
   * Just for knowing length,
   * Its this you will need to add for server source/paging with endless scrolling
   ***************************************************************************************/
  getCollectionLength() {
    return this.vGrid.vGridCollectionFiltered.length;
  }


  /***************************************************************************************
   * Listen for click on rows(called from v-grid-generator eventlistner for the buffer rows it created)
   * Snd set current entity, and also allow edit of cell
   ***************************************************************************************/
  clickHandler(event, row) {


    //set current row of out filtered row
    this.vGrid.vGridCurrentRow = row;


    //get data ref
    this.vGrid.vGridCurrentEntityRef = this.vGrid.vGridCollectionFiltered[row];


    //loop properties and set them to current entity
    let data = this.vGrid.vGridCurrentEntityRef;
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        if (this.vGrid.vGridCurrentEntity[k] !== data[k]) {
          this.vGrid.vGridCurrentEntity[k] = data[k];
        }
      }
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for single on rows are set
    if (event.type === "click") {
      this.vGrid.raiseEvent("v-row-onclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }


    //this dispatch events that v-grid-row-col.js picks up, for calling back is event for dblclick on rows are set
    if (event.type === "dblclick") {
      this.vGrid.raiseEvent("v-row-ondblclick", {
        evt: event,
        data: this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow],
        row: this.vGrid.vGridGetRowKey(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey])
      });
    }


  }


  /****************************************************************************************************************************
   * calls user for element, user haveto use callback here, might also need to fetch data first..
   ****************************************************************************************************************************/
  updateRowBinding(rowNo, row, isDownScroll, isLargeScroll) {
    //called when drawing row
    //lets ask for our data, and insert it into row
    this.getDataElement(rowNo, isDownScroll, isLargeScroll,
      (entity) => {

        row.div.setAttribute("row", rowNo);

        if (entity === "") {
          let bindingContext = {};
          row.viewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });
        }

        if (entity !== "" && row.viewSlot !== null) {
          let tempRef = {};
          for (var k in entity) {
            if (entity.hasOwnProperty(k)) {
              if (tempRef[k] !== entity[k]) {
                tempRef[k] = entity[k];
              }
            }
          }
          var that = this;
          let bindingContext = {};
          bindingContext.row = rowNo;
          bindingContext.ctx = this;
          bindingContext.tempRef = tempRef;
          bindingContext.rowRef = this.vGrid.vGridCollectionFiltered[rowNo];
          row.viewSlot.bind(bindingContext, {
            bindingContext: bindingContext,
            parentOverrideContext: this.vGrid.overrideContext
          });
        }

        if (entity === undefined || entity === "" || entity === null) {
          row.div.style.display = "none";
        } else {
          row.div.style.display = "block";
        }

        //add alt/even css
        if (rowNo % 2 === 1) {
          if (row.div.classList.contains(this.css.rowEven)) {
            row.div.classList.remove(this.css.rowEven);
            row.div.classList.add(this.css.rowAlt);
          }

        } else {
          if (row.div.classList.contains(this.css.rowAlt)) {
            row.div.classList.remove(this.css.rowAlt);
            row.div.classList.add(this.css.rowEven);
          }
        }
        //set highlight
        if (this.vGrid.vGridSelection.isSelected(rowNo)) {
          row.div.classList.add(this.css.rowSelected)
        } else {
          row.div.classList.remove(this.css.rowSelected)
        }
      });
  };


}

/*****************************************************************************************************************
 *    Contextmenu
 *    Main class for attributes "context menu"
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class Contextmenu {

  constructor(element, vGrid) {
    this.element = element;
    this.vGrid = vGrid;

    //main classes, should I just add these to the v-grid-config?
    this.contextMenuClassName = "v-grid-context-menu";
    this.contextMenuItemClassName = "v-grid-context-menu__item";
    this.contextMenuLinkClassName = "v-grid-context-menu__link";
    this.contextMenuSplitClassName = "v-grid-context-menu__split";


    this.taskItemInContext = null;

    this.clickCoords = null;
    this.clickCoordsX = null;
    this.clickCoordsY = null;


    this.menuState = 0;
    this.menuWidth = null;
    this.menuHeight = null;
    this.menuPosition = null;
    this.menuPositionX = null;
    this.menuPositionY = null;

    this.windowWidth = null;
    this.windowHeight = null;


  }


  getLang(value) {
    return this.vGrid.vGridConfig.attLanguage[value];
  }


  bind(bindingContext, overrideContext) {
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }


  attached() {
    this.element.classList.contains(this.classToOpenOn) ? null : this.element.classList.add(this.classToOpenOn);
    this.addListener();
  }


  detached() {
    this.removeListener();
  }


  canOpen() {
    return true;
  }


  closeIfOpen() {
    if (this.menuState) {
      this.toggleMenuOff();
    }
  }


  addListener() {
    this.contextListenerBinded = this.contextListener.bind(this);
    this.closeIfOpenBinded = this.closeIfOpen.bind(this);
    this.element.addEventListener("contextmenu", this.contextListenerBinded);
    this.vGrid.element.addEventListener("vGridCloseContextMenuIfOpen", this.closeIfOpenBinded);
  }


  removeListener() {
    this.element.removeEventListener("contextmenu", this.contextListenerBinded);
    this.element.removeEventListener("vGridCloseContextMenuIfOpen", this.closeIfOpenBinded);

  }


  contextListener(e) {

    //close if menus if they are open when opening a new one
    let event = new CustomEvent("vGridCloseContextMenuIfOpen", {
      detail: "",
      bubbles: true
    });
    this.vGrid.element.dispatchEvent(event);


    if (this.canOpen(e)) {

      this.taskItemInContext = this.clickInsideElement(e, this.classToOpenOn);

      if (this.taskItemInContext) {
        e.preventDefault();
        this.toggleMenuOn();
        this.positionMenu(e);
      } else {
        this.taskItemInContext = null;
        this.toggleMenuOff();
      }

    } else {
      this.toggleMenuOff();
    }
  }


  addMenuClickListner() {
    this.clickListenerBinded = this.clickListener.bind(this);
    document.addEventListener("click", this.clickListenerBinded);
  }


  removeMenuClickListner() {
    document.removeEventListener("click", this.clickListenerBinded);
  }


  clickListener(e) {
    var clickeElIsLink = this.clickInsideElement(e, this.contextMenuLinkClassName);

    if (clickeElIsLink && this.taskItemInContext) {
      e.preventDefault();
      this.menuItemListener(clickeElIsLink);
    } else {
      var button = e.which || e.button;
      if (button === 1) {
        this.toggleMenuOff();
      }
    }

  }


  clickInsideElement(e, className) {
    var el = e.srcElement || e.target;

    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el === el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }

    return false;
  }


  createMenu() {
    this.menu = document.createElement("nav");
    this.menu.classList.add(this.contextMenuClassName);
    this.menu.innerHTML = this.menuHtmlMain();
    document.body.appendChild(this.menu);
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  }


  replaceMenu(html) {
    this.menu.innerHTML = html;
    this.menuItems = this.menu.querySelectorAll("." + this.contextMenuItemClassName);
  }


  removeMenu() {
    document.body.removeChild(this.menu);
    this.menu = null;
    this.menuItems = null;
  }


  toggleMenuOn() {
    if (this.menuState !== 1) {
      this.menuState = 1;
      this.createMenu();
      this.addMenuClickListner();
    }
  }


  toggleMenuOff() {
    if (this.menuState !== 0) {
      this.menuState = 0;
      this.removeMenuClickListner();
      this.removeMenu();

    }
  }


  /**
   * Positions the menu properly.
   */
  positionMenu(e) {
    this.clickCoords = this.getPosition(e);
    this.clickCoordsX = this.clickCoords.x;
    this.clickCoordsY = this.clickCoords.y;

    this.menuWidth = this.menu.offsetWidth + 4;
    this.menuHeight = this.menu.offsetHeight + 4;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if ((this.windowWidth - this.clickCoordsX) < this.menuWidth) {
      this.menu.style.left = this.windowWidth - this.menuWidth + "px";
    } else {
      this.menu.style.left = this.clickCoordsX + "px";
    }

    if ((this.windowHeight - this.clickCoordsY) < this.menuHeight) {
      this.menu.style.top = this.windowHeight - this.menuHeight + "px";
    } else {
      this.menu.style.top = this.clickCoordsY + "px";
    }
  }


  /**
   * Get's exact position of event.
   */
  getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }


  createMenuHTML(menuArray) {

    var tempHtml = document.createElement("ul");

    menuArray.forEach((row)=> {
      let li = document.createElement("li");
      li.classList.add(this.contextMenuItemClassName);
      let a = document.createElement("a");
      if (row.isHeader) {
        a.classList.add(this.contextMenuSplitClassName)
      } else {
        a.classList.add(this.contextMenuLinkClassName)
      }
      a.setAttribute("data-action", row.action);
      a.innerHTML = row.value;
      tempHtml.appendChild(a);
    });

    return tempHtml.innerHTML;

  }


}

/*****************************************************************************************************************
 *    VGridClientCtx
 *    This will contexin all functions that I expose to client side in gridcontext xxxx.ctx
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/

export class VGridCtx {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  /***************************************************************************************
   * getters/setters to make it easier
   ***************************************************************************************/

  get vGridSelection() {
    if (this.vGrid) {
      return this.vGrid.vGridSelection;
    } else {
      return null;
    }
  }

  get vGridConfig() {
    if (this.vGrid) {
      return this.vGrid.vGridConfig;
    } else {
      return null;
    }
  }

  get vGridCellHelper() {
    if (this.vGrid) {
      return this.vGrid.vGridCellHelper;
    } else {
      return null;
    }
  }

  get vGridElement() {
    if (this.vGrid) {
      return this.vGrid.element;
    } else {
      return null;
    }
  }

  get vGridSortable() {
    if (this.vGrid) {
      return this.vGrid.vGridSortable;
    } else {
      return null;
    }
  }

  get vGridResizable() {
    if (this.vGrid) {
      return this.vGrid.vGridResizable;
    } else {
      return null;
    }
  }


  get vGridFilter() {
    if (this.vGrid) {
      return this.vGrid.vGridFilter;
    } else {
      return null;
    }
  }

  get vGridSort() {
    if (this.vGrid) {
      return this.vGrid.vGridSort;
    } else {
      return null;
    }
  }

  get vGridObservables() {
    if (this.vGrid) {
      return this.vGrid.vGridObservables;
    } else {
      return null;
    }
  }

  get vGridGenerator() {
    if (this.vGrid) {
      return this.vGrid.vGridGenerator;
    } else {
      return null;
    }
  }

  get vGridCurrentEntityRef() {
    if (this.vGrid) {
      return this.vGrid.vGridCurrentEntityRef;
    } else {
      return null;
    }
  }

  get vGridRowKey() {
    if (this.vGrid) {
      return this.vGrid.vGridRowKey;
    } else {
      return null;
    }
  }

  get vGridCollectionFiltered() {
    if (this.vGrid) {
      return this.vGrid.vGridCollectionFiltered;
    } else {
      return null;
    }
  }

  get vGridCollection() {
    if (this.vGrid) {
      return this.vGrid.vGridCollection;
    } else {
      return null;
    }
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setData(data) {
    this.vGridConfig.remoteLimit = data.limit || 40;
    this.vGridConfig.remoteLength = data.length || 0;
    this.vGridConfig.remoteOffset = data.offset || 0;
    this.keepFilterOnCollectionChange();
    this.vGrid.vGridCollection = data.col || [];
    this.setLoadingOverlay(false);
    this.vGrid.vGridPager.updatePager({
      limit: this.vGridConfig.remoteLimit,
      offset: this.vGridConfig.remoteOffset,
      length: this.vGridConfig.remoteLength
    });
    
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  keepFilterOnCollectionChange() {
    this.vGridConfig.keepFilterOnCollectionChange = true;
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.vGridGenerator.rebuildColumns();
  }

  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollBottom() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.contentElement.scrollTop = collectionLength * this.vGridConfig.attRowHeight;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollTop() {
    this.vGridGenerator.contentElement.scrollTop = 0;
  };


  setScrollTop(newTop) {
    this.vGridGenerator.contentElement.scrollTop = newTop;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  rebuildColumnsRows() {
    this.vGridGenerator.rebuildColumnsRows();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  redrawGrid() {
    this.vGridGenerator.redrawGrid();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  showSelectedAndNotSelected() {
    this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
    this.vGridGenerator.collectionChange();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  showOnlySelected() {
    let newArray = [];
    this.vGridCollection.forEach((x, i)=> {
      if(this.vGridSelection.isSelectedMain(i)){
        newArray.push(x)
      }
    });
    this.vGrid.vGridCollectionFiltered = newArray;
    this.vGridGenerator.collectionChange();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  showOnlyNotSelected() {
    let newArray = [];
    this.vGridCollection.forEach((x, i)=> {
      if(!this.vGridSelection.isSelectedMain(i)){
        newArray.push(x)
      }
    });
    this.vGrid.vGridCollectionFiltered = newArray;
    this.vGridGenerator.collectionChange();
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setColumns(paramArray) {
    this.vGridConfig.colConfig = paramArray;
    this.vGrid.vGridConfig.columnLength  = paramArray.length
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getColumns() {
    var arr = [];
    this.vGridConfig.colConfig.forEach((obj)=> {
      let x = {};
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (x[k] !== obj[k]) {
            x[k] = obj[k];
          }
        }
      }
      arr.push(x);
    });
    return arr
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  reGenerateColumns(resetScrollToTop) {
    this.vGrid.vGridMarkupGenerator.generate();
    this.vGridGenerator.columnChangeAndCollection(resetScrollToTop);
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  orderBy(sortArray) {


    //can we do the sorting?
    if (this.vGrid.vGridCollectionFiltered.length > 0) {
      //set loading screen
      if (this.vGrid.vGridCollection.length > this.vGridConfig.attLoadingThreshold) {
        this.vGrid.loading = true;
      }

      //set query
      setTimeout(()=> {

        this.vGrid.vGridSort.reset();
        //set filter
        sortArray.forEach((sort)=>{
          this.vGrid.vGridSort.setFilter({
            attribute: sort.attribute,
            asc: sort.asc
          }, true);
        });

        let event = new CustomEvent("sortIconUpdate", {
          detail: "",
          bubbles: true
        });
        this.vGrid.element.dispatchEvent(event);

        //if remote call is set
        if (this.vGridConfig.eventOnRemoteCall) {

          //trigger remote call
          this.vGridConfig.remoteCall();

        } else {
          //run filter
          this.vGrid.vGridSort.run(this.vGrid.vGridCollectionFiltered);

          //set new row
          if (this.vGrid.vGridCurrentEntityRef) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey] === x[this.vGrid.vGridRowKey]) {
                this.vGrid.vGridCurrentRow = index;
              }
            });
          }

          //update grid
          this.vGrid.vGridGenerator.collectionChange();
          this.vGrid.loading = false;
        }

      }, 50);
    }


  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getMaxRows() {
    //https://github.com/mleibman/SlickGrid/blob/bf4705a96c40fea088216034def4d0256a335e65/slick.grid.js
    var supportedHeight = 10000;
    var testUpTo = navigator.userAgent.toLowerCase().match(/firefox/) ? 8947840 : 1000000000;
    var div = document.createElement("div");
    //div.style.display = "none";
    document.body.appendChild(div);

    while (true) {
      var test = supportedHeight + 10000;
      div.style.height = test + "px";
      if (test > testUpTo || div.clientHeight !== test) {
        break;
      } else {
        supportedHeight = test;
      }
    }
    document.body.removeChild(div);
    var total = Math.ceil(supportedHeight / this.vGridConfig.attRowHeight); //lol
    return total + ", error margin:" + Math.ceil(10000 / this.vGridConfig.attRowHeight);
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  scrollBottomNext() {
    this.vGridGenerator.scrollBottomOnNext = true;
  };


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  setLoadingOverlay(value) {
    this.vGrid.loading = value === true ? true : false;
  }


  /****************************************************************************************************************************
   * explain
   ****************************************************************************************************************************/
  getScrollTop() {
    return this.vGridGenerator.contentElement.scrollTop;
  };


  /****************************************************************************************************************************
   * remote external call for pager
   ****************************************************************************************************************************/
  remoteGoToFirst(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = 0;
    this.vGridConfig.remoteCall();
  }



  remoteGoToNext(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  remoteGoToPage(x){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = x * this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  remoteGoToOffset(x){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = x;
    this.vGridConfig.remoteCall();
  }
    

  remoteGoTofirstPrev(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }



  remoteGoTofirstLast(){
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength-this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


}

/*****************************************************************************************************************
 *    VGridCol
 *    This is just for getting the params for v-grid-col to create the grid
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@noView()
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML : null;
  if (headerTemplateHtml !== '') {
    instruction.colHeaderTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML : null;
  if (rowTemplateHtml !== '') {
    instruction.colRowTemplate = rowTemplateHtml;
  }

  element.innerHTML = '';

  //we want to get this css attribute and use if later
  var css = element.getAttribute("col-css");
  if (css) {
    instruction.colCss = css;
  }


})
@customElement('v-grid-col')
@inject(Element, VGrid, TargetInstruction)
export class VGridElementColConfig {
  @bindable({attribute: "col-width"}) colWidth;
  @bindable({attribute: "col-field"}) colField;
  @bindable({attribute: "col-header-name"}) colHeaderName;
  @bindable({attribute: "col-sort"}) colSort;
  @bindable({attribute: "col-filter"}) colFilter;
  @bindable({attribute: "col-filter-top"}) colFilterTop;
  @bindable({attribute: "col-add-label-attributes"}) colAddLabelAttributes;
  @bindable({attribute: "col-add-filter-attributes"}) colAddFilterAttributes;
  @bindable({attribute: "col-add-row-attributes"}) colAddRowAttributes;
  @bindable({attribute: "col-type"}) colType;



  constructor(element, vGrid, targetInstruction) {
    this.vGrid = vGrid;
    this.element = element;
    this.colRowTemplate = targetInstruction.elementInstruction.colRowTemplate;
    this.colHeaderTemplate = targetInstruction.elementInstruction.colHeaderTemplate;
    this.colCss = targetInstruction.elementInstruction.colCss;
  }


  bind(bindingContext, overrideContext) {
    this.vGrid.vGridConfig.columnLength++; //count columns

    this.vGrid.vGridConfig.colConfig.push({
      colWidth: this.colWidth || 100,
      colRowTemplate: this.colRowTemplate,
      colHeaderTemplate: this.colHeaderTemplate,
      colField: this.colField,
      colHeaderName: this.colHeaderName,
      colAddLabelAttributes: this.colAddLabelAttributes,
      colAddFilterAttributes: this.colAddFilterAttributes,
      colAddRowAttributes: this.colAddRowAttributes,
      colSort: this.colSort,
      colFilter: this.colFilter,
      colFilterTop: this.colFilterTop === "true" ? true : false,
      colCss: this.colCss,
      colType: this.colType || "text"
    });


  }


}

/*****************************************************************************************************************
 *    VGridFooterPager
 *    Custom element for use in the footer container
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@customElement('v-grid-pager')
@inject(Element)
export class VGridElementFooterPager {

  info = "";


  constructor(element) {
    this.element = element;
  }


  bind(parent) {
    this.parent = parent;
    this.vGrid = parent.vGrid;
    this.vGridConfig = parent.vGrid.vGridConfig;
    this.vGrid.vGridPager = this;
  }


  attached() {
    this.statusNextButton = false;
    this.statusLastButton = false;
    this.statusFirstButton = false;
    this.statusPrevButton = false;

    this.statusNextButtonTitle = this.getLang("pagerBtnNext") || "Next";
    this.statusLastButtonTitle = this.getLang("pagerBtnLast") || "Last";
    this.statusFirstButtonTitle = this.getLang("pagerBtnFirst") || "First";
    this.statusPrevButtonTitle = this.getLang("pagerBtnLast") || "Last";

    this.pagerStringPage = this.getLang("pagerStringPage") || "Page ";
    this.pagerStringOf = this.getLang("pagerStringOf") || " of ";
    this.pagerStringTotalEntities = this.getLang("pagerStringTotalEntities") || ", Total entities:";
    this.pagerStringPageSize = this.getLang("pagerStringPageSize") || ", page size ";

  }

  
  getLang(value){
    return this.vGrid.vGridConfig.attLanguage[value];
  }


  updatePager(data) {
    this.collectionLength = data.length;
    this.limit = data.limit;
    this.offset = data.offset;

    this.page = this.offset ? Math.ceil(this.offset / this.limit) + 1 : 1;


    if (this.page === 1) {
      this.statusFirstButton = false;
      this.statusPrevButton = false;
    } else {
      this.statusFirstButton = true;
      this.statusPrevButton = true;
    }


    if (this.offset >= this.collectionLength - this.limit) {
      this.statusNextButton = false;
      this.statusLastButton = false;
    } else {
      this.statusNextButton = true;
      this.statusLastButton = true;
    }


    //do we show page info?
    if (!this.vGridConfig.attHidePagerInfo) {
      this.info = `${this.pagerStringPage}${this.page}${this.pagerStringOf}${Math.ceil(this.collectionLength / this.limit)}${this.pagerStringTotalEntities}${this.collectionLength}${this.pagerStringPageSize}${this.limit}`;
    }


    //raise event
    this.vGrid.raiseEvent("v-remote-collection-event", {
      evt: "v-remote-collection-event",
      page: this.page,
      pages: Math.ceil(this.collectionLength / this.limit),
      length: this.collectionLength,
      pageSize: this.limit
    });

  }


  firstBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = 0;
    this.vGridConfig.remoteCall();
  }


  nextBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset + this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  prevBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteOffset - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


  lastBtn() {
    this.vGrid.loading = true;
    this.vGridConfig.remoteOffset = this.vGridConfig.remoteLength - this.vGridConfig.remoteLimit;
    this.vGridConfig.remoteCall();
  }


}

/*****************************************************************************************************************
 *    VGridRowRepeat
 *    Custom element just repeating the heml inside it for each row
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
@noView()
@customElement('v-grid-row-repeat')
@processContent((compiler, resources, element, instruction) => {

  var headerTemplateElement = element.getElementsByTagName("V-HEADER-TEMPLATE")[0];
  let headerTemplateHtml = headerTemplateElement ? headerTemplateElement.innerHTML:null;
  if (headerTemplateHtml !== '') {
    instruction.headerTemplate = headerTemplateHtml;
  }

  var rowTemplateElement = element.getElementsByTagName("V-ROW-TEMPLATE")[0];
  let rowTemplateHtml = rowTemplateElement ? rowTemplateElement.innerHTML:null;
  if (rowTemplateHtml !== '') {
    instruction.rowTemplate = rowTemplateHtml;
  }

  //if we didnt get anything we use it all
  if(!rowTemplateHtml){
    instruction.rowTemplate = element.innerHTML;
  }

  element.innerHTML = '';

})
@inject(Element, VGrid, TargetInstruction)
export class VGridElementRowRepeat {


  constructor(element, vGrid, targetInstruction) {
    this.element = element;
    this.vGrid = vGrid;
    this.rowTemplate = targetInstruction.elementInstruction.rowTemplate;
    this.headerTemplate = targetInstruction.elementInstruction.headerTemplate;

  }


  bind(bindingContext) {
    this.bindingContext = bindingContext;
    this.vGrid.vGridConfig.repeater = true;
    this.vGrid.vGridConfig.repeatRowTemplate = this.rowTemplate;
    this.vGrid.vGridConfig.repeatRowHeaderTemplate = this.headerTemplate;
  }




}

/*****************************************************************************************************************
 *    vGridFilter
 *    This just does the filtering on vGridCollection from the values the grid gives it
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridFilter {


  /***************************************************************************************
   * constsructor
   ***************************************************************************************/
  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  //not in use yet
  lastFilter = [];
  queryStrings = {};


  ///filter table
  filterOperatorTable = {
    "=": 1,   //equal
    "<=": 2,  //less than or equal to
    ">=": 3,  //greater than or equal to
    "<": 4,   //less than
    ">": 5,   //greater than
    "*": 6,   //contains
    "!=": 7,  //not equal to
    "!*": 8,  //does not contain
    "*=": 9,  //begin with
    "=*": 10  //end with
  };


  //filter table
  filterOperatorTableString = {
    "=": "equals",              //1
    "<=": "less than or eq",    //2
    ">=": "greater than or eq", //3
    "<": "less than",           //4
    ">": "greater than",        //5
    "*": "contains",            //6
    "!=": "not equal to",       //7
    "!*": "does not contain",   //8
    "*=": "begins with",        //9
    "=*": "ends with"           //10
  };


  /***************************************************************************************
   * run the name of filter
   ***************************************************************************************/
  getNameOfFilter(name) {
    return this.filterOperatorTableString[name];
  }

  /***************************************************************************************
   * run the filter
   ***************************************************************************************/
  run(objArray, ObjFilter) {

    //my operators
    let filterOperatorTable = this.filterOperatorTable;


    var resultArray = objArray.filter(function (data) {


      //lets have true as default, so all that should not be there we set false..
      var result = true;
      ObjFilter.forEach(function (x) {


        //vars
        var rowValue;
        var filterValue;
        var filterOperator = filterOperatorTable[x.operator];
        var newFilterOperator;


        //helper for boolean
        var typeBool = {
          "true": true,
          "false": false
        };


        //set defult type
        var type;
        try {
          type = typeof(data[x.attribute]);
        } catch (e) {
          type = "string";
        }


        //lets set som defaults
        switch (type) {
          case "number":
            rowValue = data[x.attribute];
            filterValue = Number(x.value);
            filterOperator = filterOperator || 1;
            if(filterOperator === 6){
              filterOperator = 1;
            }

            break;
          case "string":
            rowValue = data[x.attribute].toLowerCase();
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 9;
            newFilterOperator = filterOperator;

            //todo: add more options here and replace with a switch.., also

            //if filter operator is BEGIN WITH
            if (x.value.charAt(0) === "*" && filterOperator === 9) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(1, filterValue.length);
            }


            //if filter operator is EQUAL TO
            //wildcard first = end with
            if (x.value.charAt(0) === "*" && filterOperator === 1) {
              newFilterOperator = 10;
              filterValue = filterValue.substr(1, filterValue.length);
            }


            //wildcard end and first = contains
            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator === 10) {
              newFilterOperator = 6;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }


            //begin with since wildcard is in the end
            if (x.value.charAt(x.value.length - 1) === "*" && filterOperator === 1 && newFilterOperator !== 10 && newFilterOperator !== 6) {
              newFilterOperator = 9;
              filterValue = filterValue.substr(0, filterValue.length - 1);
            }


            //set the filteroperator from new if changed
            if (filterOperator !== newFilterOperator) {
              filterOperator = newFilterOperator;
            }
            break;


          case "boolean":
            rowValue = data[x.attribute];
            filterValue = typeBool[x.value];
            filterOperator = 1;
            break;


          case "object":
            rowValue = data[x.attribute].toISOString();
            filterValue = new Date(x.value).toISOString(); //todo, this needs to be better...
            filterOperator = filterOperator || 2;
            break;


          default :
            //todo: take the stuff under equal to and put in a function and also call i from here.. or just make it fail?
            rowValue = data[x.attribute].toLowerCase();
            filterValue = x.value.toLowerCase();
            filterOperator = filterOperator || 1;
            break;
        }


        //filter from what operator used
        switch (filterOperator) {
          case 1: //equal
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 2: //less or equal
            if (!(rowValue <= filterValue)) {
              result = false;
            }
            break;
          case 3: //greater or equal
            if (!(rowValue >= filterValue)) {
              result = false;
            }
            break;
          case 4://greate
            if (!(rowValue < filterValue)) {
              result = false;
            }
            break;
          case 5: //greater
            if (!(rowValue > filterValue)) {
              result = false;
            }
            break;
          case 6: //contains
            if (rowValue.indexOf(filterValue) === -1) {
              result = false;
            }
            break;
          case 7: //not equal to
            if (rowValue !== filterValue) {
              result = false;
            }
            break;
          case 8: //does not contain
            if (rowValue.indexOf(filterValue) !== -1) {
              result = false;
            }
            break;
          case 9: //begin with
            if (rowValue.substring(0, filterValue.length) !== filterValue) {
              result = false;
            }
            break;
          case 10: //end with
            if (rowValue.substring(rowValue.length - filterValue.length, rowValue.length) !== filterValue) {
              result = false;
            }
            break;
          default :
            if (rowValue !== filterValue) {
              result = false;
            }
        }
        if (type === "string") {
          if (x.value.charAt(0) === "*" && x.value.length === 1) {
            result = true
          }
        }


      });//end foreach obj
      return result

    });
    return resultArray;
  };
}//end class

/*****************************************************************************************************************
 *    vGridGenerator
 *    This generates all html and adds the main events
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridGenerator {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }

  /***************************************************************************************
   * getters/setters to make it easier
   ***************************************************************************************/

  get vGridSelection() {
    if (this.vGrid) {
      return this.vGrid.vGridSelection;
    } else {
      return null;
    }
  }

  get vGridConfig() {
    if (this.vGrid) {
      return this.vGrid.vGridConfig;
    } else {
      return null;
    }
  }

  get vGridCellHelper() {
    if (this.vGrid) {
      return this.vGrid.vGridCellHelper;
    } else {
      return null;
    }
  }

  get vGridElement() {
    if (this.vGrid) {
      return this.vGrid.element;
    } else {
      return null;
    }
  }


  get vGridResizable() {
    if (this.vGrid) {
      return this.vGrid.vGridResizable;
    } else {
      return null;
    }
  }


  get vGridScrollEvents() {
    if (this.vGrid) {
      return this.vGrid.vGridScrollEvents;
    } else {
      return null;
    }
  }


  /*************************************************************************************
   * internal vars
   *************************************************************************************/

  contentHeight = 0;
  gridHeight = 0;
  gridWidth = 0;
  scrollBodyHeight = 0;
  scrollBottomOnNext = false;

  //cache
  gridElement = null;
  headerElement = null;
  headerScrollElement = null;
  contentElement = null;
  footerElement = null;
  rowElementArray = []; //this contains top, viewslots and "div" is the html element
  contentScrollBodyElement = null;

  //viewPorts
  rowViewFactory = null;
  loadingScreenViewSlot = null;
  headerViewSlot = null;
  footerViewSlot = null;


  /****************************************************************************************************************************
   * will create the actual grid (cant be constructor since I call this when rebuilding)
   ****************************************************************************************************************************/
  init(isRebuild) {

    this.addHtml();
    this.addRowsAndSlots();
    this.addEvents();
    if (!isRebuild) {
      this.vGridSelection.setMode(this.vGridConfig.attMultiSelect);
      this.listenForWindowResize();
    }

    this.updateGridScrollbars();
    this.rebindAllRowSlots();
    this.setLargeScrollLimit();

    this.vGrid.sendCollectionEvent();


  }


  /****************************************************************************************************************************
   * add the html
   ****************************************************************************************************************************/
  addHtml() {
    //html elements
    this.createGridElement();
    this.createGridHeaderElement();
    this.createGridContentElement();
    this.createGridFooterElement();
    this.createGridScrollBodyElement();
    this.createGridRowElements();

  }

  /****************************************************************************************************************************
   * add the viewslots
   ****************************************************************************************************************************/
  addRowsAndSlots() {

    this.createLoadingScreenViewSlot();
    this.createHeaderViewSlot();
    this.createRowViewSlots();
    if (this.vGridConfig.eventOnRemoteCall) {
      this.createFooterViewSlot()
    }

  }


  /****************************************************************************************************************************
   * add the events  (this is called during rebuild etc
   ****************************************************************************************************************************/
  addEvents() {
    //add all click events to rows
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var rowElement = this.rowElementArray[i].div;

      rowElement.addEventListener("dblclick", (e) => {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        this.vGridConfig.clickHandler(e, currentRow);
      }, false);

      rowElement.addEventListener("click", (e) => {
        var currentRow = parseInt(e.currentTarget.getAttribute("row"));
        this.vGridConfig.clickHandler(e, currentRow);
        if (this.vGridConfig.attMultiSelect !== undefined) {
          this.vGridSelection.highlight(e, currentRow, this);
        }
      }, false);

    }

    //this have to be after clcik since it will cancel if scroll event
    this.contentElement.addEventListener("scroll", (e)=> {
      if (this.vGridConfig.attRequestAnimationFrame) {
        requestAnimationFrame(() => {
          this.vGridScrollEvents.scrollEventHandler();
        });
      } else {
        this.vGridScrollEvents.scrollEventHandler();
      }
    });

    //fix bug when tabbing headers, and header is larger then content width
    this.headerElement.addEventListener("scroll", (e)=> {
      this.contentElement.scrollLeft = this.headerElement.scrollLeft;
      this.vGridScrollEvents.lastScrollLeft = this.headerElement.scrollLeft;

    });

  }


  /****************************************************************************************************************************
   * gets the main div to create grid in
   ****************************************************************************************************************************/
  createGridElement() {

    var x = document.createElement("DIV"); //create this a container for my 3 rows
    this.vGridElement.appendChild(x);
    this.vGridElement.style.display = "block"; //this was the issue for all my problems
    this.gridElement = x;

    //do this for I know very little about css, and doing it like this I didnt get those weird side effects
    //todo look at this again, do not like what Ive done here
    this.gridElement.classList.add(this.vGridConfig.css.wrapper);
    this.gridElement.style.position = "relative";
    this.gridElement.style.height = '100%';
    this.gridElement.style.width = "100%";

    //get default height and width
    this.gridHeight = this.gridElement.clientHeight;
    this.gridWidght = this.gridElement.clientWidth;

  }


  /****************************************************************************************************************************
   * add header div
   ****************************************************************************************************************************/
  createGridHeaderElement() {
    //create and append header div
    var header = document.createElement("DIV");
    header.classList.add(this.vGridConfig.css.mainHeader);
    header.style.height = this.vGridConfig.attHeaderHeight + "px";
    if (!this.headerElement) {
      this.gridElement.appendChild(header);
      this.headerElement = header;
    } else {
      this.headerElement.innerHTML = header.innerHTML;
    }
    this.headerScrollElement = document.createElement("DIV");
    this.headerScrollElement.classList.add(this.vGridConfig.css.row);
    this.headerScrollElement.classList.add(this.vGridConfig.css.rowHeader);
    this.headerScrollElement.style.height = this.vGridConfig.attHeaderHeight + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerElement.appendChild(this.headerScrollElement);
  }


  /****************************************************************************************************************************
   * add content div
   ****************************************************************************************************************************/
  createGridContentElement() {

    //calculate content height
    var gridWrapperHeight = this.gridHeight;
    var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
    this.contentHeight = gridWrapperHeight - headerAndFooterHeight;

    //create and append content div
    this.contentElement = document.createElement("DIV");
    this.contentElement.classList.add(this.vGridConfig.css.mainContent);
    this.contentElement.style.height = this.contentHeight + "px";
    this.gridElement.appendChild(this.contentElement);

  }


  /****************************************************************************************************************************
   * adds the footer
   ****************************************************************************************************************************/
  createGridFooterElement() {
    //create and append
    this.footerElement = document.createElement("DIV");
    this.footerElement.classList.add(this.vGridConfig.css.mainFooter);
    this.footerElement.style.height = this.vGridConfig.attFooterHeight + "px";
    this.gridElement.appendChild(this.footerElement);
  }


  /****************************************************************************************************************************
   * add the scroll body
   ****************************************************************************************************************************/
  createGridScrollBodyElement() {
    this.setScrollBodyHeightToVar();
    //create and append
    this.contentScrollBodyElement = document.createElement("DIV");
    this.contentScrollBodyElement.classList.add(this.vGridConfig.css.scrollBody);
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.contentElement.appendChild(this.contentScrollBodyElement);
  }


  /****************************************************************************************************************************
   * add the rows to scroll div
   ****************************************************************************************************************************/
  createGridRowElements() {
    //rows we need to fill up visible container
    var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.attRowHeight, 10);

    //if this happends then they have done something really wring, or want to display all, lets make 100. (should really not happend)
    if (0 > this.contentHeight) {
      minimumRowsNeeded = 100;
    }

    //set extra so we can buffer
    if (minimumRowsNeeded % 2 === 1) {
      minimumRowsNeeded = minimumRowsNeeded + 7;
    } else {
      minimumRowsNeeded = minimumRowsNeeded + 6;
    }

    this.minimumRowsNeeded = minimumRowsNeeded;

    var top = 0;
    for (var i = 0; i < minimumRowsNeeded; i++) {

      var row = document.createElement("DIV");
      //add row css
      row.classList.add(this.vGridConfig.css.row);
      //add alt/even css
      if (i % 2 === 1) {
        row.classList.add(this.vGridConfig.css.rowAlt);
      } else {
        row.classList.add(this.vGridConfig.css.rowEven);
      }

      row.style.height = this.vGridConfig.attRowHeight + "px";

      this.setRowTopValue([{
        div: row,
        top: 0
      }], 0, top);

      row.style["min-width"] = this.getTotalColumnWidth() + "px";
      row.style.width = "100%";

      //inner magic
      row.innerHTML = ""; //? why Im I doing this? todo test... why

      //add to scroll body
      this.contentScrollBodyElement.appendChild(row);

      //push into our html cache for later use when scrolling
      //own for top so we get it faster
      this.rowElementArray.push({
        div: row,
        top: top
      });

      //set new top for next row
      top = top + this.vGridConfig.attRowHeight;

    }//end for loop
  }


  /****************************************************************************************************************************
   * creates loading screen
   ****************************************************************************************************************************/
  createLoadingScreenViewSlot() {

    var loadingScreentHtml = [
      '<div class="v-grid-overlay" if.bind="loading">',
      '</div>',
      '<div if.two-way="loading" class="v-grid-progress-indicator">',
      '<div class="v-grid-progress-bar" role="progressbar" style="width:100%">',
      '<span>${ loadingMessage }</span>',
      '</div>',
      '</div>'
    ];
    var viewFactory = this.vGrid.viewCompiler.compile('<template>' + loadingScreentHtml.join("") + '</template>', this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);
    this.loadingScreenViewSlot = new ViewSlot(this.gridElement, true);
    this.loadingScreenViewSlot.add(view);
    //bind
    this.loadingScreenViewSlot.bind(this.vGrid, {
      bindingContext: this.vGrid,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.loadingScreenViewSlot.attached();
  }


  /****************************************************************************************************************************
   * creates the header viewslot
   ****************************************************************************************************************************/
  createHeaderViewSlot() {
    var viewFactory = this.getHeaderViewFactory();
    var view = viewFactory.create(this.vGrid.container);
    this.headerViewSlot = new ViewSlot(this.headerScrollElement, true);
    this.headerViewSlot.add(view);
    //bind
    let bindingContext = {};
    this.headerViewSlot.bind(bindingContext, {
      bindingContext: bindingContext,
      parentOverrideContext: this.vGrid.overrideContext
    });
    this.headerViewSlot.attached();
  }


  /****************************************************************************************************************************
   * creates the row viewslots
   ****************************************************************************************************************************/
  createRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      var viewFactory = this.getRowViewFactory();
      var view = viewFactory.create(this.vGrid.container);
      rows[i].viewSlot = new ViewSlot(rows[i].div, true);
      rows[i].viewSlot.add(view);
      let bindingContext = {};
      rows[i].viewSlot.bind(bindingContext, {
        bindingContext: bindingContext,
        parentOverrideContext: this.vGrid.overrideContext
      });
      rows[i].viewSlot.attached();
    }
  }


  /****************************************************************************************************************************
   * creates the footer viewslots
   ****************************************************************************************************************************/
  createFooterViewSlot() {
    var pagerElement = this.vGridConfig.attCustomPager || '<v-grid-pager></v-grid-pager>';
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${pagerElement}</template>`, this.vGrid.viewResources);
    var view = viewFactory.create(this.vGrid.container);

    this.footerViewSlot = new ViewSlot(this.footerElement, true);
    this.footerViewSlot.add(view);

    this.footerViewSlot.bind(this, {
      bindingContext: this,
      parentOverrideContext: this.vGrid.overrideContext
    });

    this.footerViewSlot.attached();
  }


  /****************************************************************************************************************************
   * fills data into rows (all)
   ****************************************************************************************************************************/
  rebindAllRowSlots() {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      var row = this.rowElementArray[i];
      this.vGridConfig.updateRowBinding(currentRow, row, true, true);
    }
  };


  /****************************************************************************************************************************
   * fills data into row, 1 row!
   ****************************************************************************************************************************/
  rebindRowNumber(rowno) {
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (rowno === currentRow) {
        var row = this.rowElementArray[i];
        this.vGridConfig.updateRowBinding(currentRow, row, true, true);
      }
    }
  };


  /****************************************************************************************************************************
   * updates only selection on rows
   ****************************************************************************************************************************/
  updateSelectionOnAllRows() {
    var i;
    for (i = 0; i < this.getRowCacheLength(); i++) {
      var currentRow = this.rowElementArray[i].top / this.vGridConfig.attRowHeight;
      if (this.vGridSelection.isSelected(currentRow)) {
        this.rowElementArray[i].div.classList.add(this.vGridConfig.css.rowSelected);
      } else {
        this.rowElementArray[i].div.classList.remove(this.vGridConfig.css.rowSelected);
      }
    }
  };


  /****************************************************************************************************************************
   * returns header template
   ****************************************************************************************************************************/
  getHeaderViewFactory() {
    var rowTemplate = "";
    if (this.vGrid.vGridConfig.repeater) {
      rowTemplate = this.vGrid.vGridConfig.repeatRowHeaderTemplate;
    } else {
      for (var i = 0; i < this.vGridConfig.columnLength; i++) {

        var style = `style="width:${this.vGridConfig.colConfig[i].colWidth}px"`;
        var elementClass = `class="${this.vGridConfig.css.rowHeaderColumn + i}"`;
        var template = this.vGridConfig.colConfig[i].colHeaderTemplate;

        rowTemplate = rowTemplate + `<v-grid-header-col ${style} ${elementClass} column-no="${i}">${template}</v-grid-header-col>`;
      }
    }
    var viewFactory = this.vGrid.viewCompiler.compile(`<template>${rowTemplate}</template>`, this.vGrid.viewResources);
    return viewFactory;
  };


  /****************************************************************************************************************************
   * returns row viewFactory, if it does not exist it creates it
   ****************************************************************************************************************************/
  getRowViewFactory() {
    var viewFactory;

    if (this.rowViewFactory !== null) {
      viewFactory = this.rowViewFactory;
    } else {
      var rowTemplate = "";
      if (this.vGrid.vGridConfig.repeater) {
        rowTemplate = '<template>' + this.vGridConfig.repeatRowTemplate + '</template>'
      } else {
        rowTemplate = '<template>';
        for (var i = 0; i < this.vGridConfig.columnLength; i++) {

          var style = `style="width:${this.vGridConfig.colConfig[i].colWidth}px"`;
          var elementClass = `class="${this.vGridConfig.css.rowColumn + i}"`;
          var template = this.vGridConfig.colConfig[i].colRowTemplate;

          rowTemplate = rowTemplate + `<v-grid-row-col ${style} ${elementClass} column-no=${i}>${template}</v-grid-row-col>`;
        }
        rowTemplate + '</template>';
      }
      viewFactory = this.vGrid.viewCompiler.compile(rowTemplate, this.vGrid.viewResources);
    }

    //cache template
    this.rowViewFactory = viewFactory;

    //return cache;
    return this.rowViewFactory

  };


  /****************************************************************************************************************************
   * get total column width
   ****************************************************************************************************************************/
  getTotalColumnWidth() {
    var total = 0;
    for (var i = 0; i < this.vGridConfig.columnLength; i++) {
      total = total + parseInt(this.vGridConfig.colConfig[i].colWidth, 10);
    }
    return total;
  };


  /****************************************************************************************************************************
   * gets the row cache length...
   ****************************************************************************************************************************/
  getRowCacheLength() {
    return this.rowElementArray.length;
  };


  /****************************************************************************************************************************
   * set top value, here I could have failback to TOP instead of translate 3d
   ****************************************************************************************************************************/
  setRowTopValue(rowArray, elementNo, topValue) {
    rowArray[elementNo].div.style.transform = `translate3d(0px,${topValue}px, 0px)`;
    rowArray[elementNo].top = topValue;
  };


  /****************************************************************************************************************************
   * rebuild header div, needed if user sets new columns or something
   ****************************************************************************************************************************/
  rebuildGridHeaderHtmlAndViewSlot() {
    this.unbindDetachHeaderViewSlots();
    this.headerElement.removeChild(this.headerScrollElement);
    this.createGridHeaderElement();
    this.createHeaderViewSlot();
  };


  /****************************************************************************************************************************
   * sets scroll body to interal variable
   ****************************************************************************************************************************/
  setScrollBodyHeightToVar() {
    var collectionLength = this.vGridConfig.getCollectionLength();
    this.scrollBodyHeight = collectionLength * this.vGridConfig.attRowHeight;
  };


  /****************************************************************************************************************************
   * add the scroll body, this is needed when user chnages columns or resize the columns, so main content knows if scrollbars is needed
   ****************************************************************************************************************************/
  correctRowAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    for (var i = 0; i < this.rowElementArray.length; i++) {
      this.rowElementArray[i].div.style.width = "100%";
      this.rowElementArray[i].div.style["min-width"] = this.getTotalColumnWidth() + "px";
    }
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   *
   ****************************************************************************************************************************/
  correctHeaderAndScrollbodyWidth() {
    this.contentScrollBodyElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
    this.headerScrollElement.style.width = this.vGrid.vGridConfig.repeater ? "100%" : this.getTotalColumnWidth() + "px";
  };


  /****************************************************************************************************************************
   * helper, removes rows, se minus height so we cant scroll to empty
   ****************************************************************************************************************************/
  hideRowsThatIsLargerThanCollection() {
    var currentRow = parseInt((this.vGridScrollEvents.lastScrollTop / this.vGridConfig.attRowHeight), 10);
    for (var i = 0; i < this.getRowCacheLength(); i++) {
      var row = this.rowElementArray[i];
      var rowTop = parseInt(row.top, 10);
      if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * this.vGridConfig.attRowHeight) && rowTop > (parseInt(this.contentElement.style.height) - this.vGridConfig.attRowHeight)) {
        this.setRowTopValue([row], 0, -5000 + i);
      }
    }
    //resort array
    this.rowElementArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });
  };


  /****************************************************************************************************************************
   * hiding scroll bars when not needed
   ****************************************************************************************************************************/
  updateGridScrollbars() {
    var collectionHeight = this.vGridConfig.getCollectionLength() * this.vGridConfig.attRowHeight + (this.vGridConfig.attRowHeight / 2);
    var bodyHeight = this.contentElement.offsetHeight;
    if (collectionHeight <= bodyHeight) {
      this.contentElement.scrollTop = 0;
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "hidden";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "hidden";
    } else {
      this.contentElement.style.overflow = "";
      this.contentElement.style.overflowY = "scroll";
      this.contentElement.style.overflowX = "hidden";
      this.headerElement.style.overflowY = "scroll";
    }

    //todo, what to do when its a repeater ?
    if (this.contentElement.offsetWidth < this.getTotalColumnWidth() - 3) {
      this.contentElement.style.overflowX = "scroll";
    }


  };


  /****************************************************************************************************************************
   * sett large scroll limit, looks like *3 content height is a better match from lates testing
   ****************************************************************************************************************************/
  setLargeScrollLimit() {
    if (!this.vGridConfig.largeScrollLimit) {
      this.vGridConfig.largeScrollLimit = this.contentHeight * 1.5;
    }
  };


  /****************************************************************************************************************************
   * unbind & detach the  row view slots
   ****************************************************************************************************************************/
  unbindDetachRowViewSlots() {
    var rows = this.rowElementArray;
    for (var i = 0; i < rows.length; i++) {
      rows[i].viewSlot.unbind();
      rows[i].viewSlot.detached();
      rows[i].viewSlot.removeAll();
      rows[i].viewSlot = null;
      rows[i].div.innerHTML = "";
      this.rowViewFactory = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachHeaderViewSlots() {
    this.headerViewSlot.unbind();
    this.headerViewSlot.detached();
    this.headerViewSlot.removeAll();
    this.headerViewSlot = null;
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachFooterViewSlots() {
    if (this.footerViewSlot) {
      this.footerViewSlot.unbind();
      this.footerViewSlot.detached();
      this.footerViewSlot.removeAll();
      this.footerViewSlot = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach the  header view slot
   ****************************************************************************************************************************/
  unbindDetachLoadingScreenViewSlots() {
    if (this.loadingScreenViewSlot) {
      this.loadingScreenViewSlot.unbind();
      this.loadingScreenViewSlot.detached();
      this.loadingScreenViewSlot.removeAll();
      this.loadingScreenViewSlot = null;
    }
  }


  /****************************************************************************************************************************
   * unbind & detach all view slots
   ****************************************************************************************************************************/
  unbindDetachViewSlots() {
    this.unbindDetachRowViewSlots();
    this.unbindDetachHeaderViewSlots();
    this.unbindDetachFooterViewSlots();
    this.unbindDetachLoadingScreenViewSlots();
  }


  /****************************************************************************************************************************
   * recreate the row view slots
   ****************************************************************************************************************************/
  recreateRowViewSlots() {
    this.unbindDetachRowViewSlots();
    this.createRowViewSlots();
  }


  /****************************************************************************************************************************
   * redraws most parts of grid...
   ****************************************************************************************************************************/
  redrawGrid() {
    this.unbindDetachViewSlots();
    this.vGridElement.getElementsByClassName(this.vGridConfig.css.wrapper)[0].remove();
    this.rowElementArray = null;
    this.rowElementArray = [];
    this.headerElement = null;
    this.contentElement = null;
    this.footerElement = null;
    this.contentScrollBodyElement = null;
    this.rowViewFactory = null;
    this.init(true);
    this.fixHeaderWithBody();
  };


  /****************************************************************************************************************************
   * fixes header body width
   ****************************************************************************************************************************/
  fixHeaderWithBody() {
    var currentScrollLeft = this.contentElement.scrollLeft;
    this.headerElement.scrollLeft = currentScrollLeft;
  };


  /****************************************************************************************************************************
   * rebuilds columns incl header row, used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumns() {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.updateGridScrollbars();
    this.fixHeaderWithBody();
  };


  /****************************************************************************************************************************
   * rebuilds columns (not header), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  rebuildColumnsRows() {
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody()
  };


  /****************************************************************************************************************************
   * rebuilds columns and trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  columnChangeAndCollection(resetScrollToTop) {
    this.rebuildGridHeaderHtmlAndViewSlot();
    this.recreateRowViewSlots();
    this.rebindAllRowSlots();
    this.updateSelectionOnAllRows();
    this.collectionChange(resetScrollToTop);
  };


  /****************************************************************************************************************************
   * trigger collection change in grid (rebuild rows), used by internal, but can also be called from outside
   ****************************************************************************************************************************/
  collectionChange(resetScrollToTop, scrollBottom) {
    if (this.scrollBottomOnNext) {
      //if overriden
      scrollBottom = true;
      this.scrollBottomOnNext = false;
    }
    //adjust scroller before updating, so it created unwanted side effects
    this.setScrollBodyHeightToVar();
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + "px";
    var reset = false;
    if (resetScrollToTop === true) {
      this.contentElement.scrollTop = 0;
    }
    if (this.scrollBodyHeight < this.contentElement.scrollTop || scrollBottom) {
      var collectionLength = this.vGridConfig.getCollectionLength();
      var contentRows = parseInt(this.contentElement.offsetHeight / this.vGridConfig.attRowHeight);
      var scrollOffsetHeight = contentRows * this.vGridConfig.attRowHeight;
      this.contentElement.scrollTop = ((collectionLength * this.vGridConfig.attRowHeight) - (scrollOffsetHeight))

    }
    //reset scroll to bottom next.
    this.updateGridScrollbars();
    this.correctRowAndScrollbodyWidth();
    this.updateSelectionOnAllRows();
    this.fixHeaderWithBody();
    this.vGridScrollEvents.onLargeScroll();
    this.rebindAllRowSlots();
    if (scrollBottom) {
      this.contentElement.scrollTop = this.contentElement.scrollTop + this.vGridConfig.attRowHeight;
    }
    //if I dont do this, chrome fails...
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight - 1 + "px";
    this.contentScrollBodyElement.style.height = this.scrollBodyHeight + 1 + "px";

    this.vGrid.sendCollectionEvent();
  };


  listenForWindowResize() {

    window.addEventListener("resize", ()=> {

      this.gridHeight = this.gridElement.clientHeight;
      this.gridWidght = this.gridElement.clientWidth;
      var gridWrapperHeight = this.gridHeight;
      var headerAndFooterHeight = this.vGridConfig.attHeaderHeight + this.vGridConfig.attFooterHeight;
      this.contentHeight = gridWrapperHeight - headerAndFooterHeight;
      this.contentElement.style.height = this.contentHeight + "px";

      var minimumRowsNeeded = parseInt(this.contentHeight / this.vGridConfig.attRowHeight, 10);
      if (minimumRowsNeeded > this.minimumRowsNeeded) {

        //get last scrolltop
        let last = this.contentElement.scrollTop;

        //redraw the grid;
        this.redrawGrid();

        //set last scrolltop
        this.contentElement.scrollTop = last;

        //trigger scroll event
        this.vGridScrollEvents.onScrollbarScrolling();
      }

    });


  }


}

/*****************************************************************************************************************
 *    VGridMarkupGenerator
 *    This generates all html strings needed for row/headers templates when needed
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridMarkupGenerator {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }


  /********************************************************************
   * checks the column configs and calls method to process them
   ********************************************************************/
  generate() {
    let columnsToUse = [];
    let type = null;

    if (this.vGrid.vGridColumns && this.vGrid.vGridColumns.length > 0) {
      columnsToUse = this.vGrid.vGridColumns;
      type = 'typeArray'
    }

    if (this.vGrid.vGridConfig.colConfig && this.vGrid.vGridConfig.colConfig.length > 0) {
      columnsToUse = this.colConfig;
      type = 'typeHtml'
    }

    if (!type) {
      throw new Error('column setup missing');
    }

    if (type === 'typeArray') {
      this.vGrid.vGridConfig.colConfig = this.vGrid.vGridColumns;
      this.vGrid.vGridConfig.columnLength = this.vGrid.vGridColumns.length;
    }
    this.processColumns(this.vGrid.vGridConfig.colConfig);


  }


  /********************************************************************
   * loops the column and starts calling functions to generaate the markup
   ********************************************************************/
  processColumns(array) {

    array.forEach((col, index)=> {

      //we need attribute or rowtemplate, else throm error
      if (!col.colField && !col.colRowTemplate) {
        if(col.colType !== "selection"){
          throw new Error('colField is not set on column', index);
        }
      }

      //set default, some can be missing
      col.colType = col.colType || "text";
      col.colFilterTop = col.colFilterTop || false;
      col.colHeaderName = col.colHeaderName || this.getAttribute(col.colField, true);
      col.colWidth = col.colWidth || 100;
      col.colCss = col.colCss || '';
      col.colField = this.checkAttribute(col.colField);

      //create row and header templates
      this.createHeaderTemplate(col);
      this.createRowTemplate(col);


    });
  }


  /********************************************************************
   * generates and sets the header template
   ********************************************************************/
  createHeaderTemplate(col) {

    //if header template does not exist then lets create it
    if (!col.colHeaderTemplate) {
      let inputHeader;
      let labelHeader;
      switch (col.colType) {

        case "selection":
          //override to manual selection
          this.vGrid.vGridConfig.attManualSelection = true;
          //set template
          labelHeader = '';
          inputHeader = `<input class="vgrid-row-checkbox-100" v-selection="header" type="checkbox">`;
          break;

        case "image":
          inputHeader = '<p class="vgrid-label-top"></p>';
          if (!col.colFilterTop) {
            col.colFilter = "x"
          }
          labelHeader = this.createLabelMarkup(col);
          break;

        default://text
          inputHeader = this.createInputHeaderMarkup(col);
          labelHeader = this.createLabelMarkup(col);
          break;

      }

      //set correctly to where is is suppoed to be
      if (col.colFilterTop) {
        col.colHeaderTemplate = inputHeader + labelHeader;
      } else {
        col.colHeaderTemplate = labelHeader + inputHeader;
      }
    }
  }


  /********************************************************************
   * generates and sets the row template
   ********************************************************************/
  createRowTemplate(col) {

    //if row template does not exist, then lets create it
    if (!col.colRowTemplate) {

      switch (col.colType) {

        case "selection":
          //override to manual selection
          this.vGrid.vGridConfig.attManualSelection = true;
          //set template
          col.colRowTemplate = `<input v-key-move class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >`;
          break;

        case "image":
          this.createImageRowMarkup(col);
          break;

        default://text
          this.createInputRowMarkup(col);
          break;

      }
    }
  }


  /********************************************************************
   * simple way to get get attribute, this can prb be done better...
   ********************************************************************/
  getAttribute = function (value, capitalize) {

    let returnValue = value || "missing!";

    if (value) {

      //remove rowRef/tempRef
      value = value.replace('rowRef.', '');
      value = value.replace('tempRef.', '');

      //loop it until we have the attribute
      let newValue = "";
      let done = false;
      for (var x = 0; x < value.length; x++) {
        let letter = value.charAt(x);

        //if we hit & or | or space we are at the end
        if (!done && letter !== " " && letter !== "&" && letter !== "|" && letter !== ":") {
          newValue = newValue + letter;
        } else {
          done = true;
        }
      }

      //capilize first letter
      if (capitalize) {
        returnValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      } else {
        returnValue = newValue;
      }

    }

    return returnValue;
  };


  /********************************************************************
   *adds rowRef if temp/rowRef isnt set, have this so user dont haveto write it to make it work
   ********************************************************************/
  checkAttribute(attribute) {
    let value = attribute;
    if (attribute) {
      if (attribute.indexOf("rowRef") === -1 && attribute.indexOf("tempRef") === -1) {
        value = "rowRef." + attribute;
      }
    }
    return value;
  }


  /********************************************************************
   * create image row markup
   ********************************************************************/
  createImageRowMarkup(col) {

    //get the values/settings
    let classNames = 'class="vgrid-image-round"';
    let attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
    let css = col.colCss ? `css="${col.colCss}"` : '';

    let imageFix = "v-image-fix";
    if(this.vGrid.vGridConfig.attOnlyCustom){
      imageFix = "";
    }


    //insert the markup
    col.colRowTemplate = `<image ${css} ${classNames} ${imageFix} ${attributeRow} src.bind="${col.colField}">`;

  }


  /********************************************************************
   * create text/checkbox row markup
   ********************************************************************/
  createInputRowMarkup(col) {

    //get the values/settings
    let colClass = `class="${col.colType === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input'}"`;

    //type
    let colType = `type="${col.colType}"`;

    //get attributes row
    let colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';

    //get css
    let colCss = col.colCss ? `css="${col.colCss}"` : '';

    //attibute observer for 2 way flow between row and current entity
    let attributeObserver = `v-observe-field="${this.getAttribute(col.colField)}"`;
    if(this.vGrid.vGridConfig.attOnlyCustom){
      attributeObserver = "";
    }

    //is it a checkbox?
    //todo: adding the observer part without choice, maybe param for that?
    if (col.colType === "checkbox") {
      col.colRowTemplate = `<input ${attributeObserver} ${colCss} ${colClass} ${colType} ${colAddRowAttributes}  checked.bind="${col.colField}">`;
    } else {
      col.colRowTemplate = `<input ${attributeObserver} ${colCss} ${colClass} ${colType} ${colAddRowAttributes}  value.bind="${col.colField}">`;
    }

  }


  /********************************************************************
   * create header filter markup
   ********************************************************************/
  createInputHeaderMarkup(col) {

    //is it filter ?
    let markup;
    if (col.colFilter) {

      //type
      let type = `type="${col.colType}"`;

      //filter
      let filter = col.colFilter ? `v-filter="${col.colFilter}"` : '';

      //get attributes label
      let colAddFilterAttributes = col.colAddFilterAttributes ? col.colAddFilterAttributes : '';

      //is it a checkbox ?
      let classNames = '';
      if (col.colType === "checkbox") {
        classNames = `class="${col.colFilterTop ? 'vgrid-row-checkbox-50' : 'vgrid-row-checkbox-50'}"`;
      } else {
        classNames = `class="${col.colFilterTop ? 'vgrid-header-input-top' : 'vgrid-header-input-bottom'}"`;
      }

      //apply magic
      markup = `<input  ${classNames} ${colAddFilterAttributes} ${type} ${filter}">`;
    } else {
      markup = '';
    }

    //return the markup
    return markup;

  }


  /********************************************************************
   * create label markup
   ********************************************************************/
  createLabelMarkup(col) {
    //get the values/settings
    let filterClass = col.colFilter ? `${col.colFilterTop ? 'vgrid-label-bottom' : 'vgrid-label-top'}` : 'vgrid-label-full';

    let dragDropClass = this.vGrid.vGridConfig.attSortableHeader ? 'vGrid-vGridDragHandle' : '';

    let classname = `class="${dragDropClass} ${filterClass}"`;

    let colAddLabelAttributes = col.colAddLabelAttributes ? col.colAddLabelAttributes : '';

    let sort = col.colSort ? `v-sort="${col.colSort}"` : '';


    let extraAttributes = "v-drag-drop-col v-resize-col";
    if(this.vGrid.vGridConfig.attOnlyCustom){
      extraAttributes = "";
    }

    //apply magic
    //todo, atm Im adding resize columns and dragdrop columns, should this be a choice?
    let markup = `<p ${extraAttributes} ${classname} ${sort} ${colAddLabelAttributes}>${col.colHeaderName}</p>`;
    //return the markup
    return markup;
  }


}

/*****************************************************************************************************************
 *    VGridObservables
 *    Observers the vGridCollection/current entity for changes
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridObservables {


  constructor(vGrid, bindingEngine) {
    this.bindingEngine = bindingEngine;
    this.vGrid = vGrid;
    this.subscriptionsAttributes = []; //here I keep subscriptions to observer on attributes
    this.collectionSubscription = null; //here I keep subscriptions to observer on collection
    this.subscriptionsArray = []; //my property subscriptions
  }


  /***************************************************************************************
   * observer vGridCollection, when entire vGridCollection gets replaced
   ***************************************************************************************/
  enableObservablesCollection() {

    let collectionSubscription = (x, y) => {

      //disable array observer
      this.disableObservablesArray();

      //clone array
      //key will be set in both collection and internal since with slice we get a refrence
      this.vGrid.vGridCollectionFiltered = this.vGrid.vGridCollection.slice(0);
      this.vGrid.checkKeys();


      //reset filter/and collection/selection. (should I have option to check is they want to set something?)
      this.vGrid.vGridCurrentRow = -1;

      this.vGrid.vGridSort.reset();
      if(!this.vGrid.vGridConfig.keepFilterOnCollectionChange){
        //clear sort icons //todo improve with event
        this.vGrid.vGridSort.reset();
        this.vGrid.vGridGenerator.rebuildGridHeaderHtmlAndViewSlot();

        this.vGrid.vGridSelection.reset();
        this.vGrid.vGridConfig.keepFilterOnCollectionChange = false;
      }
      this.vGrid.vGridGenerator.collectionChange();

      //reset
      this.vGrid.vGridCurrentEntityRef = null;
      for (var k in this.vGrid.vGridCurrentEntity) {
        if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
          this.vGrid.vGridCurrentEntity[k] = undefined;
        }
      }


      //set array observer
      this.enableObservablesArray();



    };
    this.vGrid.__observers__.vGridCollection.subscribe(this.vGrid,collectionSubscription);
    this.collectioncallable = collectionSubscription;

    this.collectionSubscription = this.vGrid.__observers__.vGridCollection;

  }


  /***************************************************************************************
   * enable attributes observables, like vGridCollection.push/pop/slice, etc etc
   ***************************************************************************************/
  enableObservablesArray() {

    let arrayObserver = this.bindingEngine.collectionObserver(this.vGrid.vGridCollection).subscribe((arrayObserverChanges) => {

      var colFiltered = this.vGrid.vGridCollectionFiltered;
      var col = this.vGrid.vGridCollection;
      var grid = this.vGrid.vGridGenerator;


      var curKey = -1;
      if (this.vGrid.vGridCurrentEntityRef) {
        curKey = this.vGrid.vGridCurrentEntityRef[this.vGrid.vGridRowKey];
      }
      var curEntityValid = true;


      if (arrayObserverChanges.length > 0) {

        var added = false;
        var toRemove = [];

        //loop arrayObserverChanges
        arrayObserverChanges.forEach((observerChange)=> {

          //if anyone is added, then lets add them
          if (observerChange.addedCount > 0) {
            for (var i = 0; i < observerChange.addedCount; i++) {
              colFiltered.push(col[observerChange.index + i]);
              this.vGrid.checkKey(col[observerChange.index + i]);
            }
          }

          //if anyone is removed, then lets remove them from our filtered collection
          if (observerChange.removed.length > 0) {
            //push into removed array
            observerChange.removed.forEach((x) => {
              if (x[this.vGrid.vGridRowKey] === curKey) {
                curEntityValid = false;
              }

              var rowToRemove = -1;
              colFiltered.forEach((row, index) => {
                if (row[this.vGrid.vGridRowKey] === x[this.vGrid.vGridRowKey]) {
                  rowToRemove = index;
                }
              });
              if (rowToRemove !== -1) {
                colFiltered.splice(rowToRemove, 1);
              }
            });
          }
        });


        var newRowNo = -1;

        //check current entity, remove if removed, or get key/row
        if (!curEntityValid) {

          //no current entity, lets remove the result and null out ref/row
          for (var k in this.vGrid.vGridCurrentEntity) {
            if (this.vGrid.vGridCurrentEntity.hasOwnProperty(k)) {
              this.vGrid.vGridCurrentEntity[k] = undefined;
            }
          }
          this.vGrid.vGridCurrentEntityRef = null;
          this.vGrid.vGridCurrentRow = -1;

        } else {

          //if there is a current entity, then we need to find the row of the key
          if (curKey !== -1) {
            this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
              if (curKey === x[this.vGrid.vGridRowKey]) {
                this.vGrid.vGridCurrentRow = index;
              }
            });
          }

        }//end if (!curEntityValid)


        //update grid
        grid.collectionChange(false);


      }


    });
    this.subscriptionsArray = arrayObserver
  }


  /***************************************************************************************
   * enable attributes abservables, ->vGridCollection.name etc
   ***************************************************************************************/
  enableObservablesAttributes() {
    this.vGrid.vGridConfig.attAttributeObserve.forEach((property) => {
      let propertyObserver = this.bindingEngine.propertyObserver(this.vGrid.vGridCurrentEntity, property).subscribe((newValue, oldValue) => {

        //should I do the value formatting on the currentEntity also?
        var newValueCheck = (newValue !== undefined && newValue !== null) ? newValue.toString() : newValue;
        var oldValueCheck = (oldValue !== undefined && oldValue !== null) ? oldValue.toString() : oldValue;

        if (newValueCheck !== oldValueCheck && this.vGrid.vGridCurrentEntityRef) {
              this.vGrid.vGridCurrentEntityRef[property] = newValue;
              this.vGrid.vGridGenerator.rebindRowNumber(this.vGrid.vGridCurrentRow);
        }
      });
      this.subscriptionsAttributes.push(propertyObserver)
    });
  }


  /***************************************************************************************
   *  disable vGridCollection observables
   ***************************************************************************************/
  disableObservablesCollection() {
    this.collectionSubscription.unsubscribe(this.vGrid, this.collectioncallable);
    //this.collectionSubscription = null;
  }


  /***************************************************************************************
   * disable the array observables
   ***************************************************************************************/
  disableObservablesArray() {
    this.subscriptionsArray.dispose();
    this.subscriptionsArray = null;
  }


  /***************************************************************************************
   * disable the attibutes observables
   ***************************************************************************************/
  disableObservablesAttributes() {
    for (var i = 0; i < this.subscriptionsAttributes.length; i++) {
      try {
        this.subscriptionsAttributes[i].dispose()
      } catch (e) {
      }
    }
    this.subscriptionsAttributes = [];
  }


}

/*****************************************************************************************************************
 *    VGridScrollEvents
 *    This just have all the scroll functions the vGridGenerator needs
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridScrollEvents {

  constructor(vGrid) {
    this.vGrid = vGrid;
    this.lastScrollTop = 0;
    this.lastScrollLeft = 0;
    this.isScrollBarScrolling = false;
    this.scrollbarScrollingTimer = null;
    this.lastScrollType = null
  }

  get vGridGenerator() {
    if (this.vGrid) {
      return this.vGrid.vGridGenerator;
    } else {
      return null;
    }
  }

  get vGridSelection() {
    if (this.vGrid) {
      return this.vGrid.vGridSelection;
    } else {
      return null;
    }
  }

  get vGridConfig() {
    if (this.vGrid) {
      return this.vGrid.vGridConfig;
    } else {
      return null;
    }
  }

  get vGridCellHelper() {
    if (this.vGrid) {
      return this.vGrid.vGridCellHelper;
    } else {
      return null;
    }
  }

  get vGridElement() {
    if (this.vGrid) {
      return this.vGrid.element;
    } else {
      return null;
    }
  }

  get vGridSortable() {
    if (this.vGrid) {
      return this.vGrid.vGridSortable;
    } else {
      return null;
    }
  }

  get vGridResizable() {
    if (this.vGrid) {
      return this.vGrid.vGridResizable;
    } else {
      return null;
    }
  }

  /****************************************************************************************************************************
   * option to scrollbars scrolling where we update all the time and dont use timeout
   ****************************************************************************************************************************/
  onLargeScroll() {

    this.lastScrollTop = this.vGridGenerator.contentElement.scrollTop;

    if (this.vGridConfig.getCollectionLength() <= this.vGridGenerator.rowElementArray.length) {
      this.lastScrollTop = 0;
    }


    //vars
    var rowHeight = this.vGridConfig.attRowHeight;
    var bodyHeight = this.vGridGenerator.contentElement.clientHeight;
    var currentRow = parseInt(this.lastScrollTop / rowHeight, 10);
    var firstRow = parseInt(this.vGridGenerator.contentElement.scrollTop / rowHeight, 10);
    var currentRowTop = rowHeight * currentRow;
    var firstRowTop = rowHeight * firstRow;
    var collectionLength = this.vGridConfig.getCollectionLength();


    //for setting after
    var setAfter = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      this.vGridGenerator.setRowTopValue([row], 0, currentRowTop);
      currentRowTop = currentRowTop + rowHeight;
    };


    //for setting before (when hitting bottom)
    var setBefore = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      firstRowTop = firstRowTop - rowHeight;
      this.vGridGenerator.setRowTopValue([row], 0, firstRowTop);
    };


    //for setting before (when hitting bottom)
    var setHiddenFromView = (cacheRowNumber) => {
      var row = this.vGridGenerator.rowElementArray[cacheRowNumber];
      this.vGridGenerator.setRowTopValue([row], 0, -(currentRowTop + (this.vGridConfig.attRowHeight * 50)));
    };

    //loop row html cache
    for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {
      var moved = false;
      switch (true) {
        case currentRow >= 0 && currentRow <= collectionLength - 1:
          setAfter(i);
          moved = true;
          break;
        case currentRow >= collectionLength && (collectionLength * rowHeight) >= bodyHeight:
          setBefore(i);
          moved = true;
          break;
      }
      if (!moved) {
        if (currentRow >= collectionLength && (currentRowTop - rowHeight) >= bodyHeight) {
          setHiddenFromView(i);
        } else {
          //if this triggers the collection have been removed, so really just need to place out the rows
          if (currentRow >= collectionLength) {
            setAfter(i);
          }
        }
      }

      currentRow++;
    }


    //I now sort the array again.
    this.vGridGenerator.rowElementArray.sort(
      function (a, b) {
        return parseInt(a.top) - parseInt(b.top)
      });

    //update row data
    this.vGridGenerator.rebindAllRowSlots();
  };


  /****************************************************************************************************************************
   * add the rows to scroll div (for normal scrolling when not using scrollbars)
   ****************************************************************************************************************************/
  onSmallScroll(isDownScroll, currentScrollTop) {

    //check is user have preformed big scroll
    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    if (this.isScrollBarScrolling === false) {


      var newTopValue;
      var currentRow = parseInt((this.lastScrollTop / this.vGridConfig.attRowHeight), 10);
      var collectionHeight = this.vGridConfig.attRowHeight * this.vGridGenerator.getRowCacheLength();
      var rowHeight = this.vGridConfig.attRowHeight;

      //loop our row html cache
      for (var i = 0; i < this.vGridGenerator.getRowCacheLength(); i++) {

        var row = this.vGridGenerator.rowElementArray[i];
        var rowTop = parseInt(row.top, 10);
        var update = false;


        if (isDownScroll) {
          this.lastScrollType = "down";
          if (rowTop < (currentScrollTop - rowHeight)) {
            update = true;
            newTopValue = rowTop + collectionHeight;
            currentRow = (rowTop + collectionHeight) / rowHeight;
          }

          //if for some reason the new rowtop is higher then collection, and content height (for cases where very small collection)
          if (rowTop > ((this.vGridConfig.getCollectionLength() - 1) * rowHeight) && rowTop > this.vGridGenerator.contentHeight) {
            update = false;
            this.vGridGenerator.setRowTopValue([row], 0, -((rowHeight * i) + (rowHeight * 50)));
          }

        } else {
          this.lastScrollType = "up";
          if (rowTop > (currentScrollTop + this.vGridGenerator.contentHeight)) {
            update = true;
            newTopValue = rowTop - collectionHeight;
            currentRow = (rowTop - collectionHeight) / rowHeight;
          }

        }

        //update data
        if (update === true && currentRow >= 0 && currentRow <= this.vGridConfig.getCollectionLength() - 1) {
          this.vGridGenerator.setRowTopValue([row], 0, newTopValue);
          this.vGridConfig.updateRowBinding(currentRow, row, isDownScroll, false);
        }

      }

      //sort the cache array so we loop in correct order
      this.vGridGenerator.rowElementArray.sort(
        function (a, b) {
          return parseInt(a.top) - parseInt(b.top)
        });

    } else {

      //just in case user scrolls big then small, do not want to update before he stops
      this.onScrollbarScrolling()
    }

  };


  /****************************************************************************************************************************
   * option to scrollbars scrolling where we dont update all the time and use timeout (
   * plan was to use this with virtual scrolling with datasource using chaching to fetch data, you dont want to try and get 500 k rows in 5 sec
   ****************************************************************************************************************************/
  onScrollbarScrolling() {
    //set halt var to true, so small scroll will be stopped, will be laggy else
    this.isScrollBarScrolling = true;

    //delay before doing update
    var timeout = this.vGridConfig.attDataScrollDelay;

    //clear scroll timeout
    clearTimeout(this.scrollbarScrollingTimer);

    //set timeout, incase user is still scrolling
    this.scrollbarScrollingTimer = setTimeout(() => {
      this.onLargeScroll();
      this.isScrollBarScrolling = false;
    }, timeout);


  };


  /****************************************************************************************************************************
   * fixes scrolling / top of divs
   ****************************************************************************************************************************/
  scrollEventHandler() {


    var currentScrollTop = this.vGridGenerator.contentElement.scrollTop;
    var currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;


    //are we scrolling ?
    if (currentScrollTop !== this.lastScrollTop) {
      //is vert scroll

      //stop left scroll...
      if (currentScrollLeft !== 0) {
        this.vGridGenerator.contentElement.scrollLeft = this.lastScrollLeft;
        this.vGridGenerator.headerElement.scrollLeft = this.lastScrollLeft
      }

      //check if down scroll.
      var isDownScroll = true;
      if (currentScrollTop < this.lastScrollTop) {
        isDownScroll = false;
      }

      //check if big scroll (split m into 2.. simple to read)
      var isLargeScroll;
      switch (true) {
        case currentScrollTop > this.lastScrollTop + this.vGridConfig.largeScrollLimit:
        case currentScrollTop < this.lastScrollTop - this.vGridConfig.largeScrollLimit:
          isLargeScroll = true;
          break;
        default:
          isLargeScroll = false;
      }

      //reset scroll top
      this.lastScrollTop = currentScrollTop;

      //check if big scroll
      if (isLargeScroll) {
        //now user can set this, on very large collections this will drag preformance down
        if (this.vGridConfig.attRenderOnScrollbarScroll) {
          this.onLargeScroll()
        } else {
          this.onScrollbarScrolling();
        }
      } else {
        this.onSmallScroll(isDownScroll, currentScrollTop)
      }
    } else {

      if (this.vGridGenerator.contentElement.style.overflowX === "hidden") {
        //we do not want scrolls left if this is hidden..
        this.vGridGenerator.contentElement.scrollLeft = 0;
        this.lastScrollLeft = 0;
        this.vGridGenerator.headerElement.scrollLeft = 0;
      } else {
        if (this.lastScrollLeft !== currentScrollLeft) {
          currentScrollLeft = this.vGridGenerator.contentElement.scrollLeft;
          this.lastScrollLeft = currentScrollLeft;
          this.vGridGenerator.headerElement.scrollLeft = currentScrollLeft;
        }
      }
    }
  }

}

/*****************************************************************************************************************
 *    vGridSelection
 *    This just inserts the strings into html templates
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSelection {

  constructor(mode, vGrid) {

    this.vGrid = vGrid;
    this.selectionMode = "none";
    this.lastRowSelected = -1; //this need to be reset when filtering
    this.lastKeyKodeUsed = "none"; //this ned to be reset when filtering
    this.selectedRows = 0;

    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multiple";
    }

    this.selection = new Set([]);


  }


  triggerEvent(){
    //send out event
    this.vGrid.sendCollectionEvent();
  }


  setMode(mode) {
    this.selectionMode = "none";
    if (mode === false) {
      this.selectionMode = "single";
    }
    if (mode === true) {
      this.selectionMode = "multiple";
    }

  }


  isSelected(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollectionFiltered[row]) {
        result = this.selection.has(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  }


  isSelectedMain(row) {
    var result = false;
    if (this.selectedRows > 0) {
      if (this.vGrid.vGridCollection[row]) {
        result = this.selection.has(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
      }
    }
    return result;
  }


  deSelect(row) {
    if (this.vGrid.vGridCollectionFiltered[row]) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  deSelectMain(row) {
    if (this.vGrid.vGridCollection[row]) {
      this.selection.delete(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  select(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollectionFiltered[row]) {
          this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multiple":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollectionFiltered[row]) {
            this.selection.add(this.vGrid.vGridCollectionFiltered[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }

    //send out event
    this.triggerEvent();

  }


  selectMain(row, addToSelection) {
    switch (this.selectionMode) {
      case "none":
      case null:
      case undefined:
        break;
      case "single":
        this.selection.clear();
        if (this.vGrid.vGridCollection[row]) {
          this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
        }
        this.selectedRows = this.selection.size;
        break;
      case "multiple":
        if (!addToSelection) {
          this.selection.clear();
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        } else {
          if (this.vGrid.vGridCollection[row]) {
            this.selection.add(this.vGrid.vGridCollection[row][this.vGrid.vGridRowKey]);
          }
          this.selectedRows = this.selection.size;
        }
    }

    //send out event
    this.triggerEvent();

  }


  selectRange(start, end) {
    if (this.selectionMode === "multiple") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();
  }


  selectAll() {
    if (this.selectionMode === "multiple") {
      for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
        this.selection.add(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }
    if (this.selectionMode === "single" && this.vGrid.vGridCurrentRow >= 0) {
      this.selection.clear();
      this.selection.add(this.vGrid.vGridCollectionFiltered[this.vGrid.vGridCurrentRow][this.vGrid.vGridRowKey]);
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();

  }

  deSelectAll() {
    for (var i = 0; i < this.vGrid.vGridCollectionFiltered.length; i++) {
      this.selection.delete(this.vGrid.vGridCollectionFiltered[i][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();
  }


  selectRangeMain(start, end) {
    if (this.selectionMode === "multiple") {
      this.selection.clear();
      for (var i = start; i < end + 1; i++) {
        this.selection.add(this.vGrid.vGridCollection[i][this.vGrid.vGridRowKey]);
      }
      this.selectedRows = this.selection.size;
    }

    //send out event
    this.triggerEvent();
  }


  reset() {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    this.lastRowSelected = -1;
    this.lastKeyKodeUsed = "none";
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();
  }


  getSelectedRows() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollectionFiltered.forEach((x, index) => {
        if (this.selection.has(x[this.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;

  }


  getSelectedRowsMain() {
    var array = [];
    if (this.selectedRows > 0) {
      this.vGrid.vGridCollection.forEach((x, index) => {
        if (this.selection.has(x[this.vGrid.vGridRowKey]) === true) {
          array.push(index);
        }
      });
    }
    return array;
  }

  setSelectedRows(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollectionFiltered[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  setSelectedRowsMain(newRows) {
    if (this.selectedRows > 0) {
      this.selection.clear();
    }
    for (var i = 0; i < newRows.length; i++) {
      this.selection.add(this.vGrid.vGridCollection[newRows[i]][this.vGrid.vGridRowKey]);
    }
    this.selectedRows = this.selection.size;

    //send out event
    this.triggerEvent();

  }


  /****************************************************************************************************************************
   * fixes highlight and select...
   ****************************************************************************************************************************/
  highlight(e, currentRow, vGridGenerator) {

    var isSel;
    var manualSel = this.vGrid.vGridConfig.attManualSelection;
    if (!manualSel) {
      var currentselectedRows = this.getSelectedRows();
      var currentKeyKode = "";

      if (currentRow !== this.lastRowSelected || currentselectedRows[0] !== currentRow) {

        if (currentRow <= (vGridGenerator.vGridConfig.getCollectionLength() - 1)) { //do I need to check this?

          if (this.selectionMode === "multiple") { //if multiselect duh!



            if (e.shiftKey) {
              currentKeyKode = "shift";
              currentselectedRows = this.getSelectedRows();
              if (currentselectedRows.length > 0 && this.lastKeyKodeUsed === "none") {
                this.lastRowSelected = currentselectedRows[0];
                this.lastKeyKodeUsed = "shift";
              }
            }

            if (e.ctrlKey) {
              currentKeyKode = "ctrl";
            }

            if (!e.ctrlKey && !e.shiftKey) {
              currentKeyKode = "none";
            }

            switch (true) {
              case currentKeyKode === "none":
                this.select(currentRow);
                break;
              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "shift":
                var oldSel = this.getSelectedRows();
                this.selectRange(this.lastRowSelected, currentRow);
                var newSel = this.getSelectedRows();
                this.setSelectedRows(oldSel.concat(newSel));

                break;

              case this.lastKeyKodeUsed === "ctrl" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "ctrl":

                isSel = this.isSelected(currentRow);
                if (isSel === true) {
                  this.deSelect(currentRow);
                } else {
                  this.select(currentRow, true);
                }
                this.lastRowSelected = currentRow;
                break;

              case this.lastKeyKodeUsed === "shift" && currentKeyKode === "shift":

                if (this.lastRowSelected > currentRow) {
                  this.selectRange(currentRow, this.lastRowSelected);
                } else {
                  this.selectRange(this.lastRowSelected, currentRow);
                }

                break;

              case this.lastKeyKodeUsed === "none" && currentKeyKode === "shift":

                if (this.lastRowSelected !== -1) {
                  if (this.lastRowSelected > currentRow) {
                    this.selectRange(currentRow, this.lastRowSelected);
                  } else {
                    this.selectRange(this.lastRowSelected, currentRow);
                  }
                } else {
                  this.lastRowSelected = currentRow;
                  this.select(currentRow);
                }
                break;
              default:
                console.error("error, this should not happen, debug selection");
            }
          } else {
            this.select(currentRow);
          }
          this.lastKeyKodeUsed = currentKeyKode;

          //update selection on rows
          vGridGenerator.updateSelectionOnAllRows();
        }
      } else {

        //same row clicked again
        if (e.ctrlKey) {
          currentKeyKode = "ctrl";
        }

        //if ctrl button we want to remove selection
        if (currentKeyKode === "ctrl") {
          this.lastKeyKodeUsed = currentKeyKode;
          isSel = this.isSelected(currentRow);
          if (isSel === true) {
            this.deSelect(currentRow);
          }
          this.lastRowSelected = currentRow;
        } else {
          //else we just want to make it current..
          //isSel = this.isSelected(currentRow);
          this.select(currentRow);
        }
        //update selection on rows
        vGridGenerator.updateSelectionOnAllRows();
      }
    }
  }


}

/*****************************************************************************************************************
 *    vGridInterpolate
 *    This just does the sorting with the data the grid gives it
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridSort {


  /***************************************************************************************
   * constsructor
   ***************************************************************************************/
  constructor(vGrid) {
    this.vGrid = vGrid;
  }


  //what they say...
  lastSort = [];
  curSort = [];


  /***************************************************************************************
   * resets sort
   ***************************************************************************************/
  reset() {
    this.lastSort = [];
    this.curSort = [];
  }


  /***************************************************************************************
   * set the filter
   ***************************************************************************************/
  setFilter(sort, add) {

    //do we add or is it the first one
    if (add && this.lastSort.length > 0) {


      //its adding, so lets get last one
      this.curSort = this.lastSort;
      var exist = false;


      //loop to se if it exist from before
      this.curSort.forEach(function (x) {
        if (x.attribute === sort.attribute) {
          exist = true;
          x.asc = x.asc === true ? false : true;

        }
      });


      //if it dont exist we add it, else there isnt anythin else to do for now
      if (!exist) {
        this.curSort.push(sort);
        this.curSort[this.curSort.length - 1].no = this.curSort.length;
      }
      this.lastSort = this.curSort;


    } else {

      //if not adding, just set it
      this.curSort = [sort];
      this.curSort[0].no = 1;
      if (this.lastSort[0]) {
        if (this.lastSort[0].attribute === this.curSort[0].attribute) {
          if (this.lastSort[0].asc === this.curSort[0].asc) {
            this.curSort[0].asc = this.curSort[0].asc === true ? false : true;
          }
        }
      }
      this.lastSort = this.curSort;


    }


  }


  /***************************************************************************************
   * returns the filter
   ***************************************************************************************/
  getFilter() {
    return this.curSort;
  }


  /***************************************************************************************
   * run the sort
   ***************************************************************************************/
  run(array) {


    //super simple for now.. atleast I have som form for sort
    var thisSort = this.getFilter();

    //this is mix from different sources... from what I can tell it works now
    array.sort(function (obj1, obj2, i) {
      var result = 0;

      for (var i = 0; i < thisSort.length && result == 0; ++i) {
        //loop until all are sorted
        var currentObj = thisSort[i];
        var v1 = obj1[currentObj.attribute];
        var v2 = obj2[currentObj.attribute];

        if (v1 !== v2) {
          if (currentObj.asc) {
            //ASC
            if (v1 < v2)
              result = -1;
            else
              result = 1;
          } else {
            //DESC
            if (v1 < v2)
              result = 1;
            else
              result = -1;

          }
        }
      }
      return result;
    });

    this.lastSort = this.getFilter().slice(0);


  }

}

/*****************************************************************************************************************
 *    vGrid
 *    This is the custom aurelia element
 *    Prb doing al kinds of wrong in here, will improve as I learn more
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGrid {
  static inject = [Element, BindingEngine, ViewCompiler, ViewSlot, Container, ViewResources, TaskQueue];
  @bindable({attribute: "v-grid-context"}) vGridContextObj;
  @bindable({attribute: "v-collection"}) vGridCollection;
  @bindable({attribute: "v-current-entity"}) vGridCurrentEntity;
  @bindable({attribute: "v-columns"}) vGridColumns;
  @bindable({attribute: "v-row-height"}) attRowHeight;
  @bindable({attribute: "v-header-height"}) attHeaderHeight;
  @bindable({attribute: "v-footer-height"}) attFooterHeight;
  @bindable({attribute: "v-multi-select"}) attMultiSelect;
  @bindable({attribute: "v-manual-sel"}) attManualSelection;
  @bindable({attribute: "v-loading-threshold"}) attLoadingThreshold;
  @bindable({attribute: "v-remote-index"}) attRemoteIndex;
  @bindable({attribute: "v-row-on-draw"}) eventOnRowDraw;
  @bindable({attribute: "v-event-onremote"}) eventOnRemoteCall;
  @bindable({attribute: "v-hide-pager-info"}) attHidePagerInfo;
  @bindable({attribute: "v-custom-pager"}) attCustomPager;
  @bindable({attribute: "v-language"}) attLanguage;
  @bindable({attribute: "v-only-custom"}) attOnlyCustom;
  @bindable({attribute: "v-attribute-observe"}) attAttributeObserve;
  @bindable loadingMessage = "Working please wait";
  loading = false;

  constructor(element, bindingEngine, viewCompiler, viewSlot, container, viewResources, taskQueue) {

    //<v-grid> element
    this.element = element;

    //aurelia stuff I need for creating my cells etc
    this.viewCompiler = viewCompiler;
    this.viewSlot = viewSlot;
    this.container = container;
    this.viewResources = viewResources;
    this.taskQueue = taskQueue;

    //keeps the current entity ref
    this.vGridCurrentEntityRef = null;

    //current selected row in grid, not always the same as collection when used filter/sorting
    this.vGridCurrentRow = -1;

    //key name, used for knowing what record in filtered collection belongs to main collection
    this.vGridRowKey = "__vGridKey";

    //cloned collection used internaly for everything, I never sort the original collection
    this.vGridCollectionFiltered = [];

    //my classes the grid uses
    this.vGridScrollEvents = new VGridScrollEvents(this);
    this.vGridFilter = new VGridFilter(this);
    this.vGridSort = new VGridSort(this);
    this.vGridConfig = new VGridConfig(this);
    this.vGridSelection = new VGridSelection(null, this);
    this.vGridObservables = new VGridObservables(this, bindingEngine);
    this.vGridGenerator = new VGridGenerator(this);
    this.vGridClientCtx = new VGridCtx(this);
    this.vGridMarkupGenerator = new VGridMarkupGenerator(this);
    this.vGridPager = null; //set by pager


    //vars
    this.lastCollectionLength;
    this.lastFilterLength;
    this.lastSelectionLength;

  }

  /***************************************************************************************
   * event dispatcher
   ***************************************************************************************/

  raiseEvent(name, data = {}) {
    let event = new CustomEvent(name, {
      detail: data,
      bubbles: true
    });
    this.element.dispatchEvent(event);

    return event;
  }


  //sends out event that total/filtered or selection have changed
  sendCollectionEvent(){

    let x1 = this.lastCollectionLength;
    let x2 = this.lastFilterLength;
    let x3 = this.lastSelectionLength;
    let y1 = this.vGridCollection.length;
    let y2 = this.vGridCollectionFiltered.length;
    let y3 = this.vGridSelection.selectedRows;

    if(x1 !== y1 || x2 !== y2 || x3 !== y3){

      //send out event
      this.raiseEvent("v-local-collection-event", {
        evt: "v-local-collection-event",
        totalLength: this.vGridCollection.length,
        filterLength : this.vGridCollectionFiltered.length,
        selectionLength:this.vGridSelection.selectedRows
      });

      //set new values
      this.lastCollectionLength = this.vGridCollection.length;
      this.lastFilterLength = this.vGridCollectionFiltered.length;
      this.lastSelectionLength = this.vGridSelection.selectedRows;
    }




  }



  /***************************************************************************************
   * resets internal key on vGridCollection/internal vGridCollectionFiltered
   ***************************************************************************************/

  checkKeys() {
   // let key = 0; //reset it
    this.vGridCollection.forEach((row) => {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.guid();
      }
    });
  }

  checkKey(row) {
      if(!row[this.vGridRowKey] && row !== undefined && row !== null){
        row[this.vGridRowKey]= this.guid();
      }
  }

  vGridGetRowKey(key){
    var rowFound = null;
    this.vGridCollection.forEach((row, index) => {
      if(row[this.vGridRowKey] === key){
        rowFound = index;
      }
    });
    return rowFound
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }



  /***************************************************************************************
   * when view is bounded
   ***************************************************************************************/
  bind(parent, overrideContext) {


    //parent
    this.$parent = parent;
    this.overrideContext = overrideContext;

    //if they havent binded a context, then just create a object for it so internals dont fail
    if (!this.vGridContextObj) {
      this.vGridContextObj = {};
    }

    //if they havent binded a current entity, then just create a object for it so internals dont fail
    if (!this.vGridCurrentEntity) {
      this.vGridCurrentEntity = {};
    }

    //set vgrid attibutes to our config/utillity class
    this.vGridContextObj.ctx = this.vGridClientCtx;
    var vConfig = this.vGridConfig;
    vConfig.setBindValueArray(this.attAttributeObserve, 'attAttributeObserve');
    vConfig.setBindValueInt(this.attRowHeight, 'attRowHeight');
    vConfig.setBindValueInt(this.attHeaderHeight, 'attHeaderHeight');
    vConfig.setBindValueInt(this.attFooterHeight, 'attFooterHeight');
    vConfig.setBindValueBool(this.attResizableHeaders, 'attResizableHeaders');
    vConfig.setBindValueBool(this.attMultiSelect, 'attMultiSelect');
    vConfig.setBindValueBool(this.attSortableHeader, 'attSortableHeader');
    vConfig.setBindValueInt(this.attLoadingThreshold, 'attLoadingThreshold');
    vConfig.setBindValueString(this.attRemoteIndex, 'attRemoteIndex');
    vConfig.setBindValueBool(this.attManualSelection, 'attManualSelection');
    vConfig.setBindValueFunction(this.eventOnRowDraw, 'eventOnRowDraw');
    vConfig.setBindValueFunction(this.eventOnRemoteCall, 'eventOnRemoteCall');
    vConfig.setBindValueBool(this.attHidePagerInfo, 'attHidePagerInfo');
    vConfig.setBindValueString(this.attCustomPager, 'attCustomPager');
    vConfig.setBindValueBool(this.attOnlyCustom, 'attOnlyCustom');

    this.vGridConfig.attLanguage = this.attLanguage || this.vGridConfig.attLanguage;

    


    //lets test that they have set the mandatory config settings
    if (this.vGridCollection === undefined) {
      console.warn("collection not set/binded please check the v-collection attribute");
      this.vGridCollection = [];
      this.vGridCollectionFiltered = this.vGridCollection.slice(0);
    } else {
      //clone collection and add key index, so we know it.
      this.vGridCollectionFiltered = this.vGridCollection.slice(0);
      //resets the keys
      this.checkKeys();
    }
  }


  /***************************************************************************************
   * set all options
   ***************************************************************************************/
  attached() {

    if(!this.vGridConfig.repeater){
      this.vGridMarkupGenerator.generate();
    }

    //set observables
    this.vGridObservables.enableObservablesCollection();
    this.vGridObservables.enableObservablesArray();
    this.vGridObservables.enableObservablesAttributes();

    //create the grid html/add events etc
    this.vGridGenerator.init(false);

  }


  unbind(){
    this.vGridGenerator.unbindDetachViewSlots();
  }


  /***************************************************************************************
   * unsubscribe property and array observers
   ***************************************************************************************/
  detached() {
    this.vGridObservables.disableObservablesAttributes();
    this.vGridObservables.disableObservablesCollection();
    this.vGridObservables.disableObservablesArray();
  }
}
