/*****************************************************************************************************************
 *    Adds resizing to the columns
 *    Can not be used with row repeat... not atleast yet..
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute} from 'aurelia-framework';
import {VGrid} from './v-grid';


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
