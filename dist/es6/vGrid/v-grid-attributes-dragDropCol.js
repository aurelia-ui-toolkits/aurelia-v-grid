/*****************************************************************************************************************
 *    Drag drop columns for the grid
 *    can not be used with row-repeat... yet
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


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
