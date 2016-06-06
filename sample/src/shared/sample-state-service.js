import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export var developmentStyle = {
  simpleHtml: { title: 'Simple HTML', key: 'simple' },
  columnBind: { title: '"column.bind"', key: 'column-bind' },
  customHtml: { title: 'Custom HTML', key: 'custom' },
  rowRepeat: { title: 'Row repeat', key: 'row-repeat' }
};

@inject(EventAggregator)
export class SampleStateService {
  constructor(eventAggregator) {
    this.developmentStyle = developmentStyle.simpleHtml;
    this.ea = eventAggregator;
  }

  getStyle(): developmentStyle {
    return this.developmentStyle;
  }

  setStyle(style: developmentStyle) {
    this.developmentStyle = style;
    this.ea.publish('sample-state-service:style-changed');
  }
}
