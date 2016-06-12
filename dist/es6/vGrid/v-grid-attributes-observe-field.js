/*****************************************************************************************************************
 *    Just to have instant update on row events over to current entity
 *    Created by vegar ringdal
 *
 ****************************************************************************************************************/
import {inject, customAttribute, BindingEngine} from 'aurelia-framework';
import {VGrid} from './v-grid';


@customAttribute('v-observe-field')
@inject(Element, VGrid, BindingEngine)
export class vGridAttributesObserveField {


  constructor(element, vGrid, bindingEngine) {
    this.vGrid = vGrid;
    this.element = element;
    this.timer = null;
    this.bindingEngine = bindingEngine
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
