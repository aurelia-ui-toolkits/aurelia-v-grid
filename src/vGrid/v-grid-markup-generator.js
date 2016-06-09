/*****************************************************************************************************************
 *    VGridMarkupGenerator
 *    This generates all htmlstring needed for row/headers templates when needed
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
export class VGridMarkupGenerator {

  constructor(vGrid) {
    this.vGrid = vGrid;
  }


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


  processColumns(array) {


    array.forEach((col, index)=> {

      //we need attribute or rowtemplate, else throm error
      if (!col.colField && !col.colRowTemplate) {
        throw new Error('colField is not set on column', index);
      }


      //we want by default to observe attributes if we can
      this.addToObserverArray(this.getAttribute(col.colField, false));


      //set default, some can be missing
      col.colType = col.colType || "text";
      col.colFilterTop = col.colFilterTop || false;
      col.colHeaderName = col.colHeaderName || this.getAttribute(col.colField, true);
      col.colWidth = col.colWidth || 100;
      col.colCss = col.colCss || '';
      col.colField = this.checkAttribute(col.colField);

      //if selection type
      if (col.colType === "selection") {
        //override to manual selection
        this.vGrid.vGridConfig.attManualSelection = true;
        //set template
        col.colHeaderTemplate = `<input class="vgrid-row-checkbox-100" v-selection="header" type="checkbox">`;
        col.colRowTemplate = `<input class="vgrid-row-checkbox-100"  v-selection="row" type="checkbox" >`;

      } else {

        //does a rowTemplate exist, if not we create one, else we skip it
        if (!col.colRowTemplate) {
          if (col.colType === "image") {
            this.createImageRowMarkup(col);
          } else {
            this.createInputRowMarkup(col);
          }
        }

        if (!col.colHeaderTemplate) {
          if (col.colType === "image") {
            var inputHeader = "";
            var labelHeader = this.createLabelMarkup(col);
          } else {
            var inputHeader = this.createInputHeaderMarkup(col);
            var labelHeader = this.createLabelMarkup(col);
          }
          if (col.colFilterTop) {
            col.colHeaderTemplate = inputHeader + labelHeader;
          } else {
            col.colHeaderTemplate = labelHeader + inputHeader;
          }
        }
      }


    });
  }

  //simple way to get get attribute, this can prb be done better...
  getAttribute = function (value, capitalize) {
    if (value) {
      value = value.replace('rowRef.', '');
      value = value.replace('tempRef.', '');
      let newValue = "";
      let done = false;
      for (var x = 0; x < value.length; x++) {
        let letter = value.charAt(x);
        if (!done && letter !== " " && letter !== "&" && letter !== "|" && letter !== ":") {
          newValue = newValue + letter;
        } else {
          done = true;
        }
      }
      if (capitalize) {
        return newValue.charAt(0).toUpperCase() + newValue.slice(1);
      } else {
        return newValue;
      }

    } else {
      return "missing!";
    }
  };


  checkAttribute(attribute){
    //not the best way... temp fix so they dont haveto write rowRef...
    if(attribute){
      if(attribute.indexOf("rowRef") === -1 && attribute.indexOf("tempRef") === -1){
          return "rowRef."+attribute;
      } else {
        return attribute;
      }
    } else {
      return attribute;
    }

  }


  addToObserverArray(value) {
    //get array
    var attAttributeObserve = this.vGrid.vGridConfig.attAttributeObserve;
    let attribute = this.getAttribute(value);
    //if not allready added, then lets add them
    if (attAttributeObserve.indexOf(attribute) === -1 && attribute) {
      attAttributeObserve.push(attribute);
    }

  }


  createImageRowMarkup(col) {
    //get the values/settings
    let classNames = 'class="vgrid-image-round"';
    let attributeRow = col.colAddRowAttributes ? col.colAddRowAttributes : '';
    let css = col.colCss ? `css="${col.colCss}"` : '';

    //insert the markup
    col.colRowTemplate = `<image ${css} ${classNames} v-image-fix ${attributeRow} src.bind="${col.colField}">`;

  }


  createInputRowMarkup(col) {
    //get the values/settings
    let classNames = `class="${col.colType === "checkbox" ? 'vgrid-row-checkbox-100' : 'vgrid-row-input'}"`;

    //type
    let type = `type="${col.colType}"`;


    //get attributes row
    let colAddRowAttributes = col.colAddRowAttributes ? col.colAddRowAttributes : '';

    //get css
    let css = col.colCss ? `css="${col.colCss}"` : '';

    //is it a checkbox?
    //todo: adding the update part without choice, maybe param for that?
    if (col.colType === "checkbox") {
      col.colRowTemplate = `<input v-update-current-entity-on="click" ${css} ${classNames} ${type} ${colAddRowAttributes}  checked.bind="${col.colField}">`;
    } else {
      col.colRowTemplate = `<input v-update-current-entity-on="keydown" ${css} ${classNames} ${type} ${colAddRowAttributes}  value.bind="${col.colField}">`;
    }

  }


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
