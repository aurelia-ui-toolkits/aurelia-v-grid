import {customElement} from 'aurelia-templating';
import {constants} from './common/constants';

@customElement(`${constants.elementPrefix}click-counter`)
export class ClickCounter {
  count = 0;

  increment() {
    this.count++;
  }
}
