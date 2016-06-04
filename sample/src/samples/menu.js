import {inject, bindable} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import { ComponentService } from '../shared/component-service';

@inject(Element, ComponentService)
export class Menu {

  @bindable router;

  constructor(element, componentService) {
    this.categories = componentService.getIterableComponents(true);
    this.element = element;
    this.componentService = componentService;
  }

  attached() {
    // this.generateRow(json);
  }

  generateRow(data) {
    let div = DOM.createElement('div');
    div.className = 'btn-group';
    div.setAttribute('role', 'group');

    this.element.appendChild(div);

    for (let key of Object.keys(data)) {
      let buttonDiv = DOM.createElement('div');
      buttonDiv.className = 'btn-group';
      buttonDiv.setAttribute('role', 'group');

      let button = DOM.createElement('button');
      button.className = 'btn btn-default dropdown-toggle';
      button.setAttribute('data-toggle', 'dropdown');
      button.setAttribute('aria-haspopup', 'true');
      button.setAttribute('aria-expanded', 'false');
      button.innerHTML = key + ' <span class="caret"></span>';
      buttonDiv.appendChild(button);

      let ulItem = DOM.createElement('ul');
      ulItem.className = 'dropdown-menu';
      for (let subNav of Object.keys(data[key])) {
        let liItem = DOM.createElement('li');
        let aItem = DOM.createElement('a');
        aItem.setAttribute('href', `#/samples/${data[key][subNav]}`);
        aItem.innerHTML = subNav;

        liItem.appendChild(aItem);
        ulItem.appendChild(liItem);
      }

      buttonDiv.appendChild(ulItem);
      div.appendChild(buttonDiv);
    }
  }
}
