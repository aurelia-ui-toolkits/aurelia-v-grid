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

    //insert the markup
    col.colRowTemplate = `<image ${css} ${classNames} v-image-fix ${attributeRow} src.bind="${col.colField}">`;

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

    //apply magic
    //todo, atm Im adding resize columns and dragdrop columns, should this be a choice?
    let markup = `<p v-drag-drop-col v-resize-col ${classname} ${sort} ${colAddLabelAttributes}>${col.colHeaderName}</p>`;
    //return the markup
    return markup;
  }


}
